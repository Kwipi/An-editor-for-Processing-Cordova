'use strict';

define([
  'backbone.radio', 'marionette', 'tpl!templates/navtop.html',
  'spin', 'jqueryspin'
], function (
  Radio, Marionette, NavtopTemplate
) {

  var NavtopView = Marionette.ItemView.extend({
    tagName: 'div',
    template: NavtopTemplate(),
    onRender: function () {
      var self, spinChannel = Radio.channel('spin');
      this.$el.addClass('container');

      this.$el.find('#mainspin').spin({
        lines: 10,
        length: 12,
        width: 10,
        radius: 30,
        scale: 0.25,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: '30px',
        left: ($(document).width() > 767) ? '70%' : '95%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
      });
      this.$el.find('#mainspin').hide();

      self = this;
      spinChannel.reply('show', function () {
        self.$el.find('#mainspin').show();
      });
      spinChannel.reply('hide', function () {
        self.$el.find('#mainspin').hide();
      });
    }
  });

  return NavtopView;
});
