// ==========================================================================
// Project:   Chat.ChatView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
sc_require('views/message.js');
sc_require('views/chat_list.js');

Chat.ChatView = SC.MasterDetailView.design({
	detailView: SC.View.design({
		childViews: "chatList nickname enterText".w(),
		
		chatList: SC.ScrollView.design({
			layout: { left: 0, right: 0, top: 0, bottom: 30 },
			hasHorizontalScroller: NO,
			contentView: Chat.ChatListView.design({
				exampleView: Chat.MessageView,
				contentBinding: "Chat.chatlinesController.arrangedObjects",
				selectionBinding: "Chat.chatlinesController.selection",
				mouseDown: function(event) {
					this.get('parentView').get('parentView').get('parentView').enterText.becomeFirstResponder();
				}
			})
		}),
		
		nickname: SC.LabelView.design({
			layout: { left: 0, width: 100, bottom: 0, height: 26 },
			valueBinding: "Chat.mainController.nickname"
		}),
		
		enterText: SC.TextFieldView.design({
			layout: { left: 110, right: 10, bottom: 0, height: 26 },
			keyDown: function(event) {
				sc_super();
				
				if(event.commandCodes().firstObject() === "return") {
					if(this.get('lineHandler')) {
						this.get('lineHandler')(this.get('value'));
					}
					this.set('value', '');
				} else if(event.commandCodes().firstObject() === "shift_return") {
					if(this.get('actionHandler')) {
						this.get('actionHandler')(this.get('value'));
					}
					this.set('value','');
				}
			}
		})
	}),
	masterView: SC.ScrollView.design({
		hasHorizontalScroller: NO,
		contentView: SC.ListView.design({
			exampleView: SC.LabelView,
			contentValueKey: "name",
			contentBinding: "Chat.usersController.arrangedObjects",
			selectionBinding: "Chat.usersController.selection"
		})
	}),
	
	enterText: SC.outlet("detailView.enterText")
});
