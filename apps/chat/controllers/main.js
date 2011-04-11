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
				var dialog = Chat.createJoinChatDialog();
				dialog.get('okButton').set('action', function() {
					var textField = dialog.get('nickNameField');
					textField.commitEditing();
					var nick = textField.get('fieldValue');
					Chat.net.get('dataSource').joinMUC("workshop@conference.ledwatch.local", nick);
					dialog.remove();
				});
				
				dialog.append();
				dialog.get('nickNameField').becomeFirstResponder();
			}
		}),
		
		chatting: SC.State.design({
			enterState: function() {
				Chat.mainPage.get('mainView').set('newShowing', Chat.ChatView);
			}
		})
	})
});
