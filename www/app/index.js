'use strict';

require.config({
  baseUrl: 'app',
  paths: {
    jquery: 'lib/jquery/dist/jquery.min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    'backbone.radio': 'lib/backbone.radio/build/backbone.radio.min',
    marionette: 'lib/backbone.marionette/lib/backbone.marionette.min',
    localforage: 'lib/localforage/dist/localforage.min',
    'backbone-localforage': 'lib/localforage-backbone/dist/localforage.backbone.min',
    bootstrap: 'lib/bootstrap/dist/js/bootstrap.min',
    fastclick: 'lib/fastclick/lib/fastclick',
    //s: 'lib/underscore.string/dist/underscore.string.min',
    'jquery-qrcode': 'lib/jquery-qrcode/dist/jquery.qrcode.min',
    rangeslider: 'lib/rangeslider.js/dist/rangeslider.min',
    spin: 'lib/spin.js/spin.min',
    jqueryspin: 'lib/spin.js/jquery.spin',
    'bootstrap-validator': 'lib/bootstrap-validator/dist/validator.min'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.radio': {
      deps: ['underscore', 'jquery', 'backbone'],
      exports: 'Radio'
    },
    localforage: {
      exports: 'LocalForage'
    },
    'backbone-localforage': {
      deps: ['localforage', 'backbone'],
      exports: 'Backbone.localforage'
    },
    marionette: {
      deps: ['underscore', 'jquery', 'backbone'],
      exports: 'Backbone.Marionette'
    },
    bootstrap: {
      deps: ['jquery']
    },
    //s: {
    //  exports: 's'
    //},
    'jquery-qrcode': {
      deps: ['jquery']
    },
    rangeslider: {
      deps: ['jquery']
    },
    spin: {
      deps: ['jquery']
    },
    jqueryspin: {
      deps: ['jquery', 'spin']
    },
    'bootstrap-validator': {
      deps: ['jquery', 'bootstrap']
    }
  },

  scriptType: 'text/javascript'
});

define('index', [
  'main'
], function (
  AnEditorForProcessing
) {
  var cordovaApp = {
    initialize: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
      cordovaApp.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
      var app = AnEditorForProcessing;

      app.start();
    }
  };
  cordovaApp.initialize();
});
