'use strict';

define([
  'jquery', 'underscore', 'backbone', 'backbone.radio', 'marionette',
  'routers/sketch', 'collections/sketch'
], function (
  $, _, Backbone, Radio, Marionette,
  SketchRouter, SketchCollection
) {

  var SketchComponent = Backbone.Model.extend({
    defaults: {
      name: 'Sketch',
      slug: 'sketch',
      router: false,
      dataCollection: false,
      channel: false
    },
    readAll: function () {
      var coll,
      deferred = $.Deferred();
      coll = this.get('dataCollection');
      //console.log('read the collection: ');
      //console.log(coll);
      deferred.resolve(coll);
      return deferred.promise();
    },
    readAllFromLocalForage: function () {
      var coll,
      deferred = $.Deferred();
      coll = this.get('dataCollection');
      coll.fetch({
        success: function(collected) {
          //console.log('read from localForage: ');
          //console.log(collected);
          deferred.resolve(collected);
        }
      });
      return deferred.promise();
    },
    readModel: function (id) {
      var coll,
      deferred = $.Deferred();
      coll = this.get('dataCollection');
      //console.log('read the collection: ');
      //console.log(coll);
      deferred.resolve(coll.get(id));
      return deferred.promise();
    },
    readFromLocalForage: function (id) {
      var coll,
      deferred = $.Deferred();
      coll = this.get('dataCollection');
      coll.get(id).fetch({
        success: function(collected) {
          //console.log('read from localForage: ');
          //console.log(collected);
          deferred.resolve(collected);
        }
      });
      return deferred.promise();
    },
    createToLocalForage: function (val) {
      var coll,
      deferred = $.Deferred();
      coll = this.get('dataCollection');
      coll.create(val, {
        success: function(model) {
          //console.log('created to localForage: ');
          //console.log(model);
          deferred.resolve(model);
        }
      });
      return deferred.promise();
    },
    deleteFromLocalForage: function (id) {
      var coll,
      deferred = $.Deferred();
      coll = this.get('dataCollection');
      coll.get(id).destroy({
        success: function(collected) {
          //console.log('deleted from localForage: ');
          //console.log(collected);
          deferred.resolve(collected);
        }
      });
      return deferred.promise();
    },
    updateLocalForage: function (id, val) {
      var coll,
      deferred = $.Deferred();
      coll = this.get('dataCollection');
      //console.log(coll.get(id));
      coll.get(id).save(val, {
        success: function(model) {
          //console.log('updated localForage: ');
          //console.log(model);
          deferred.resolve(model);
        }
      });
      return deferred.promise();
    },
    initialize: function () {
      this.set({channel: Radio.channel('sketch')});
      this.set({dataCollection: new SketchCollection()});
      var self = this;
      this.get('channel').reply('read-all', function () {
        return self.readAll();
      });
      this.get('channel').reply('read-all:localforage', function () {
        return self.readAllFromLocalForage();
      });
      this.get('channel').reply('read', function (id) {
        return self.readModel(id);
      });
      this.get('channel').reply('read:localforage', function (id) {
        return self.readFromLocalForage(id);
      });
      this.get('channel').reply('create:localforage', function (val) {
        return self.createToLocalForage(val);
      });
      this.get('channel').reply('delete:localforage', function (id) {
        return self.deleteFromLocalForage(id);
      });
      this.get('channel').reply('update:localforage', function (id, val) {
        return self.updateLocalForage(id, val);
      });
    },

    initRouter: function () {
      this.set({router: new SketchRouter()});
      return this;
    }
  });

  return SketchComponent;
});
