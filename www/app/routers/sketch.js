'use strict';

define([
  'marionette', 'controllers/sketch'
], function (
  Marionette, SketchController
) {

  var SketchRouter =  Marionette.AppRouter.extend({
    controller: SketchController,
    appRoutes: {
      'sketchs/new': 'actionNewSketch',
      'sketch/:id(/:img)': 'actionSketch',
      'sketchs': 'actionSketchs'
    }
  });

  return SketchRouter;
});
