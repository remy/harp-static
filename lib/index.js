'use strict';

var http = require('http');
var st = require('st');
var glob = require('glob');

var exports = module.exports = function (root, port) {
  // wonder if there can be more than one 404 page generated by harp...
  var fourohfour = require('fs').readFileSync(root + '/404.html');

  var mount = st({
    path: root,
    url: '/',
    index: 'index.html', // server index.html for directories
    passthrough: true // pass through if not found, so we can send 404
  });


  // find all the .html files in this compiled version so that visitors can
  // link to /foo/bar and we'll know that there's a .html that they actually
  // wanted to request.
  var htmlFiles = [];

  glob('**/*.html', {
    cwd: root,
    dot: false
  }, function (er, files) {
    htmlFiles = files.map(function (file) {
      return '/' + file;
    });
  });

  var serve = function (req, res) {
    req.url = req.url.replace(/\?.*$/, '');
    if (htmlFiles.indexOf(req.url + '.html') !== -1) {
      // then we requested /foo/bar and we know there's a
      // generated file that matches
      req.url += '.html';
    }

    mount(req, res, function () {
      res.writeHead(404);
      res.end(fourohfour);
    });
  };

  var middleware = function (fn, i, req, res) {
    fn(req, res, function () {
      i++;
      if (exports.middleware[i]) {
        middleware(exports.middleware[i], i, req, res);
      } else {
        serve(req, res);
      }
    });
  };

  http.createServer(function(req, res) {
    if (exports.middleware.length) {
      middleware(exports.middleware[0], 0, req, res);
    } else {
      serve(req, res);
    }
  }).listen(port || process.env.PORT);
};

exports.middleware = [];