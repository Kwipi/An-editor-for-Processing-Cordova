'use strict';

define([], function () {

  function S4() {
    // jshint -W016
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    // jshint +W016
  }

  var randomId = function () {
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  };

  return randomId;
});
