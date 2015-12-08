'use strict';

define([
  'backbone', 'backbone.radio', 'marionette',
  'views/start','views/static', 'tpl!templates/about.html',
  'tpl!templates/changelog.html', 'tpl!templates/coverage.html',
  'tpl!templates/credits.html', 'tpl!templates/deps.html', 'tpl!templates/jsdoc.html',
  'tpl!templates/license.html', 'tpl!templates/test.html'
], function (
  Backbone, Radio, Marionette,
  StartView, StaticView, AboutTemplate,
  ChangelogTemplate, CoverageTemplate,
  CreditsTemplate, DepsTemplate, JsdocTemplate,
  LicenseTemplate, TestTemplate
) {

  var StaticController = {
    actionStart: function () {
      var rm, layoutChannel, tpl, View, view;

      layoutChannel = Radio.channel('pageLayout');
      rm = layoutChannel.request('manager');

      View = StartView.extend({});
      view = new View();
      rm.get('regionMain').show(view);
    },
    actionStatic: function (page) {

      var rm, layoutChannel, tpl, View, view;

      layoutChannel = Radio.channel('pageLayout');
      rm = layoutChannel.request('manager');

      switch (page) {
        case 'about':
          tpl = AboutTemplate;
          break;
        case 'changelog':
          tpl = ChangelogTemplate;
          break;
        case 'coverage':
          tpl = CoverageTemplate;
          break;
        case 'credits':
          tpl = CreditsTemplate;
          break;
        case 'deps':
          tpl = DepsTemplate;
          break;
        case 'jsdoc':
          tpl = JsdocTemplate;
          break;
        case 'license':
          tpl = LicenseTemplate;
          break;
        case 'test':
          tpl = TestTemplate;
          break;
      }

      View = StaticView.extend({
        template: tpl()
      });
      view = new View();
      rm.get('regionMain').show(view);
    }
  };

  return StaticController;
});
