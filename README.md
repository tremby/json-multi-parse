json-multi-parse
================

This is a simple Node module to parse multiple JSON objects from a single
source, such as the following:

    {"object 1": "value 1"}{"object 2":"value 2"}

There can be whitespace between objects.
Bare JSON types other than objects,
like strings, arrays, booleans, and numbers,
may or may not be supported depending on the Javascript engine being used.

An array is always returned on success.
Otherwise, an error thrown by `JSON.parse` is rethrown.

Regex solutions such as splitting on `}{` won't work since that could appear in
a string inside the JSON object.

An option `partial` is available to handle ending partway through a JSON object.
If this is enabled, and such an unexpected ending is encountered,
the returned array will have an extra property `remainder`
containing the remaining partial JSON string.

Installation
------------

    npm install json-multi-parse

Usage
-----

    jsonParseMulti = require('json-multi-parse');

    parsed = jsonParseMulti('{"object 1": "value 1"}{"object 2":"value 2"}');
    console.log(parsed.length); // 2
    console.log(parsed.remainder); // undefined

    parsed = jsonParseMulti('{"object 1": "value 1"}{"object 2":"value 2"}', {partial: true});
    console.log(parsed.length); // 2
    console.log(parsed.remainder); // ''

    parsed = jsonParseMulti('{"object 1": "value 1"}{"obje', {partial: true});
    console.log(parsed.length); // 1
    console.log(parsed.remainder); // '{"obje'

Warning
-------

This relies on the error message `JSON.parse` throws when trying to parse such a
string. It may therefore be brittle.
