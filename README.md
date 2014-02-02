Harp Static
===========

Simple Harp.js static server.

With Harp.js, if you want your source content files to work as a static
generated site, then you *must* refer to urls using `.html`.

I don't like this.

So this script quite simply creates a static server (that caches assets), and
maps normal Harp urls (i.e. without an extension on `.html`) and maps them to
real files.

Now you can use non-static for development, and static for live (deployed to
Heroku, etc).

Example of usage (and in fact, how I'm using `harp-static`):

```js
'use strict';
var harp = require('harp');
var server = require('harp-static');
var outputPath = __dirname + '/www';
var port = process.env.PORT || 9000;

harp.compile(__dirname, outputPath, function (errors){
  if (errors) {
    console.log(JSON.stringify(errors, null, 2));
    process.exit(1);
  }

  console.log('Running harp-static on ' + port);
  server(outputPath, port);
});
```
