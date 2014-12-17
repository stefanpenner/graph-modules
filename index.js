var fs = require('fs');
var Petal = require('petal');
var glob = require('glob');
var path = require('path');

console.log('digraph G {');

function cleanPath(path) {
  return path.replace(/ember-metal\/(lib|tests)/, 'ember-metal').replace(/\.js$/,'')
}

glob.sync('ember-metal/**/*.js').map(function(path) {
  return new Petal(path, fs.readFileSync(path));
}).forEach(function(node) {
  Object.keys(node.imports).forEach(function(importName) {
    console.log('  "' + cleanPath(node.path) + '" -> "' + importName + '"');
  });
});

console.log('}');
