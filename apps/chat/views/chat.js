// ==========================================================================
// Project:   Chat.ChatView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Chat.ChatView = SC.View.design({
	childViews: "chatList nickname enterText".w(),
	
	chatList: SC.ScrollView.design({
		layout: { left: 0, right: 0, top: 0, bottom: 30 },
		contentView: SC.ListView.design({
		})
	}),
	
	nickname: SC.LabelView.design({
		layout: { left: 0, width: 100, bottom: 0, height: 26 },
		valueBinding: "Chat.mainController.nickname"
	}),
	
	enterText: SC.TextFieldView.design({
		layout: { left: 110, right: 10, bottom: 0, height: 26 },
	})
});
