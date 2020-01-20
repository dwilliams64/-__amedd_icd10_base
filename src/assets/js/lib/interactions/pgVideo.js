/***** Javascript Vid control *****/
var arrVidObj = [];
var pgVidObj;
var pgVidSrc;
var pgVidTrk;
var pgVidPos;

$(document)
    .ready(function pgVideo() {


        $('.mejs-player--video').each(function(idx) {
            pgVidObj = $(this);
            pgVidSrc = $(pgVidObj).children('source');
            pgVidTrk = $(pgVidObj).children('track');
            // pgVidPos = $(pgVidObj).attr('poster');

        })

        $('.mejs__poster').each(function(x) {
            pgVidPos = $(this);
        })


        $('[data-code-vid]')
            .each(function(idx_a) {
                var thisVidRef = $(this);
                var thisFb = $(this)
                    .html();
                arrVidObj.push(thisVidRef)
                $(arrVidObj[idx_a]).on('keypress click', function() {
                    var passObj = $(arrVidObj[idx_a]).attr("data-code-vid")
                    selVid(passObj);
                })
            })

    });

/*<video class="mejs-player mejs-player--course mejs-player--video " 
id="mejs_5107158718692648_html5" preload="none" 
src="http://localhost:8000/assets/media/video/03_001.mp4" 
style="width: 457.413px; height: 257px;">
        
     <source src="../assets/media/video/03_001.mp4" type="video/mp4">
     <track src="../assets/media/cc/03_001.vtt" srclang="en" label="English" kind="subtitles" type="text/vtt">
      </video>*/


function selVid(obj) {
    if ($('.c-course-player-wrapx').hasClass('hide_obj')) {
        $('.c-course-player-wrapx').removeClass('hide_obj')
            .addClass('show-obj')
        $('[data-hdr-col]').addClass('hide_obj')
    } 
    stopPlayer();
    var thisPg = parent.strPage;
    thisPg = thisPg.substring(3, thisPg.length - 5)
    console.log("fog the function " + thisPg + "_code_" + obj);

    $(pgVidObj).attr("poster", "../assets/img/" + thisPg + "_code_" + obj + ".png")
    $(pgVidObj).attr("src", "../assets/media/video/" + thisPg + "_code_" + obj + ".mp4");
    $(pgVidSrc).attr("src", "../assets/media/video/" + thisPg + "_code_" + obj + ".mp4");
    $(pgVidTrk).attr("src", "../assets/media/cc/" + thisPg + "_code_" + obj + ".vtt");
    playPause();
}


function playPause() {
    if (pgVidObj.get(0)
        .readyState >= pgVidObj.get(0)
        .HAVE_FUTURE_DATA) {
        //console.log('ready');
        if (pgVidObj.get(0)
            .paused === true) {
            //console.log('paused');
            pgVidObj.get(0)
                .play();

        } else if (pgVidObj.get(0)
            .paused === false) {
            //console.log('not paused');
            pgVidObj.get(0)
                .pause();
        }
    } else {
        //console.log('not ready');
        if (pgVidObj.get(0)
            .paused === true) {
            //console.log('paused');
            pgVidObj.get(0)
                .play();
        } else if (pgVidObj.get(0)
            .paused === false) {
            //console.log('not paused');
            pgVidObj.get(0)
                .pause();
        }
    }



    //mediaStopPlayer();

    //pgVidObj.paused ? (pgVidObj.play(), $(btnPlayPause).html("Pause"), $(btnPlayPause).hasClass("play") && ($(btnPlayPause).removeClass("play"), $(btnPlayPause).addClass("pause"))) : (pgVidObj.pause(), $(btnPlayPause).hasClass("pause") && ($(btnPlayPause).removeClass("pause"), $(btnPlayPause).addClass("play")))
}


function stopPlayer() {
    if (pgVidObj.readyState >= pgVidObj.HAVE_ENOUGH_DATA) {
        pgVidObj.get(0)
            .pause();

    } else {
        pgVidObj.get(0)
            .pause();
        pgVidObj.get(0)
            .addEventListener("canplay", function() {
                /*pgVidObj.get(0)
                    .currentTime = 0*/
            }, false);
        // pgVidObj.load()
    }

}