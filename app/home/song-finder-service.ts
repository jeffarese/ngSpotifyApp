///<reference path='../../typings/tsd.d.ts' />
module SongFinder {
  'use strict';

  export class SongFinder {
    private $http: ng.IHttpService;
    public static $inject: Array<string> = [
      '$http',
    ];

    constructor($http: ng.IHttpService) {
      this.$http = $http;
    }

    public searchSong(songName: string): ng.IHttpPromise<any> {
      return this.$http({
        params: {
          query: songName,
          type:  'track'
        },
        method: 'GET',
        url:    'https://api.spotify.com/v1/search'
      })
    }

  }

  /**
   * @ngdoc service
   * @name home.service:SongFinder
   *
   * @description
   *
   */
  angular
    .module('home')
    .service('SongFinder', SongFinder);
}
