///<reference path='../../typings/tsd.d.ts' />
module SongThumbnail {
  'use strict';

  function SongThumbnailDirective(): ng.IDirective {
    return {
      restrict:     'EA',
      scope:        {
        song: '='
      },
      templateUrl:  'home/song-thumbnail-directive.tpl.html',
      replace:      false,
      controllerAs: 'songThumbnail',
      controller:   SongThumbnailController,
      link:         function (scope: ng.IScope, element: JQuery, attrs: any): void {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    }
  }

  export class SongThumbnailController {
    public static $inject: Array<string> = [];

    constructor() {
      //
    }

    public playSong(previewUrl: string): void {
      console.log(this);
      new Audio(previewUrl).play();
    }
  }

  /**
   * @ngdoc directive
   * @name home.directive:songThumbnail
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   *   <example module="home">
   *       <file name="index.html">
   *           <song-thumbnail></song-thumbnail>
   *       </file>
   *   </example>
   *
   */
  angular
    .module('home')
    .directive('songThumbnail', SongThumbnailDirective);
}
