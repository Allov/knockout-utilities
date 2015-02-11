define(['knockout'],
    function(ko) {
        'use strict';

        function KnockoutUtilities() {}

        //TODO: Ne pas utiliser cette méthode - trop lourde...
        //mieux connaitre/identifier les observables des viewmodels
        KnockoutUtilities.prototype.toJS = function(obj) {
            var result = ko.toJS(obj);

            this.removeKoMappingProperties(result);

            return result;
        };

        KnockoutUtilities.prototype.removeKoMappingProperties = function(obj) {
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (property == '__ko_mapping__') {
                        delete obj[property];
                    } else {
                        var type = typeof obj[property];

                        if (type === 'object' || type === 'function') {
                            this.removeKoMappingProperties(obj[property]);
                        }
                    }
                }
            }
        };

        //todo: remove when this https://github.com/knockout/knockout/issues/1475
        KnockoutUtilities.prototype.koBindingDone = function(element, childElementCount, attempts, includeComments) {
            var dfd = $.Deferred();

            if (!attempts) {
                attempts = 400; //default
            }

            koBindingDoneTest(1, element, dfd, childElementCount, attempts, includeComments);

            return dfd.promise();
        };

        KnockoutUtilities.prototype.registerComponent = function(name, componentConfig) {
            componentConfig = componentConfig || {};

            if (!name) {
                throw new Error('KnockoutUtilities.registerComponent - Argument missing exception: name');
            }

            if (ko.components.isRegistered(name)) {
                throw new Error('KnockoutUtilities.registerComponent - Already registered component: ' + name);
            }

            var basePath = componentConfig.basePath || 'components/' + name;

            if (!componentConfig.type) {
                componentConfig.type = 'component';
            }

            if (componentConfig.isBower) {
                basePath = 'bower_components/' +  name + '/src';
            }

            var requirePath = basePath + '/' + name;

            if (componentConfig.htmlOnly) {
                requirePath = 'text!' + requirePath + '.html';
            } else {
                requirePath = requirePath + '-ui';
            }

            var koComponentConfig = {
                require: requirePath
            };

            if (componentConfig.htmlOnly) {
                koComponentConfig = {
                    template: koComponentConfig
                };
            }

            ko.components.register(name, koComponentConfig);

            return koComponentConfig;
        };

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

        return new KnockoutUtilities();
    });
