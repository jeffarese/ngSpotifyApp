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
Structure: First option
Markup language: `HTML`
Scripting language: `TypeScript`
Controller As: `Yes`
Directives using templateUrl: `Yes`
Testing language: `TypeScript`
Unit Testing framework: `Jasmine`
E2E Testing framework: `Jasmine`
Style language: `SCSS`
Should Polymer be enabled?: `No`
Framework setup: `Angular Material`
ngRoute instead of UI Router: `No`
Additional Bower components: None

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
