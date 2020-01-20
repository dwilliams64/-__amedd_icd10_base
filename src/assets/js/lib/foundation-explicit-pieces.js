import $ from 'jquery';

import { Foundation } from 'foundation-sites/js/foundation.core';
import * as CoreUtils from 'foundation-sites/js/foundation.core.utils';
// import { rtl, GetYoDigits, transitionend } from 'foundation-sites/js/foundation.core.utils';
import { Box } from 'foundation-sites/js/foundation.util.box'
import { onImagesLoaded } from 'foundation-sites/js/foundation.util.imageLoader';
import { Keyboard } from 'foundation-sites/js/foundation.util.keyboard';
import { MediaQuery } from 'foundation-sites/js/foundation.util.mediaQuery';
import { Motion, Move } from 'foundation-sites/js/foundation.util.motion';
import { Nest } from 'foundation-sites/js/foundation.util.nest';
import { Timer } from 'foundation-sites/js/foundation.util.timer';
import { Touch } from 'foundation-sites/js/foundation.util.touch';
import { Triggers } from 'foundation-sites/js/foundation.util.triggers';
import { Abide } from 'foundation-sites/js/foundation.abide';
// import { Accordion } from 'foundation-sites/js/foundation.accordion';
// import { AccordionMenu } from 'foundation-sites/js/foundation.accordionMenu';
import { Drilldown } from 'foundation-sites/js/foundation.drilldown';
import { Equalizer } from 'foundation-sites/js/foundation.equalizer';
import { Orbit } from 'foundation-sites/js/foundation.orbit';
import { ResponsiveToggle } from 'foundation-sites/js/foundation.responsiveToggle';
//import { Reveal } from 'foundation-sites/js/foundation.reveal';
import { Slider } from 'foundation-sites/js/foundation.slider';
import { Tooltip } from 'foundation-sites/js/foundation.tooltip';
//import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
//import { DropdownMenu } from 'foundation-sites/js/foundation.dropdownMenu';
//import { Interchange } from 'foundation-sites/js/foundation.interchange';
//import { Magellan } from 'foundation-sites/js/foundation.magellan';
//import { OffCanvas } from 'foundation-sites/js/foundation.offcanvas';
//import { ResponsiveMenu } from 'foundation-sites/js/foundation.responsiveMenu';
//import { SmoothScroll } from 'foundation-sites/js/foundation.smoothScroll';
//import { Sticky } from 'foundation-sites/js/foundation.sticky';
//import { Tabs } from 'foundation-sites/js/foundation.tabs';
//import { Toggler } from 'foundation-sites/js/foundation.toggler';
//import { ResponsiveAccordionTabs } from 'foundation-sites/js/foundation.responsiveAccordionTabs';

// customized scripts
import { Tabs } from ".././custom-foundation/foundation.tabs.custom";
import { ResponsiveAccordionTabs } from ".././custom-foundation/foundation.responsiveAccordionTabs.custom";
import { Toggler } from ".././custom-foundation/foundation.toggler.custom";
import { Accordion } from '.././custom-foundation/foundation.accordion.custom';
import { AccordionMenu } from '.././custom-foundation/foundation.accordionMenu.custom';
import { Reveal } from ".././custom-foundation/foundation.reveal.custom"
Foundation.addToJquery($);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.
Foundation.rtl = CoreUtils.rtl;
Foundation.GetYoDigits = CoreUtils.GetYoDigits;
Foundation.transitionend = CoreUtils.transitionend;
Foundation.RegExpEscape = CoreUtils.RegExpEscape;
Foundation.onLoad = CoreUtils.onLoad;

Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so no need to add it to Foundation, just init them.
Touch.init($);
Triggers.init($, Foundation);
//MediaQuery._init();

Foundation.plugin(Abide, 'Abide');
Foundation.plugin(Accordion, 'Accordion');
Foundation.plugin(AccordionMenu, 'AccordionMenu');
Foundation.plugin(Drilldown, 'Drilldown');
Foundation.plugin(Equalizer, 'Equalizer');
Foundation.plugin(Orbit, 'Orbit');
Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
Foundation.plugin(Reveal, 'Reveal');
Foundation.plugin(Slider, 'Slider');
Foundation.plugin(Tabs, 'Tabs');
Foundation.plugin(Toggler, 'Toggler');
Foundation.plugin(Tooltip, 'Tooltip');
Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');
// Foundation.plugin(Dropdown, 'Dropdown');
// Foundation.plugin(DropdownMenu, 'DropdownMenu');
// Foundation.plugin(Interchange, 'Interchange');
// Foundation.plugin(Magellan, 'Magellan');
// Foundation.plugin(OffCanvas, 'OffCanvas');
// Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
// Foundation.plugin(SmoothScroll, 'SmoothScroll');
// Foundation.plugin(Sticky, 'Sticky');
export { Foundation };
