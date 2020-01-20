import $ from 'jquery';
window.jQuery = $;

import whatInput from 'what-input';

window.$ = $;

// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

$(document).foundation();

// Custom scripts
// ///////////////////////////////////////////////////////////
// comment out modules we dont need
// animations
require('./lib/velocity');
require('./lib/help');
// media player
require('./lib/mejs');
// pages
require('./lib/pages/course-cover');
require('./lib/pages/module-cover');
require('./lib/pages/avatar-intro');
require('./lib/pages/lesson-bookends');
require('./lib/pages/tutorial');
require('./lib/pages/case-study');
require('./lib/pages/questions');
require('./lib/pages/course-final');
require('./lib/pages/sign1');
require('./lib/pages/arrbox');
require('./lib/pages/tl-hor');
require('./lib/pages/lrg-diagram');
require('./lib/pages/budget-diagram');
require('./lib/pages/six-sigma');

// interactions
require('./lib/interactions/card-flip');
require('./lib/interactions/puzzle');
require('./lib/interactions/revealOnLoad');
require('./lib/interactions/orbit');
// require('./lib/interactions/remediate');
// preload
require('./lib/preload');


