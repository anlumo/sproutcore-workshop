// ==========================================================================
// Project:   Chat.LoginView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Chat.LoginView = SC.View.extend({
	childViews: "infoLabel".w(),
	
	infoLabel: SC.LabelView.design({
		layout: { centerX: 0, centerY: 0, width: 100, height: 26 },
		value: "Logging In…".loc()
	})
});
