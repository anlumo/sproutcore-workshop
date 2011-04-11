// ==========================================================================
// Project:   Chat.mainController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Chat.mainController = SC.Object.create(SC.StatechartManger, {
	nickname: "Guest",
	
	rootState: SC.State.design({
		initialSubstate: "login",
		
		offline: SC.State.design({
			enterState: function() {
		    	Chat.mainView.set('newShowing', Chat.LoginView);
			}
		}),
		
		online: SC.State.design({
			enterState: function() {
			}
		}),
		
		chatting: SC.State.design({
			enterState: function() {
				Chat.mainView.set('newShowing', Chat.ChatView);
			}
		})
	})
});
