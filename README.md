# Knockout Utilities

A sets of helpers for knockout. Mainly used with the [`generator-koco`](https://github.com/cbcrc/generator-koco) project.

## Installation

```bash
bower install knockout-utilities
```
    
## Knockout component registration

This library exposes mainly a function to register knockout components.

```javascript
var utilities = require('knockout-utilities');
utilities.registerComponent('component_name', {
    htmlOnly: boolean,  // defines a component which doesn't have a JavaScript backend.
    isBower: boolean,   // will search bower_components/ folder.
    basePath: string    // override any path convention to find the component.
});
```
