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