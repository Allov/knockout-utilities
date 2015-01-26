define(["knockout"],
    function(ko) {
        'use strict';

        var utilities = {};

        //TODO: Ne pas utiliser cette méthode - trop lourde...
        //mieux connaitre/identifier les observables des viewmodels
        utilities.toJS = function(obj) {
            //if (utilities.isNullOrUndefined(obj))
            //    return obj;

            //var mapping = {
            //    'ignore': ["__ko_mapping__"]
            //};

            //var result = ko.toJS(obj, mapping);

            var result = ko.toJS(obj);

            utilities.removeKoMappingProperties(result);

            return result;

            ////var newObg = utilities.deepCopy(obj);

            //if (ko.isObservable(obj)) {
            //    obj = ko.utils.unwrapObservable(obj);
            //}

            //var newObg = null;

            //if (obj) {
            //    if (obj.hasOwnProperty('__ko_mapping__')) {
            //        newObg = ko.mapping.toJS(obj, { include: ['$type'] });
            //    } else {
            //        newObg = ko.toJS(obj);
            //    }

            //    for (var property in newObg) {
            //        if (newObg.hasOwnProperty(property)) {
            //            var type = typeof newObg[property];

            //            if (type  === 'object' || type === 'function')
            //            {
            //                newObg[property] = utilities.toJS(newObg[property]);
            //            }
            //        }
            //    }
            //}

            //return newObg;
        };

        utilities.removeKoMappingProperties = function(obj) {
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (property == '__ko_mapping__') {
                        delete obj[property];
                    } else {
                        var type = typeof obj[property];

                        if (type === 'object' || type === 'function') {
                            utilities.removeKoMappingProperties(obj[property]);
                        }
                    }
                }
            }
        };

        return utilities;
    });
