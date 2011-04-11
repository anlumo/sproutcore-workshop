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
	name: SC.Record.attr(String)
});
