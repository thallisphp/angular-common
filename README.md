#Angular JS Common
---

A collection of useful directives, filters, and services for Angular JS.

[Updates: @michaeljcalkins](https://twitter.com/michaeljcalkins)

[Docs and Examples (In progress)](http://clouddueling.github.io/angular-common/)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/clouddueling/angular-common/trend.png)](https://bitdeli.com/free "Bitdeli Badge") [![Build Status](https://travis-ci.org/clouddueling/angular-common.png)](https://travis-ci.org/clouddueling/angular-common)


## Install

```
bower install angular-common
```

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

Or instead of writing all of that out you can create a use a single reference by editing the /modules/common/common.js file which contains all the modules.


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