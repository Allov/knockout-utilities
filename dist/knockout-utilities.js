'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

function KocoUtilities() {}

//todo: remove when this https://github.com/knockout/knockout/issues/1475
KocoUtilities.prototype.koBindingDone = function (element, childElementCount, attempts, includeComments) {
    return new _jquery2.default.Deferred(function (dfd) {
        try {
            if (!attempts) {
                attempts = 400; //default
            }

            koBindingDoneTest(1, element, dfd, childElementCount, attempts, includeComments);
        } catch (err) {
            dfd.reject(err);
        }
    }).promise();
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