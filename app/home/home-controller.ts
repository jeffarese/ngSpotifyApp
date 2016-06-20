///<reference path='../../typings/tsd.d.ts' />
module HomeCtrl {
  'use strict';


  class HomeCtrl {

    private songFinder: SongFinder.SongFinder;
    public songName: string;
    public songList;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: Array<string> = [
      'SongFinder'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(SongFinder: SongFinder.SongFinder) {
      this.songFinder = SongFinder;

    }

    public searchSong(songName: string): void {
      let vm: HomeCtrl = this;
      vm.songFinder.searchSong(songName).then(function(r: any): void {
        vm.songList = r.data.tracks.items;
      });
    }

  }

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);
}
