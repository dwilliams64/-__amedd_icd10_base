var format = require('string-template');
var Handlebars = require('handlebars');

module.exports = function(options) {

  var lang = options.hash.lang || 'html';
  var alt = options.hash.alt || ' ';

  return '\n\n'
    + '<div class="ss-code">'
    + '\n\n'
    + '<div data-ss class="ss-code__working'
    + ' ' + alt
    + '">'
    + Handlebars.compile(options.fn())(this)
    + '</div>'
    + '\n\n'
    + '<button data-clipboard-target class="ss-clip">'
    + '<i class="o-icon o-icon-copy">Copy</i>'
    + '</button>'
    + '<div class="ss-code__hidden">'
    + '<pre><code>'
    + Handlebars.Utils.escapeExpression(options.fn())
    + '</code></pre>'
    + '</div>'
    + '<details class="ss-code__example"><summary class="ss-code__summary">see code</summary><pre class="ss-code__pre"><code class="'
    + lang
    + '">'
    + Handlebars.Utils.escapeExpression(options.fn())
    + '</code></pre></details>'
    + '</div>';

  }
