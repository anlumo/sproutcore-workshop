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
				var statechart = this.get('statechart');
				var dialog = Chat.createJoinChatDialog();
				var that = this;
				dialog.get('okButton').set('action', function() {
					var textField = dialog.get('nickNameField');
					textField.commitEditing();
					var nick = textField.get('fieldValue');
					textField = dialog.get('roomField');
					textField.commitEditing();
					var room = "%@@conference.%@".fmt(
						Strophe.escapeNode(textField.get('fieldValue')),
						statechart.server);
					
					that.roomArray = Chat.net.find(
						SC.Query.local(Chat.room, 'jid = {jid}', { jid: room }));
					that.roomArray.addObserver('[]', that, 'roomArrayChanged');
					
					statechart.set('nickname', nick);
					
					Chat.net.get('dataSource').joinMUC(room, nick);
					dialog.remove();
				});
				dialog.append();
			},
			
			roomArrayChanged: function() {
				if(this.roomArray.length() === 1) {
					this.roomArray.removeObserver('[]', this, 'roomArrayChanged');
					
					this.get('statechart').set('room', this.roomArray.objectAt(0));
					this.gotoState('chatting');
				}
			}
		}),
		chatting: SC.State.design({
			enterState: function() {
				Chat.mainPage.get('mainView').set('nowShowing', Chat.ChatRoomView);
				var chatview = Chat.mainPage.get('mainView').get('contentView');
				var room = this.get('statechart').get('room');
				
				var newLineFun = function(line) {
					if(line && line.length() > 0)
						Chat.net.createRecord(Chat.Message, {
							roomJid: room.get('jid'),
							body: line
						});
				};

				chatview.get('enterText').set('lineHandler', newLineFun);
				chatview.get('enterText').set('actionHandler', function(line) {
					newLineFun("/me " + line);
				});
				
				chatview.becomeFirstResponder();
				Chat.chatlinesController.bind('room', SC.Binding.from('Chat.chatController.room'));
				Chat.usersController.bind('room', SC.Binding.from('Chat.chatController.room'));
			},
			
			exitState: function() {
				this.get('statechart').set('room', null);
			}
		})
	})
});
