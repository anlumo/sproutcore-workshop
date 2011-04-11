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
	server: "ledwatch.local",
	room: null,
	
	rootState: SC.State.design({
		initialSubstate: "offline",
		
		offline: SC.State.design({
			enterState: function() {
		    	Chat.mainPage.get('mainView').set('newShowing', Chat.LoginView);
		    	
		    	Chat.net.get('dataSource').connect(Chat.net, this.get('statechart').server);
		    	
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
			roomArray: null,
			enterState: function() {
				var dialog = Chat.createJoinChatDialog();
				var that = this;
				var statechart = this.get('statechart');
				dialog.get('okButton').set('action', function() {
					var textField = dialog.get('nickNameField');
					textField.commitEditing();
					var nick = textField.get('fieldValue');
					textField = dialog.get('roomField');
					textField.commitEditing();
					var room = "%@@conference.%@".fmt(Strophe.escapeNode(textField.get('fieldValue')), statechart.server);
					
					that.roomArray = Chat.net.find(SC.Query.local(Chat.Room, 'jid = {jid}', { jid: room }));
					that.roomArray.addObserver('[]', that, 'roomArrayChanged');
					
					Chat.net.get('dataSource').joinMUC(room, nick);
					dialog.remove();
				});
				
				dialog.append();
				dialog.get('nickNameField').becomeFirstResponder();
			},
			
			roomArrayChanged: function() {
				if(this.roomArray.length() == 1) {
					this.roomArray.removeObserver('[]', this, 'roomArrayChanged');
					
					this.get('statechart').set('room', this.roomArray.objectAt(0));
					this.gotoState('chatting');
				}
			}
		}),
		
		chatting: SC.State.design({
			enterState: function() {
				Chat.mainPage.get('mainView').set('newShowing', Chat.ChatView);
			},
			
			exitState: function() {
				this.get('statechart').set('room', null);
			}
		})
	})
});
