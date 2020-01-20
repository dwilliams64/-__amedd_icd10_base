///////////////////////////////////////////////////////////////////////
//
// AVATAR INTRODUCTION
//
// ///////////////////////////////////////////////////////////////////

var avatarIntro = [
  { e: $('.l-avatar__body'),
    p: 'transition.bodyFade',
    o: {
      delay: 250,
      display:null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-avatar__media'),
    p: 'transition.fadeIn',
    o: {
      duration: 750,
      delay: 200,
      display:null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },

  { e: $('.l-avatar__inner'),
    p: 'transition.slideUpIn',
    o: {
      duration: 1000,
      delay: 250,
      display: null,
      sequenceQueue: false } },

  { e: $('.l-avatar__img'),
    p: {opacity:[1,0], translateX:[0,'10%']},
    o: {
      duration: 1000,
      delay: 150,
      display: null,
      easing: [0.165, 0.84, 0.44, 1],
      sequenceQueue: false } },


];

 $.Velocity.RunSequence(avatarIntro);
