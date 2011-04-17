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
    childViews: 'mainView'.w(),
    
    mainView: SC.ContainerView.design({
    })
  }),
  
  mainView: SC.outlet('mainPane.mainView')

});
