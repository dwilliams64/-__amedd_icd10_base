var handlebars = require('handlebars');

module.exports = function(options) {
 var code = options.fn();

 var output = handlebars.Utils.escapeExpression(code);
 var hidden = '<button data-clipboard-target class="ss-clip"><i class="o-icon o-icon-copy">Copy</i></button><code class="ss-hide-code">' + output + '</code>';

 return code + hidden;

}
