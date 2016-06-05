(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.knockoutUtilities = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  // Copyright (c) CBC/Radio-Canada. All rights reserved.
  // Licensed under the MIT license. See LICENSE file in the project root for full license information.

  function KocoUtilities() {}

  //todo: remove when this https://github.com/knockout/knockout/issues/1475
  KocoUtilities.prototype.koBindingDone = function (element, childElementCount, attempts, includeComments) {
    return new Promise(function (resolve, reject) {
      if (!attempts) {
        attempts = 400; //default
      }

      koBindingDoneTest(1, element, { resolve: resolve, reject: reject }, childElementCount, attempts, includeComments);
    });
  };

  //todo: remove when this https://github.com/knockout/knockout/issues/1475
  function koBindingDoneTest(attempt, element, dfd, childElementCount, attempts, includeComments) {
    if (attempt >= attempts) {
      dfd.reject('koBindingDone timeout after ' + attempts + ' attempts.');
      return;
    }

    // console.info('attempt', attempt, element.childElementCount);

    var bindingDone = includeComments ? element.get(0).childNodes.length > 0 : element.childElementCount > 0;

    if (childElementCount) {
      bindingDone = includeComments ? element.get(0).childNodes.length === childElementCount : element.childElementCount === childElementCount;
    }

    if (bindingDone) {
      dfd.resolve(element);
      return;
    }

    setTimeout(function () {
      koBindingDoneTest(attempt + 1, element, dfd, childElementCount, attempts, includeComments);
    }, 1);
  }

  exports.default = new KocoUtilities();
});