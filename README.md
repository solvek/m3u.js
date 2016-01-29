# m3u.js
m3u parser and formatter

# Installation

`npm install solvek/m3u.js`

# Usage

## Parsing

```
var m3u = require('m3u.js');

var content = // read content of m3u as string

var parsed = m3u.parse(content);

```

`parsed` variable will contain json:

```
{ tracks: 
   [ { title: 'Test',
       length: 0,
       params: [Object],
       file: 'http://sdfsdfsd.ua' },
     { title: 'Test2', length: -1, params: {}, file: 'http://url2' },
     { title: 'Test3', length: 500, params: {}, file: 'http://url3' } ],
  header: { param1: 'val1', param2: 'val2' } }
```

## Formatting

Use m3u.js for creating a string m3u playlist from a json object.

```
var m3u = require('m3u.js');

var m3uObject = { tracks: 
                   [ { title: 'Test',
                       length: 0,
                       params: [Object],
                       file: 'http://sdfsdfsd.ua' },
                     { title: 'Test2', length: -1, params: {}, file: 'http://url2' },
                     { title: 'Test3', length: 500, params: {}, file: 'http://url3' } ],
                  header: { param1: 'val1', param2: 'val2' } };
                  
var content = m3u.format(m3uObject);
```

# Using in browser

The library does not have any external dependency. It can be used in broswers as well.