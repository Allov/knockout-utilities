// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ko from 'knockout';
import $ from 'jquery';


function KocoUtilities() {}

//todo: remove when this https://github.com/knockout/knockout/issues/1475
KocoUtilities.prototype.koBindingDone = function(element, childElementCount, attempts, includeComments) {
    return new $.Deferred(function(dfd) {
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

    setTimeout(function() {
        koBindingDoneTest(attempt + 1, element, dfd, childElementCount, attempts, includeComments);
    }, 1);
}

export default new KocoUtilities();
