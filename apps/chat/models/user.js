// ==========================================================================
// Project:   Chat.User
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Chat.User = SC.Record.extend({
	primaryKey: "jid",
	jid: SC.Record.attr(String),
	name: function() {
		return Strophe.getResourceFromJid(this.get('jid'));
	}.property('jid').cacheable(),
	room: function() {
		return Strophe.getBareJidFromJid(this.get('jid'));
	}.property('jid').cacheable(),
	
	role: SC.Record.attr(String),
	affiliation: SC.Record.attr(String),
	
	available: SC.Record.attr(Boolean),
	myself: SC.Record.attr(Boolean)
});
