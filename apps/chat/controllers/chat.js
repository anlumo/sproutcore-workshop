// ==========================================================================
// Project:   Chat.chatController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
sc_require('resources/main_page.js');
sc_require('views/login.js');

Chat.chatController = SC.Object.create(SC.StatechartManager, {
	rootState: SC.State.design({
		initialSubstate: 'offline',
	
		offline: SC.State.design({
			enterState: function() {
				Chat.mainPage.get('mainView').set('nowShowing', Chat.LoginView);
			},
			exitState: function() {
			}
		}),
		online: SC.State.design({
		}),
		chatting: SC.State.design({
		})
	})
});
