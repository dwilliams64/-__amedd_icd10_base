///////////////////////////////////////////////////////////////////////
//
// TOGGLE CASE STUDY
//
// ///////////////////////////////////////////////////////////////////

const CsResults = $('[data-cs-results]');
const CsStudy = $('[data-cs-study]');
const CsImg = $('.l-case-study__img');

// Bring results page in
// ------------------------------------------------------------------
$(document).on('click', '[data-cs-open]', function(e) {
  var swapPageIn = [
    { e: CsResults,
      p: { opacity:[1,0], translateX:['0%','-90%'] },
      o: {
        display:'block',
        duration: 650,
        easing:'easeOut',
        complete: function() {
          CsStudy.css('display','none');
          CsResults.addClass('is-open');
        },
      }
    }
  ];

   $.Velocity.RunSequence(swapPageIn);
});

// Go back to case study
// ------------------------------------------------------------------
$(document).on('click', '[data-cs-close]', function(e) {

  var swapPageOut = [
    { e: CsResults,
      p: { opacity:[0,1], translateX:['-90%','0%']},
      o: {
        duration: 650,
        easing:'easeOut',
        display:'none',
        begin: function() {
          CsStudy.css('display','block');
          CsResults.removeClass('is-open');
        },
      }
    }
  ];

   $.Velocity.RunSequence(swapPageOut);

});
