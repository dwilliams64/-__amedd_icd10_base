///////////////////////////////////////////////////////////////////////
//
// LESSON INTRO/SUMMARY
//
// ///////////////////////////////////////////////////////////////////

var lsnBookends = [
  { e: $('.l-lesson-intro'),
    p: 'transition.bodyFade',
    o: {
      delay: 250,
      display:null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-lesson-intro__media'),
    p: 'transition.fadeIn',
    o: {
      duration: 1000,
      delay: 200,
      display: null,
      sequenceQueue: false } },

  { e: $('.l-lesson-intro__sub'),
    p: 'transition.slideDownIn',
    o: {
      duration: 350,
      delay: 250,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-lesson-intro__heading'),
    p: 'transition.slideDownIn',
    o: {
      duration: 350,
      delay: 75,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

    { e: $('.l-lesson-intro__body'),
    p: 'transition.slideUpIn',
    o: {
      duration: 1000,
      delay: 200,
      display: null,
      sequenceQueue: false } },
];

 $.Velocity.RunSequence(lsnBookends);