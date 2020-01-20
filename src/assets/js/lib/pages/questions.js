///////////////////////////////////////////////////////////////////////
//
// QUESTIONS ANIMATION
//
// ///////////////////////////////////////////////////////////////////

$(document).on('click', '[data-q-submit]', function() {
  // alert('click')
  // $(document).ready(function(){

    $('.is-fb-retry')
      .velocity('transition.expandIn', {duration: 300, display:'table'});

    $('.is-fb-incorrect')
      .velocity('transition.expandIn', {duration: 300});

      $('.is-fb-correct')
      .velocity('transition.expandIn', {duration: 300});

});

