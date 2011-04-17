var g = require('./garcon/lib/garcon'),
    fs = require('fs'),
    server = new g.Server({ port: 4020, proxyHost: '10.20.30.222', proxyPort: 7070});
 
var myApp = server.addApp({
  name: 'chat',
  theme: 'chat'
});

myApp.addSproutcore();

myApp.addFrameworks(
  { path: 'frameworks/strophe'},
  { path: 'frameworks/sproutcore/themes/ace'},
  { path: 'frameworks/sproutcore/frameworks/statechart'},
  { path: 'frameworks/sproutcore/themes/empty_theme'},
  { path: 'apps/chat'} //, buildLanguage: 'french' }
);

// add some html for inside the <head> tag
myApp.htmlHead = '<title>My App</title>';

// add some html for inside the <body> tag
myApp.htmlBody = [
  '<p id="loading">',
    'Loading…',
  '</p>'
].join('\n');



myApp.build();

server.run();

