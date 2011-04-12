// ==========================================================================
// Project:   Chat.usersController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Chat.usersController = SC.ArrayController.create({
	allowsEmptySelection: YES,
	allowsMultipleSelection: NO,
	
	room: null,
	
	roomChanged: function() {
		this.set('content', this.get('room').get('participants'));
	}.observes('room')
});
