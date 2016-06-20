///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('SongFinder', function () {
  var service;

  beforeEach(angular.mock.module('home'));

  beforeEach(inject(function (SongFinder) {
    service = SongFinder;
  }));

  it('should equal SongFinder', function () {
    expect(service.get()).toEqual('SongFinder');
  });

});
