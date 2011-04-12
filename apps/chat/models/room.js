// ==========================================================================
// Project:   Chat.Room
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Chat.Room = SC.Record.extend({
	primaryKey: "jid",
	jid: SC.Record.attr(String),
	
	participants: function() {
		var query = SC.Query.local(Chat.User, {
			conditions: 'room = {room}',
			room: this.get('jid'),
			orderBy: "name"
		});
		return Chat.net.find(query);
	}.property().cacheable(),
	
	messages: function() {
		var query = SC.Query.local(Chat.Message, {
			conditions: 'room = {room}',
			room: this.get('jid'),
			orderBy: "timestamp"
		});
		return Chat.net.find(query);
	}.property().cacheable()
});
