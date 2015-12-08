'use strict';

define([
  'marionette', 'tpl!templates/sketch.html'
], function (
  Marionette, SketchTemplate
) {
  
  var SketchView = Marionette.ItemView.extend({
    tagName: 'li',
    template: SketchTemplate,
    onRender: function () {
      this.$el.addClass('view sketch-item list-group-item');
    }
  });

  return SketchView;
});
