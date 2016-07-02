<!-- $theme: gaia -->
<!-- template: invert -->
class: center, middle

Spotify Song Player
===
#### AngularJS, TypeScript, Yeoman & Angular Material

#### Jeff Arese
#### ![](https://g.twimg.com/dev/documentation/image/Twitter_logo_blue_48.png) @jeffarese
---
# Technology stack

<img src="https://avatars0.githubusercontent.com/u/139426?v=3&s=400" width="200">
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/TypeScript_Logo.png" width="200">
<img src="http://mauriciocorrea.es/dist/img/logo-sass.png" width="200">
<img src="https://worldvectorlogo.com/logos/gulp.svg" height="200">
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Yeoman.svg/543px-Yeoman.svg.png" width="200">
---
# Initial setup
1. Install [Node.js](http://nodejs.org/)
 - This will also install npm.
1. Run `npm install -g bower gulp yo generator-ng-poly`
 - This enables Bower, Gulp, and Yeoman generators to be used from command line.
1. Run `npm install` to install this project's dependencies
1. Run `bower install` to install client-side dependencies
1. ???
1. Profit!
---
# Scaffolding the app
Open a terminal, go to your desired folder and type:

`yo ng-poly`

Angular version: `1.4.*`

![](http://i.imgur.com/dh9sb49.png)
---
# Starting up!

Navigate to the created folder in your terminal and type:

`gulp`
---
# Creating our first directive

`yo ng-poly:directive songThubmnail`

Will generate:

``` javascript
///<reference path='../../typings/tsd.d.ts' />
module SongThumbnail {
  'use strict';

  function SongThumbnailDirective(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'home/song-thumbnail-directive.tpl.html',
      replace: false,
      controllerAs: 'songThumbnail',
      controller: SongThumbnailController,
      link: function (scope: ng.IScope, element: JQuery, attrs: any): void {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    }
  }

  export class SongThumbnailController {
    public name: string;
    public static $inject: Array<string> = [];

    constructor() {
      this.name = 'songThumbnail';
    }
  }

  angular
    .module('home')
    .directive('songThumbnail', SongThumbnailDirective);
}

```
---
# Markup of our first directive
``` html
<md-card class="song-thubmnail">
    <md-card-header>
        <md-card-header-text>
            <span class="md-headline">{{song.artists[0].name}}</span>
            <span class="md-subhead">{{song.artists[1].name}}</span>
        </md-card-header-text>
    </md-card-header>
    <img ng-src="{{song.album.images[1].url}}" class="md-card-image" alt="Washed Out">
    <md-button ng-show="!songThubmnail.isSongPlaying()" class="md-fab md-primary md-hue-2" ng-click="songThumbnail.playSong(song.preview_url)" aria-label="Profile">
        <md-icon> play_arrow </md-icon>
    </md-button>
    <md-button ng-show="songThumbnail.isSongPlaying()" class="md-fab md-primary md-hue-2" ng-click="songThumbnail.stopPlaying()" aria-label="Profile">
        <md-icon> pause </md-icon>
    </md-button>
    <md-card-title>
        <md-card-title-text>
            <span class="md-title">{{song.name}}</span>
        </md-card-title-text>
    </md-card-title>
</md-card>
```
---
# Creating our service
Type:
`yo ng-poly:service songFinder`
and it will generate the base service.
Then, we can add our HTTP calls using $http service
``` javascript
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
```
---
# Preparing our controller
Creating the Song Interface
``` javascript
interface ISong {
  artists: Array<{name: string}>,
  album: { images: Array<{ url: string }> },
  song: string,
}
```
Binding our new service:
``` javascript
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
```
---
# Adding search functionality
Inside our controller:
``` javascript
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
```

``` html
<md-input-container>
    <label>Search</label>
    <input ng-model="home.songName" ng-change="home.searchSong(home.songName)" ng-model-options="{ debounce: 500 }">
</md-input-container>
```
---
# Adding the play an pause to the thumbnail
``` javascript
///<reference path='../../typings/tsd.d.ts' />
module SongThumbnail {
  'use strict';

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
}
```
---

# Now let's see it in action!
