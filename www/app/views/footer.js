'use strict';

define([
  'marionette', 'tpl!templates/footer.html'
], function (
  Marionette, FooterTemplate
) {

  var FooterView = Marionette.View.extend({
    tagName: 'footer',
    template: FooterTemplate(),
    render: function () {
      this.$el.append(this.template);
    },
    onRender: function () {
      this.$el.addClass('row footer region page-layout-region')
        .addClass('page-layout-footer');
    }
  });

  return FooterView;
});
