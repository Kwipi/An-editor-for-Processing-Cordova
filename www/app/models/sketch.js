'use strict';

define([
  'jquery', 'underscore', 'backbone',
  'localforage', 'backbone-localforage'
], function (
  $, _, Backbone
) {

  var SketchModel = Backbone.Model.extend({
    defaults: {
      name: 'My sketch',
      code: ''
    },
    sync: Backbone.localforage.sync('sketch')
  });

  return SketchModel;
});
