///////////////////////////////////////////////////////////////////////
//
// COURSE COVER
//
// ///////////////////////////////////////////////////////////////////

var coverPageIntro = [
  { e: $('.l-cover'),
    p: 'transition.bodyFade',
    o: {
      delay: 250,
      display:null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-cover__media'),
    p: 'transition.fadeIn',
    o: {
      duration: 750,
      delay: 250,
      display: null,
      sequenceQueue: false } },

  { e: $('.l-cover__sub'),
    p: 'transition.slideDownIn',
    o: {
      duration: 350,
      delay: 250,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-cover__heading'),
    p: 'transition.slideDownIn',
    o: {
      duration: 350,
      delay: 75,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-cover__school'),
    p: 'transition.slideDownIn',
    o: {
      duration: 350,
      delay: 75,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.c-callout--cover'),
    p: 'transition.slideUpIn',
    o: {
      duration: 500,
      delay: 75,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } }
];

 $.Velocity.RunSequence(coverPageIntro);

