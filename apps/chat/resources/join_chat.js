Chat.createJoinChatDialog = function() {
	return SC.PanelPane.create({
		layout: { width: 300, height: 150, centerX: 0, centerY: 0 },
		contentView: SC.View.extend({
			layout: { left: 0, right: 0, top: 0, bottom: 0 },
			childViews: "prompt nickName okButton".w(),
				
 			prompt: SC.LabelView.design({
				layout: { top: 8, left: 8, right: 8, height: 22 },
				value: 'Please enter your nickname:'.loc()
			}),
			nickName: SC.TextFieldView.design({
				layout: { top: 30, left: 8, right: 8, height: 22 }
			}),
			okButton: SC.ButtonView.design({
				layout: { right: 8, bottom: 8, width: 80, height: 25 },
				title: 'Join'.loc(),
				isDefault: YES
			})
		}),
		nickNameField: SC.outlet('contentView.nickName'),
		okButton: SC.outlet('contentView.okButton')
	});
};
