// ==========================================================================
// Project:   Chat.MessageView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Chat.MessageView = SC.View.extend({
	content: null,
	isEnabled: YES,
	isSelected: NO,
	
	displayProperties: [ 'content', 'isEnabled', 'isSelected' ],
	
	render: function(context, firstTime) {
		var content = this.get('content');
		var body = content.get('body');
		var action = false;
		
		if(!body) {
			body = "";
		}
		
		if(body.slice(0,4) === "/me ") {
			body = body.slice(4);
			action = true;
		}
		
		var timestamp = content.get('timestamp');
		if(timestamp) {
			timestamp = timestamp.toFormattedString("%H:%M:%S");
		}
		
		var from = content.get('from');
		if(from)
			from = from.get('name');
		
		context = context.begin('div').addClass('chatMessage').
			addClass(action?'action':'chat');
		if(timestamp)
			context = context.begin('span').addClass('timestamp').
				push(timestamp).end();
		
		if(from)
			context = context.begin('span').addClass('from').
				push(from).end();
		
		context.begin('span').addClass('body').push(body).end();
		context = context.end();
		
		sc_super();
	}
});
