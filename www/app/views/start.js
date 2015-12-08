'use strict';

define([
  'marionette', 'tpl!templates/start.html'
], function (
  Marionette, StartTemplate
) {
  
  var StartView = Marionette.ItemView.extend({
    tagName: 'article',
    template: StartTemplate,
    onRender: function () {
      this.$el.addClass('row view static-page start-page')
        .attr('role', 'article')
        .attr('itemprop', 'mainContentOfPage');
    }
  });

  return StartView;
});
