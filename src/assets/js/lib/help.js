///////////////////////////////////////////////////////////////////////
//
// TOGGLE HELP SECTIONS
//
// ///////////////////////////////////////////////////////////////////

$(document).on('click', '[data-help-toggle]', function(e) {

  e.preventDefault();
  const parent = $('.c-course-help');
  const badge = $('.c-help-badge');
  const card = $('.c-help-card');

  // open course help boxes
  if ( $('.is-open').length < 1 ) {

      parent.addClass('is-open');
      badge.velocity('transition.slideUpIn', {
        stagger: 100,
        duration: 200,
        display: 'inline-block',
        easing: [300,20]
      });
      // launch instructions modal
      $('#help-instructions').foundation('open');
      $('body').addClass('is-reveal-open');

    } else {

      badge.velocity('transition.slideDownOut', {
        stagger: 200,
        duration: 200,
        display: 'inline-block',
        easing: [300,20]
      });
      setTimeout(function(){
        parent.removeClass('is-open');
        $('body').removeClass('is-reveal-open');
      }, 750);
  }

});
