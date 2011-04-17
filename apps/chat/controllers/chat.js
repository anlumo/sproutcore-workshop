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
	server: "ledwatch.local",

	rootState: SC.State.design({
		initialSubstate: 'startup',
		
		startup: SC.State.design({
		}),
	
		offline: SC.State.design({
			enterState: function() {
				Chat.mainPage.get('mainView').set('nowShowing', Chat.LoginView);
				
				Chat.addObserver('myself', this, 'connected');
				Chat.net.get('dataSource').connect(Chat.net, this.get('statechart').server);
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
				console.log("create join chat dialog");
				var dialog = Chat.createJoinChatDialog();
				dialog.get('okButton').set('action', function() {
					dialog.remove();
				});
				dialog.append();
			}
		}),
		chatting: SC.State.design({
		})
	})
});
