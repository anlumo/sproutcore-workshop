Chat.createJoinChatDialog = function() {
	return SC.PanelPane.create({
		layout: { width: 300, height: 180, centerX: 0, centerY: 0 },
		contentView: SC.View.design({
			childViews: "prompt nickName roomPrompt roomName okButton".w(),
			
			prompt: SC.LabelView.design({
				layout: { top: 8, left: 8, right: 8, height: 22 },
				value: 'Please enter your nickname:'.loc()
			}),
			nickName: SC.TextFieldView.design({
				layout: { top: 30, left: 8, right: 8, height: 22 },
			}),
			roomPrompt: SC.LabelView.design({
				layout: { top: 60, left: 8, right: 8, height: 22 },
				value: 'Please enter the room to join:'.loc()
			}),
			roomName: SC.TextFieldView.design({
				layout: { top: 82, left: 8, right: 8, height: 22 },
				value: "workshop"
			}),
			okButton: SC.ButtonView.design({
				layout: { right: 8, bottom: 8, width: 80, height: 22 },
				title: 'Join'.loc(),
				isDefault: YES
			})
		}),
		nickNameField: SC.outlet("contentView.nickName"),
		roomField: SC.outlet("contentView.roomName"),
		okButton: SC.outlet("contentView.okButton")
	});
};
