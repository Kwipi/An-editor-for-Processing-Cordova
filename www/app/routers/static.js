'use strict';

define([
  'marionette', 'controllers/static'
], function (
  Marionette, StaticController
) {

  var StaticRouter =  Marionette.AppRouter.extend({
    controller: StaticController,
    appRoutes: {
      'static/:page': 'actionStatic',
      'start': 'actionStart',
      '*actions': 'actionStart'
    }
  });

  return StaticRouter;
});
