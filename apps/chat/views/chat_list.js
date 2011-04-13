// ==========================================================================
// Project:   Chat.ChatListView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Chat */

/** @class

  (Document Your View Here)

  @extends SC.ListView
*/
Chat.ChatListView = SC.ListView.extend({
	customRowHeightIndexes: function() {
		return this.get('allContentIndexes');
	}.property('allContentIndexes').cacheable(),
	
	contentIndexRowHeight: function(view, content, contentIndex) {
		var entry = content.objectAt(contentIndex);
		var someView = view.get('childViews').firstObject();
		if(!someView)
			return 100;
		
		var width = someView.get('frame').width;
		width -= 260;
		
		var size = SC.metricsForString(entry.get('body'), 'max-width: %@px'.fmt(width), ['chatMessageMeasurement']);
		return size.height + 8;
	},
	
	viewDidResize: function() {
		sc_super();
		this.rowHeightDidChangeForIndexes(this.get('allContentIndexes'));
	},
	
	newContentAdded: function() {
		// refresh last message height
		var length = this.get('content').get('length');
		this.rowHeightDidChangeForIndexes(length-1);
	}.observes('.content.[]'),
	
	newViewsAdded: function() {
		// scroll to the bottom
		var childArray = this.get('childViews');
		var length = childArray.get('length');
		if(length > 1) {
			var scrollview = this.parentView.parentView;
			var frame = this.get('frame');
			if(scrollview.get('verticalScrollOffset') >= frame.height - this.parentView.get('frame').height) {
				this.invokeLast(function() {
					var frame = this.get('frame');
					scrollview.scrollTo(0, frame.height);
				});
			}
		}
	}.observes('*childViews.length')
});

//SC.teardownStringMeasurement = function() {
//};
