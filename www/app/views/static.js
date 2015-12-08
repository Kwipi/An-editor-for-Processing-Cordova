'use strict';

define([
  'marionette', 'jquery-qrcode'
], function (
  Marionette
) {

  var StaticView = Marionette.View.extend({
    tagName: 'article',
    render: function () {
      this.$el.html(this.template);
      this.$el.addClass('view static-page')
        .attr('role', 'article')
        .attr('itemprop', 'mainContentOfPage');

      if (this.$el.find('#about-qr').length > 0) {
        this.$el.find('#about-qr').qrcode({
          render: 'canvas',
          minVersion: 1,
          maxVersion: 40,
          ecLevel: 'L',
          left: 0,
          top: 0,
          size: 200,
          fill: '#333',
          background: null,
          text: 'http://kwipi.org/aefp',
          radius: 0,
          quiet: 0,
          mode: 0,
          mSize: 0.1,
          mPosX: 0.5,
          mPosY: 0.5,
          label: 'An Editor for Processing',
          fontname: 'sans',
          fontcolor: '#333',
          image: null
        });
      }
    }
  });

  return StaticView;
});
