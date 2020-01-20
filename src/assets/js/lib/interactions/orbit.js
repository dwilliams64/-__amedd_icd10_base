function orbitDisable() {
  var orbitSlides = $('.orbit-slide');
  var orbitActive = orbitSlides.filter('.is-active');
  var orbitTotal = orbitSlides.length;
  var orbitCurrent = orbitSlides.index(orbitActive) + 1;

  // disable next
  if (orbitCurrent === orbitTotal) {
    $('.orbit-next').prop('disabled', true);
    $('.orbit-previous').prop('disabled', false);
    $('#pager-next').removeClass('is-disabled');
  } else if (orbitCurrent === 1) {
    $('.orbit-next').prop('disabled', false);
    $('.orbit-previous').prop('disabled', true);
  } else {
    $('.orbit-next').prop('disabled', false);
    $('.orbit-previous').prop('disabled', false);
  }

}

$('[data-orbit]').on('slidechange.zf.orbit',orbitDisable);

// click button to skip tutorial
$(document).on('keypress click', '[data-start-course]', function(e) {
  e.preventDefault();
  $('#pager-next').removeClass('is-disabled');
  $('#pager-next')[0].click();
});
