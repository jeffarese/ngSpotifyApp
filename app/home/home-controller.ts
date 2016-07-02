///<reference path='../../typings/tsd.d.ts' />
module HomeCtrl {
  'use strict';

  interface ISong {
    artists: Array<{name: string}>,
    album: { images: Array<{ url: string }> },
    song: string,
  }

  class HomeCtrl {

    private songFinder: SongFinder.SongFinder;
    public songList: Array<ISong>;

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

    private setSongList(songList: Array<ISong>): void {
      this.songList = songList;
    }

    public searchSong(songName: string): void {
      let vm: HomeCtrl = this;
      if (songName) {
        vm.songFinder.searchSong(songName).then(function (r: any): void {
          vm.setSongList(r.data.tracks.items);
        });
      } else {
        vm.setSongList(null);
      }
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
