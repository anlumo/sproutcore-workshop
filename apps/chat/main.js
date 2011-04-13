// ==========================================================================
// Project:		Chat
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

// This is the function that will start your app running.	 The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Chat.main = function main() {
	SC.Query.registerQueryExtension('isnotnull', {
		reservedWord: true,
		leftType: 'PRIMITIVE',
		evalType: 'BOOLEAN',
		evaluate: function(r,w) {
			var left = this.leftSide.evaluate(r,w);
			return left != null;
		}
	});
	
	// Step 1: Instantiate Your Views
	// The default code here will make the mainPane for your application visible
	// on screen.	 If you app gets any level of complexity, you will probably 
	// create multiple pages and panes.	 
	Chat.getPath('mainPage.mainPane').append();
	
	// we have to do some query on the store to get it to instantiate in time
	// otherwise, we can't connect
	var query = SC.Query.local(Chat.User);
	Chat.net.find(query);
	
	Chat.mainController = Chat.mainController.create();
};

function main() { Chat.main(); }
