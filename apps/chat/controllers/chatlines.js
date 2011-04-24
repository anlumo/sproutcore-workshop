// ==========================================================================
// Project:   Chat.chatlinesController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Chat.chatlinesController = SC.ArrayController.create({
	isEditable: NO,
	allowsSelection: NO,
	
	room: null,
	
	roomChanged: function() {
		this.set('content', this.get('room').get('messages'));
	}.observes('room')
});
