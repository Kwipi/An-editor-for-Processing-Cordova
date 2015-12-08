'use strict';

define([
  'backbone.radio', 'marionette', 'views/sketch', 'tpl!templates/sketchs.html'
], function (
  Radio, Marionette, SketchView, SketchsTemplate
) {
  
  var SketchsView = Marionette.CompositeView.extend({
    childView: SketchView,
    tagName: 'article',
    template: SketchsTemplate,
    childViewContainer: 'ul.list-group',
    onRender: function () {
      this.$el.addClass('row view static-page sketchs-page')
        .attr('role', 'article')
        .attr('itemprop', 'mainContentOfPage');
    },
    events: {
      'click .delete-sketch': 'deleteSketch'
    },
    deleteSketch: function (e) {
      var id, sketchChannel;
      id = $(e.currentTarget).attr('data-id');
      sketchChannel = Radio.channel('sketch');
      sketchChannel.request('delete:localforage', id).done(function (val) {
        console.log('Deleted sketch with ID: ' + id);
      });
    }
  });

  return SketchsView;
});
