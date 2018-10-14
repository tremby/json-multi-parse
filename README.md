json-multi-parse
================

This is a simple Node module to parse multiple JSON objects from a single
source, such as the following:

    {"object 1": "value 1"}{"object 2":"value 2"}

There can be whitespace between objects.
Bare JSON types other than objects, like strings, arrays, booleans, and numbers, are not supported.

An array is always returned on success.
Otherwise, an error thrown by `JSON.parse` is rethrown.

Regex solutions such as splitting on `}{` won't work since that could appear in
a string inside the JSON object.

Installation
------------

    npm install json-multi-parse

Usage
-----

    jsonParseMulti = require('json-multi-parse');
    console.log(jsonParseMulti('{"object 1": "value 1"}{"object 2":"value 2"}').length); // 2

Warning
-------

This relies on the error message `JSON.parse` throws when trying to parse such a
string. It may therefore be brittle.
