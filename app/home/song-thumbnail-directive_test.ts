///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('songThumbnail', function () {
  var scope
    , element;

  beforeEach(angular.mock.module('home', 'home/song-thumbnail-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<song-thumbnail></song-thumbnail>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().songThumbnail.name).toEqual('songThumbnail');
  });

});
