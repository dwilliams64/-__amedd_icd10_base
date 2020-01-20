///////////////////////////////////////////////////////////////////////
//
// COURSE FINAL
//
// ///////////////////////////////////////////////////////////////////

const finalBody = $('.l-final__body');
const finalImg = $('.l-final__img');
const finalHdr = $('.l-final__heading');
const finalTxt = $('.l-final__text');
const finalIcon = $('.l-final__icon');

$(document).ready(function(){

  var finalPage = [
    { e: finalBody,
      p: 'transition.bodyFade',
      o: {
        delay: 250,
        display:null,
        easing: [0.165, 0.84, 0.44, 1]
      }
    },
    { e: finalImg,
      p: 'transition.slideLeftIn',
      o: {
        delay: 250,
        display:null,
        easing: [0.165, 0.84, 0.44, 1],
        sequenceQueue: false
      }
    },
    { e: finalHdr,
      p: 'transition.slideUpIn',
      o: {
        delay: 100,
        duration: 500,
        easing: 'ease',
        sequenceQueue: false
      }
    },
    { e: finalTxt,
      p: 'transition.slideUpIn',
      o: {
        delay: 100,
        duration: 500,
        easing: 'ease',
        sequenceQueue: false
      }
    },
    { e: finalIcon,
      p: {translateY:[0,'50%']},
      o: {
        delay: 100,
        duration: 300,
        easing: [20,10],
        sequenceQueue: false
      }
    },
    { e: finalIcon,
      p: 'transition.flipXIn',
      o: {
        delay: 100,
        duration: 500,
        easing: 'ease',
        sequenceQueue: false,
      }
    },
  ];

     // $.Velocity.RunSequence(finalPage);
});

