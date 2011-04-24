// ==========================================================================
// Project:   Chat.Xmpp
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Chat.Xmpp = SC.DataSource.extend({
	store: null,
	connection: null,
	_ownNicks: null,
	_messageGuid: 0,

	connect: function(store, hostname) {
		this.set('store', store);
		
		var conn = new Strophe.Connection("/http-bind/");
		
		conn.xmlInput = function(body) {
			console.log(body);
		};
		conn.xmlOutput = function(body) {
			console.log(body);
		};
		
		this._ownNicks = {};
		
		this.set('connection', conn);
		
		var that = this;
		conn.connect(hostname, null, function(status) {
			if(status === Strophe.Status.CONNECTED)
				that.connected();
			else if(status === Strophe.Status.DISCONNECTED)
				that.disconnected();
		});
	},
	
	connected: function() {
		var connection = this.get('connection');
		
		var that = this;
		connection.addHandler(function(presence) {
			return that.on_presence_changed(presence);
		}, null, "presence");
		connection.addHandler(function(message) {
			return that.on_muc_message(message);
		}, null, "message", "groupchat");
		
		Chat.set('myself', connection.jid);
	},
	disconnected: function() {
		Chat.set('myself', null);
	},
	
	joinMUC: function(room, nick) {
		this._ownNicks[room] = nick;
		this.get('connection').send($pres({
			to: "%@/%@".fmt(room, nick),
			}).c('x', {xmlns: "http://jabber.org/protocol/muc"}));
	},
	
	on_presence_changed: function(presence) {
		var _ = SC.$(presence);
		var ptype = _.attr('type');
		var from = _.attr('from');
		var x = _.find('x[xmlns=http://jabber.org/protocol/muc#user]');
		
		if(x.length > 0) {
			var item = x.find('item');
			var myself = x.find('status[code=110]').length > 0;
			var awaitingConfiguration = x.find('status[code=201]').length > 0;
			var room = Strophe.getBareJidFromJid(from);
			
			if(!myself) {
				myself = Strophe.getResourceFromJid(from) === this._ownNicks[room];
			}
			
			this.get('store').pushRetrieve(Chat.User, from, {
				jid: from,
				role: item.attr('role'),
				affiliation: item.attr('affiliation'),
				available: ptype !== "unavailable",
				myself: myself
			});
			
			this.get('store').pushRetrieve(Chat.Room, room, {
				jid: room
			});
			
			SC.RunLoop.begin().end();
			
			if(awaitingConfiguration) {
				this.get('connection').send(
					$iq({type: 'set', to: room})
						.c('query', {xmlns: "http://jabber.org/protocol/muc#owner"})
						.c('x', {xmlns: "jabber:x:data", type: "submit"}));
			}
		}
		return true;
	},
	
	on_muc_message: function(message) {
		var _ = SC.$(message);
		var from = _.attr('from');
		var room = Strophe.getBareJidFromJid(from);
		
		var storeKey = this.get('store').storeKeyFor(Chat.Room, room);
		var roomHash = this.get('store').readDataHash(storeKey);
		if(!roomHash) {
			return true;
		}
		
		var body = _.find('body');
		if(body.length === 0)
			body = null;
		else
			body = body.text();
		
		this.get('store').pushRetrieve(Chat.Message, this._messageGuid, {
			guid: this._messageGuid,
			fromJid: from,
			roomJid: room,
			timestamp: SC.DateTime.create(),
			body: body
		});
		
		SC.RunLoop.begin().end();
		
		this._messageGuid++;
		
		return true;
	},

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {

    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.

    return NO ; // return YES if you handled the query
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
	_recordTypeCheck: function(store, storeKey, type) {
		return SC.kindOf(store.recordTypeFor(storeKey), type);
	},
  
	createRecord: function(store, storeKey) {
		if(this._recordTypeCheck(store, storeKey, Chat.Message)) {
			var recordHash = store.readDataHash(storeKey);
			recordHash.timestamp = SC.DateTime.create();
			recordHash.guid = this._messageGuid;
			recordHash.from = null;
			
			var to = recordHash.roomJid;
			
			this.get('connection').send($msg({
				to: to,
				type: 'groupchat'
			}).c('body').t(recordHash.body));
			
			store.dataSourceDidComplete(storeKey, recordHash, this._messageGuid);
			
			this._messageGuid++;
			
			return YES;
		}
		
		return NO ; // return YES if you handled the storeKey
	},
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
});
