///////////////////////////////////////////////////////////////////////
//
// VELOCITY
//
// ///////////////////////////////////////////////////////////////////
// easing tester
// https://codepen.io/julianshapiro/full/hyeDg
// Make it do stuff
// $(document).ready(function(){});

window.Velocity = require('velocity-animate');
require('velocity-animate/velocity.ui');
// import Velocity from 'velocity-animate';
// import 'velocity-animate/velocity.ui';


//  CUSTOM EFFECTS
// ------------------------------------------------------------------
$.Velocity

// slide page in
.RegisterEffect("transition.bodySlide", {
  defaultDuration: 750,
  calls: [
    [{
      translateX:[0,"12%"],
      opacity:[1,0]
    }]
  ]
})


// for use in sequence of list items
.RegisterEffect("transition.listSeq", {
  defaultDuration: 1000,
  calls: [
    [{
      translateX:[0,"15%"],
      opacity:[1,0]
    }]
  ]
})


// EXAMPLE
// .RegisterEffect('transition.name', {
//   defaultDuration: XX,
//   calls: [
//     [{},0.5,{easing: spring}]
//   ]
// })
// LEAVE BODY FADE BELOW THIS LINE AS LAST ITEM

// fade page in
.RegisterEffect("transition.bodyFade", {
  defaultDuration: 750,
  calls: [
    [{ translateY:[0,"3%"], opacity:[1,0] }]
  ]
});




//  REVEAL ANIMATION
// ------------------------------------------------------------------
// Enter
$(document).on('open.zf.reveal', '[data-reveal]', function() {

  var modal = $(this);
  var enter =  $(this).attr('data-v-in');
  var overlay = $(this).parent().attr('class');
  var aDisplay;

  if ($(this).is('[data-v-display]')) {
    aDisplay = $(this).attr('data-v-display');
  } else {
    aDisplay = 'block';
  }

  $(this).css({display:"none"});

  if(enter == 'shake') {
    $(this).velocity('callout.' + enter, {display:aDisplay});
  } else if(enter == 'pulse') {
    $(this).velocity('callout.' + enter, {display:aDisplay});
  } else if(enter == 'tada') {
    $(this).velocity('callout.' + enter, {display:aDisplay});
  } else if(enter == 'flash') {
    $(this).velocity('callout.' + enter, {display:aDisplay});
  }  else if(enter == 'bounce') {
    $(this).velocity('callout.' + enter, {display:aDisplay});
  } else if(enter == 'swing') {
    $(this).velocity('callout.' + enter, {display:aDisplay});
  } else {
    $(this).parent().velocity('fadeIn', {duration:200})
    $(this).velocity('transition.' + enter, {display:aDisplay});
  }

});
// Exit
$(document).on('closed.zf.reveal', '[data-reveal]', function () {

  var modal = $(this);
  var exit =  $(this).attr('data-v-out');
  var overlay = $(this).parent().attr('class');
  var aDisplay;

  if ($(this).is('[data-v-display]')) {
    aDisplay = $(this).attr('data-v-display');
  } else {
    aDisplay = 'block';
  }

  $('body').addClass('is-reveal-exit');
  $(this).parent().css({display:"block"});

  if(exit == 'shake') {
    $(this).velocity('callout.' + exit);
  } else if(exit == 'pulse') {
    $(this).velocity('callout.' + exit);
  } else if(exit == 'tada') {
    $(this).velocity('callout.' + exit);
  } else if(exit == 'flash') {
    $(this).velocity('callout.' + exit);
  }  else if(exit == 'bounce') {
    $(this).velocity('callout.' + exit);
  } else if(exit == 'swing') {
    $(this).velocity('callout.' + exit);
  }else {
    $(this).velocity('transition.' + exit,{display:aDisplay,duration:400})
    $(this).parent().velocity('fadeOut', {duration:500})
    $('body').removeClass('is-reveal-open');
  }

});


// PAGE INTRO
// ------------------------------------------------------------------
const vIntro = $('.v-intro');

vIntro.velocity('transition.bodyFade', {
  delay: 250,
  display:null,
  easing: [0.165, 0.84, 0.44, 1]
});


//  STAGGER LIST
// ------------------------------------------------------------------
$('.v-stagger-item').velocity("transition.slideLeftIn",
  { delay: 350, stagger: 250, easing: 'easeOutCirc' });

$('.v-stagger-up').velocity("transition.slideUpIn",
  { delay: 350, stagger: 250, easing: 'easeOutCirc' });
