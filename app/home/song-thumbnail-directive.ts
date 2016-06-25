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
    public static $inject: Array<string> = [
      '$rootScope'
    ];
    public isPlaying: boolean;
    private music: any;
    private $rootScope: ng.IRootScopeService;

    constructor($rootScope: ng.IRootScopeService) {
      let vm: SongThumbnailController = this;
      vm.$rootScope = $rootScope;
      vm.music = undefined;
      vm.$rootScope.$on('musicPlaying', function(): void {
        if (vm.isSongPlaying()) {
          vm.stopPlaying();
        }
      });
    }

    public playSong(previewUrl: string): void {
      this.emitPlayingEvent();
      this.music = new Audio(previewUrl);
      this.music.play();
    }

    public stopPlaying(): void {
      if (this.isSongPlaying()) {
        this.music.pause();
        this.music = undefined;
      }
    }

    private emitPlayingEvent(): void {
      this.$rootScope.$broadcast('musicPlaying');
    }

    public isSongPlaying(): boolean {
      return this.music !== undefined;
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
