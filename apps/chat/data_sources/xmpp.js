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
		this.get('store').pushRetrieve(Chat.User, connection.jid, {
			jid: connection.jid,
			name: "us"
		});
		SC.RunLoop.begin().end(); // commit in store
		
		Chat.set('myself', this.get('store').find(Chat.User, connection.jid));
		
		connection.send($pres());
	},
	
	disconnected: function() {
		Chat.set('myself', null);
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
