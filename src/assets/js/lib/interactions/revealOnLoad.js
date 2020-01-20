if ($('[data-reveal-load]').length > 0) {
  setTimeout(function() {
    var popup = new Foundation.Reveal($('[data-reveal-load]'));
    popup.open();
  },150);
}
