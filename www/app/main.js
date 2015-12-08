'use strict';

define([
  'jquery', 'underscore', 'backbone', 'backbone.radio', 'marionette',
  'fastclick', 'bootstrap', 'views/navtop', 'views/footer',
  'routers/static', 'lib/sketch'
], function (
  $, _, Backbone, Radio, Marionette,
  FastClick, Bootstrap, NavTopView, FooterView,
  StaticRouter, SketchComponent
) {

  var App, AnEditorForProcessing, navTop, footer, rm,
  layoutChannel, initChannel, StaticRouter, router, done,
  sketchComponent;

  App = Marionette.Application.extend({});
  AnEditorForProcessing = new App({});

  initChannel = Radio.channel('init');
  initChannel.reply('history:start', function () {
    $(document).ready(function () {
      FastClick.attach(document.body);
      setTimeout(function () {
        Backbone.history.start({
          pushState: false,
          root: '/'
        });
        //console.log('Load: Backbone.history started');
      }, 500);
    });
  });

  AnEditorForProcessing.on('before:start', function () {
    router = new StaticRouter();

    done = _.after(2, function () {
      initChannel.request('history:start');
    });

    sketchComponent = new SketchComponent();
    sketchComponent.get('channel').request('read-all:localforage').done(function (coll) {
      //console.log(coll);
      sketchComponent.initRouter();
      done();
    });

    rm = new Marionette.RegionManager();
    rm.addRegions({
      'regionNavTop': '#navtop-region',
      'regionMain': '#main-region',
      'regionFooter': '#footer-region'
    });

    navTop = new NavTopView();
    footer = new FooterView();

    rm.get('regionNavTop').show(navTop);
    rm.get('regionFooter').show(footer);

    layoutChannel = Radio.channel('pageLayout');
    layoutChannel.reply('manager', function () {
      return rm;
    });

    done();
  });

  return AnEditorForProcessing;
});
