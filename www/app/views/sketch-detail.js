'use strict';

define([
  'underscore', 'backbone.radio', 'marionette',
  'tpl!templates/sketch-detail.html'
], function (
  _, Radio, Marionette, SketchDetailTemplate
) {
  
  var SketchDetailView = Marionette.ItemView.extend({
    tagName: 'div',
    template: SketchDetailTemplate,
    editor: null,
    onRender: function () {
      this.$el.addClass('view row sketch-detail');

      var self = this;
      setTimeout(function () {
        self.editor = CodeMirror.fromTextArea(self.$el.find('#edit-sketch-content')[0], {
          lineNumbers: true,
          mode: 'clike',
          theme: 'monokai'
        });
      }, 100);
    },
    events: {
      'click #edit-sketch-test': 'testSketch',
      'click #edit-sketch-validate': 'validateSketch'
    },
    testSketch: function (e) {
      e.preventDefault();
      var self, spinChannel, sketch, canvas, pjs, val;

      spinChannel = Radio.channel('spin');
      spinChannel.request('show');

      canvas = this.$el.find('#edit-sketch-canvas > canvas')[0];
      val = this.editor.getValue();
      sketch = Processing.compile(val);
      pjs = new Processing(canvas, sketch);
      spinChannel.request('hide');
    },
    validateSketch: function (e) {
      e.preventDefault();
      var self, spinChannel, sketchChannel, code, name, value;

      spinChannel = Radio.channel('spin');
      spinChannel.request('show');

      name = this.$el.find('#edit-sketch-name').val();
      code = this.editor.getValue();
      this.model.set({
        name: name,
        code: code
      });

      value = _.clone(this.model.attributes);
      
      self = this;
      sketchChannel = Radio.channel('sketch');
      sketchChannel.request('update:localforage', value).done(function (val) {
        console.log(val);
        spinChannel.request('hide');
      });
    }
  });

  return SketchDetailView;
});
