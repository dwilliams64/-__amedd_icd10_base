///////////////////////////////////////////////////////////////////////
//
// SIGN 1
//
// ///////////////////////////////////////////////////////////////////

const sign1 = $('[data-sign]');
const sign1Body = $('[data-sign-content]');
const sign1Stagger = $('[data-sign-item]');

var signPage = [
  { e: sign1,
    p: 'transition.bodyFade',
    o: {
      delay: 250,
      duration: 500,
      display:null,
      easing: [0.165, 0.84, 0.44, 1]
    }
  },
  { e: sign1Stagger,
    p: 'transition.perspectiveDownIn',
    o: {
      delay: 0,
      duration: 200,
      stagger: 300,
    }
  },
  { e: sign1Body,
    p: 'transition.bodyFade',
    o: {
      delay: 350,
      duration: 500,
      display:null,
      easing: [0.165, 0.84, 0.44, 1]
    }
  },
];

 $.Velocity.RunSequence(signPage);

