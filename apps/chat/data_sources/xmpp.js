// ==========================================================================
// Project:		Chat.XmppDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

	(Document Your Data Source Here)

	@extends SC.DataSource
*/
Chat.XMPPDataSource = SC.DataSource.extend({

	store: null,
	connection: null,

	connect: function(store, hostname) {
		this.set('store', store);
		
		var conn = new Strophe.Connection("/http-bind/");
		
		conn.xmlInput = function(body) {
			console.log(body);
		};
		conn.xmlOutput = function(body) {
			console.log(body);
		};
		
		this.set('connection', conn);
		
		var that = this;
		conn.connect(hostname, null, function(status) {
			if(status === Strophe.Status.CONNECTED) {
				that.connected();
			} else if(status === Strophe.Status.DISCONNECTED) {
				that.disconnected();
			}
		});
	},
	
	connected: function() {
		var connection = this.get('connection');
		var that = this;
		connection.addHandler(function(presence) {
			that.on_presence_changed(presence);
		}, null, "presence");
		connection.send($pres());
		Chat.set('myself', connection.jid);
	},
	
	disconnected: function() {
		Chat.set('myself', null);
	},
	
	joinMUC: function(room, nick) {
		this.get('connection').send($pres({
			to: "%@/%@".fmt(room, nick)
		}).c('x', {xmlns: "http://jabber.org/protocol/muc"}));
	},
	
	on_presence_changed: function(presence) {
		var _ = SC.$(presence);
		var ptype = _.attr('type');
		var from = _.attr('from');
		
		if(_.find('x[xmlns=http://jabber.org/protocol/muc#user]').length > 0) {
			// we only handle MUC presence
			
			var item = _.find('x[xmlns=http://jabber.org/protocol/muc#user] > item');
			var status = _.find('x[xmlns=http://jabber.org/protocol/muc#user] > status');
			var myself = status.find('.[code=110]').length > 0;
			
			// add/update user
			this.get('store').pushRetrieve(Chat.User, from, {
				jid: from,
				role: item.attr('role'),
				affiliation: item.attr('affiliation'),
				available: ptype !== "unavailable",
				myself: myself
			});
			
			var room = Strophe.getBareJidFromJid(from);
			
			// add/update room
			this.get('store').pushRetrieve(Chat.Room, room, {
				jid: room
			});
			SC.RunLoop.begin().end(); // commit store changes
		}
	
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
	
	createRecord: function(store, storeKey) {
		
		// TODO: Add handlers to submit new records to the data source.
		// call store.dataSourceDidComplete(storeKey) when done.
		
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
	
}) ;
