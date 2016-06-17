///<reference path='../typings/tsd.d.ts' />
module myApp {
  'use strict';

  /* @ngdoc object
   * @name myApp
   * @description
   *
   */
  angular
    .module('myApp', [
      'ngMaterial',
      'ui.router',
      'home'
    ]);
}
