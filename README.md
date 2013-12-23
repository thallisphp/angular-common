# Angular JS Common

A collection of useful directives, filters, and services for Angular JS.

[Updates: @michaeljcalkins](https://twitter.com/michaeljcalkins)

[Docs and Examples](http://clouddueling.github.io/angular-common/)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/clouddueling/angular-common/trend.png)](https://bitdeli.com/free "Bitdeli Badge") [![Build Status](https://travis-ci.org/clouddueling/angular-common.png?branch=master)](https://travis-ci.org/clouddueling/angular-common)


## Install

```
bower install angular-common
```

## Building

There is a `Gruntfile.js` you can use to build your own version.  By default there is raw and minified build under the `build` folder.

[Getting Started with Grunt](http://gruntjs.com/getting-started)

1. Change to the project's root directory.
2. Install project dependencies with `npm install`.
3. Run Grunt with `grunt`.

## Usage

```
(function() {

    'use strict';

    angular.module('app', [
        'common.api',
        'common.confirm',
        'common.dateRange',
        'common.drag',
        'common.dragdrop',
        'common.mediaelement',
        'common.modal',
        'common.ngBindHtmlUnsafe',
        'common.print',
        'common.redactor',
        'common.skype',
        'common.strings',
        'common.time',
        'common.upload',
        'common.youtube'
    ]);

})();
```

Instead of writing all of that out you can create a single reference point by editing the /modules/common/common.js file that includes all the modules.

```
(function() {

    'use strict';

    angular.module('app', [
        'common.master'
    ]);

})();
```

## Running The Demo

***Run these commands from the root of the repo.***

- Node
```
node server.js
```

- PHP
```
php -S localhost:8888
```

<a href='http://localhost:8000'>http://localhost:8888</a>

## Roadmap

The long term vision for this project is to one by one elimnate all dependencies for this project and create completely angular based modules without the need for including external libraries.
