var format = require('string-template');
var Handlebars = require('handlebars');

module.exports = function(options) {

  var lang = options.hash.lang || 'html';
  var alt = options.hash.alt || ' ';

  return '\n\n'
    + Handlebars.compile(options.fn())(this)
    + '<button data-clipboard-target class="ss-clip" id="ss-clip-full">'
    + '<i class="o-icon o-icon-copy">Copy</i>'
    + '</button>'
    + '<div class="ss-code__hidden">'
    + '<pre><code>'
    + Handlebars.Utils.escapeExpression(options.fn())
    + '</code></pre>'
    + '</div>'

  }
