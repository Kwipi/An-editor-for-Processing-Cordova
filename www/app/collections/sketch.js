'use strict';

define([
  'underscore', 'backbone', 'models/sketch',
  'helpers/random-id', 'localforage', 'backbone-localforage'
], function (
  _, Backbone, SketchModel, randomId
) {

  var SketchCollection = Backbone.Collection.extend({
    model: SketchModel,
    sync: Backbone.localforage.sync('sketch')
  });

  return SketchCollection;
});
