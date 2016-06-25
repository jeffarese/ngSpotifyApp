///<reference path='../typings/tsd.d.ts' />
module myApp {
  'use strict';

  angular
    .module('myApp')
    .config(config);

  function config($urlRouterProvider: ng.ui.IUrlRouterProvider): void {
    $urlRouterProvider.otherwise('/home');
  }
}
