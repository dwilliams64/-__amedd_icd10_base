// ScrollMagic
document.addEventListener('DOMContentLoaded', function(){

  $('.vertical-timeline__group').each(function(){
    var controller = new ScrollMagic.Controller();
    var currentTL = this;
    var scene2 = new ScrollMagic.Scene({
      triggerElement: currentTL,
      offset: -$(window).height()*0.12,
      reverse: false
    })
    .setClassToggle(currentTL, 'is-active')
    .addTo(controller);

  });

  $('.vertical-timeline__card').each(function(){
      var controller = new ScrollMagic.Controller();
      var currentTL = this;
      var scene = new ScrollMagic.Scene({
        triggerElement: currentTL,
        offset: -$(window).height()*0.12,
        reverse: false
      })
      .setVelocity(currentTL, {

        opacity: [ 1, 0 ],
        transformOriginX: [ "50%", "50%" ],
        transformOriginY: [ "50%", "50%" ],
        scaleX: [ 1, 0.625 ],
        scaleY: [ 1, 0.625 ],
        translateZ: 0,
        duration: 600,
        easing:  [ 250, 15 ]
      })
      // .setVelocity(currentTL, 'transition.expandIn')
      .addTo(controller);
  });


});
