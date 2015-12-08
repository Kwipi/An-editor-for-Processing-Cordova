'use strict';

define([
  'backbone', 'backbone.radio', 'marionette',
  'views/new-sketch', 'views/sketch-detail',
  'views/sketchs'
], function (
  Backbone, Radio, Marionette,
  NewSketchView, SketchDetailView,
  SketchsView
) {

  var SketchController = {
    actionNewSketch: function () {
      var rm, layoutChannel, tpl, View, view;

      layoutChannel = Radio.channel('pageLayout');
      rm = layoutChannel.request('manager');

      View = NewSketchView;
      view = new View();
      rm.get('regionMain').show(view);
    },
    actionSketch: function (id) {
      var rm, layoutChannel, tpl, View, view, sketchChannel;

      layoutChannel = Radio.channel('pageLayout');
      rm = layoutChannel.request('manager');

      sketchChannel = Radio.channel('sketch');
      sketchChannel.request('read:localforage', id).done(function (model) {
        //console.log(val);

        View = SketchDetailView;
        view = new View({
          model: model
        });
        rm.get('regionMain').show(view);
      });
    },
    actionSketchs: function () {
      var rm, layoutChannel, tpl, View, view, sketchChannel;

      layoutChannel = Radio.channel('pageLayout');
      rm = layoutChannel.request('manager');

      sketchChannel = Radio.channel('sketch');
      sketchChannel.request('read-all:localforage').done(function (coll) {
        //console.log(coll);

        View = SketchsView;
        view = new View({
          collection: coll
        });
        rm.get('regionMain').show(view);
      });
    }
  };

  return SketchController;
});
