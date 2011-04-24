// ==========================================================================
// Project:   Chat.Message
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Chat.Message = SC.Record.extend({
	body: SC.Record.attr(String),
	timestamp: SC.Record.attr(SC.DateTime),
	
	fromJid: SC.Record.attr(String),
	roomJid: SC.Record.attr(String),
	
	from: function() {
		return Chat.net.find(SC.Query.local(Chat.User, 'jid = {jid}',
			{jid: this.get('fromJid')})).objectAt(0);
	}.property('fromJid').cacheable(),
	room: function() {
		return Chat.net.find(SC.Query.local(Chat.Room, 'jid = {jid}',
			{jid: this.get('roomJid')})).objectAt(0);
	}.property('roomJid').cacheable()
});
