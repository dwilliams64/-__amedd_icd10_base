///////////////////////////////////////////////////////////////////////
//
// TIMELINE HORIZONTAL
//
// ///////////////////////////////////////////////////////////////////

$(document).on('click', '.c-tlh__col', function() {

  const tlh = $(this);
  const tlhInner = $(this).find('.c-tlh__inner');
  const tlhBefore = $(this).find('.c-tlh__inner:before');
  const tlhTitle = $(this).find('.c-tlh__title');
  const tlhText = $(this).find('.c-tlh__text');

  $(this).toggleClass('is-expanded').siblings().removeClass('is-expanded');

  if ($('.is-expanded').length > 0) {
    $(this).parent().addClass('is-tl-expanded');
  } else {
    $(this).parent().removeClass('is-tl-expanded');
  }


  var tlShowDesc = [
    { e: tlhInner,
      p: {opacity:[1,0]},
      o: {
        delay: 0,
        duration: 500,
      }
    },
  { e: tlhTitle,
    p: 'transition.slideUpIn',
    o: {
      delay: 150,
      duration: 500,
    }
  },
  { e: tlhText,
    p: 'transition.slideUpIn',
    o: {
      delay: -250,
      duration: 500,
      sequenceQueue: false
    }
  },
];

tlShowDesc;
 $.Velocity.RunSequence(tlShowDesc);

});
