///////////////////////////////////////////////////////////////////////
//
// SHOW LIST OBJECTIVES
//
// ///////////////////////////////////////////////////////////////////




// Bring results page in
// ------------------------------------------------------------------
$(document).on('click', '[data-obj-hl-btn]', function(e) {

  const ObjHl = $('[data-obj-hl]');
  const ObjHlBtn = $(this);

  ObjHl.addClass('is-active').attr('aria-live', 'polite').attr('aria-title', 'Item is highlighted');

  var removeBtn = [
    { e: ObjHlBtn,
      p: 'transition.slideDownOut',
      o: {
        duration: 500,
        delay: 500
      }
    }
  ];

   $.Velocity.RunSequence(removeBtn);

});
