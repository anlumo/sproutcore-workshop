// ==========================================================================
// Project:   Chat.mainController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Chat.mainController = SC.Object.extend(SC.StatechartManager, {
	nickname: "Guest",
	
	rootState: SC.State.design({
		initialSubstate: "offline",
		
		offline: SC.State.design({
			enterState: function() {
		    	Chat.mainPage.get('mainView').set('newShowing', Chat.LoginView);
		    	
		    	Chat.net.get('dataSource').connect(Chat.net, "silversurfer.local");
		    	
		    	Chat.addObserver('myself', this, 'connected');
			},
			
			exitState: function() {
		    	Chat.removeObserver('myself', this, 'connected');
			},
			
			connected: function() {
				this.gotoState('online');
			}
		}),
		
		online: SC.State.design({
			enterState: function() {
				console.log("we're online!");
			}
		}),
		
		chatting: SC.State.design({
			enterState: function() {
				Chat.mainPage.get('mainView').set('newShowing', Chat.ChatView);
			}
		})
	})
});
