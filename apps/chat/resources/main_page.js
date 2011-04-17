// ==========================================================================
// Project:   Chat - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

// This page describes the main user interface for your application.  
Chat.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'labelView meinButton'.w(),
    
    labelView: SC.LabelView.design({
      layout: { left: 10, bottom: 100, width: 200, height: 18 },
      textAlign: SC.ALIGN_LEFT,
      tagName: "h1", 
      value: "Welcome to SproutCore!"
    }),
    
    meinButton: SC.ButtonView.design({
    	layout: { right: 20, top: 50, width: 200, height: 22 },
    	title: 'Action!'.loc()
    })
  })

});
