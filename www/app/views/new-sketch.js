'use strict';

define([
  'underscore', 'backbone.radio', 'marionette', 'helpers/random-id',
  'models/sketch', 'tpl!templates/new-sketch.html',
  'bootstrap-validator'
], function (
  _, Radio, Marionette, randomId,
  SketchModel, NewSketchTemplate
) {
  
  var NewSketchView = Marionette.ItemView.extend({
    tagName: 'article',
    template: NewSketchTemplate,
    initialize: function () {
      if (!this.model || this.model.length === 0) {
        this.model = new SketchModel();
      }
    },
    editor: null,
    onRender: function () {
      this.$el.addClass('view row new-sketch-page')
        .attr('role', 'article')
        .attr('itemprop', 'mainContentOfPage');

      this.$el.find('#new-sketch-form').validator({
        feedback: {
          success: 'fa-check-circle',
          error: 'fa-times'
        },
        disable: true
      });

      var self = this;

      setTimeout(function () {
        self.editor = CodeMirror.fromTextArea(self.$el.find('#new-sketch-content')[0], {
          lineNumbers: true,
          mode: 'clike',
          theme: 'monokai'
        });
      }, 100);
    },
    events: {
      'click #new-sketch-test': 'testSketch',
      'click #new-sketch-validate': 'validateSketch',
      'click #new-sketch-another': 'render'
    },
    testSketch: function (e) {
      e.preventDefault();
      var self, spinChannel, sketch, canvas, pjs, val;

      spinChannel = Radio.channel('spin');
      spinChannel.request('show');

      canvas = this.$el.find('#new-sketch-canvas > canvas')[0];
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

      name = this.$el.find('#new-sketch-name').val();
      code = this.editor.getValue();
      this.model.set({
        name: name,
        code: code
      });

      value = _.clone(this.model.attributes);
      value.id = randomId();
      
      self = this;
      sketchChannel = Radio.channel('sketch');
      sketchChannel.request('create:localforage', value).done(function (val) {
        console.log(val);
        self.$el.find('#new-sketch-form').hide();
        self.$el.find('#new-sketch-goto').attr('href', '#sketch/' + val.get('id'));
        self.$el.find('#new-sketch-goto-wrap').show();
        spinChannel.request('hide');
      });
    }
  });

  return NewSketchView;
});
