sc_require('views/message.js');
sc_require('views/chat_list.js');

Chat.ChatRoomView = SC.MasterDetailView.design({
	detailView: SC.View.design({
		childViews: "chatList nickname enterText".w(),
		
		chatList: SC.ScrollView.design({
			layout: { left: 0, right: 0, top: 0, bottom: 30 },
			hasHorizontalScroller: NO,
			contentView: Chat.ChatListView.design({
				exampleView: Chat.MessageView,
				contentBinding: "Chat.chatlinesController.arrangedObjects",
				selectionBinding: "Chat.chatlinesController.selection",
			})
		}),
		
		nickname: SC.LabelView.design({
			layout: { left:0, width: 100, bottom: 0, height: 26 },
			valueBinding: "Chat.chatController.nickname"
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
					this.set('value', '');
				}
			}
		})
	}),
	masterView: SC.ScrollView.design({
		hasHorizontalScroller: NO,
		contentView: SC.ListView.design({
			exampleView: SC.LabelView,
			contentBinding: "Chat.usersController.arrangedObjects",
			selectionBinding: "Chat.usersController.selection",
			contentValueKey: "name"
		})
	}),
	
	enterText: SC.outlet("detailView.enterText")
});
