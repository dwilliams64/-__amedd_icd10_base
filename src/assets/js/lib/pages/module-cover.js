///////////////////////////////////////////////////////////////////////
//
// MODULE COVER
//
// ///////////////////////////////////////////////////////////////////

var moduleCoverPage = [
  { e: $('.l-module-cover'),
    p: 'transition.bodyFade',
    o: {
      delay: 250,
      display:null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-module-cover__media'),
    p: 'transition.fadeIn',
    o: {
      duration: 750,
      delay: 200,
      display: null,
      sequenceQueue: false } },

  { e: $('.l-module-cover__sub'),
    p: 'transition.slideDownIn',
    o: {
      duration: 350,
      delay: 250,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-module-cover__heading'),
    p: 'transition.slideDownIn',
    o: {
      duration: 350,
      delay: 75,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.c-course-time'),
    p: 'transition.slideUpIn',
    o: {
      duration: 350,
      delay: 250,
      display: null,
      easing: 'spring',
      sequenceQueue: false } }
];

 $.Velocity.RunSequence(moduleCoverPage);