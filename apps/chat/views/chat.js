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

Chat.ChatView = SC.MasterDetailView.design({
	detailView: SC.View.design({
		childViews: "chatList nickname enterText".w(),
		
		chatList: SC.ScrollView.design({
			layout: { left: 0, right: 0, top: 0, bottom: 30 },
			hasHorizontalScroller: NO,
			contentView: SC.ListView.design({
				exampleView: Chat.MessageView,
				contentBinding: "Chat.chatlinesController.arrangedObjects",
				selectionBinding: "Chat.chatlinesController.selection"
			})
		}),
		
		nickname: SC.LabelView.design({
			layout: { left: 0, width: 100, bottom: 0, height: 26 },
			valueBinding: "Chat.mainController.nickname"
		}),
		
		enterText: SC.TextFieldView.design({
			layout: { left: 110, right: 10, bottom: 0, height: 26 },
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
	})
});
