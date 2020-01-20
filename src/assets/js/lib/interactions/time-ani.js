var playTime;
var currMins;
var currSecs;
var durMins;
var durSecs;
var arrHidden = [];
var arrNotOut = []
var animInterval;
var progressBar;
var chkClass;

var audioTrk;

$(document).ready(function() {
audioTrk = $('.mejs-player--course').find('audio').parent();

if (audioTrk.length > 0) {
    audioTrk.get(0).addEventListener("timeupdate", seekTimeUpdate);

    setTimeout(function() {
        if ($('.mejs__time-slider').length > 0) {
            audioTrk.get(0).addEventListener("timeupdate", updateProgressBar),
                progressBar = $('.mejs__time-slider').get(0);
            var testBar = $(".mejs__time-slider").get(0).getAttribute("aria-valuenow")
            var testLbl = $(".mejs__time-slider").get(0).getAttribute("aria-label")
        }
    }, 200)
}

function updateProgressBar() {
    var e = Math.floor(100 / audioTrk.get(0).duration * audioTrk.get(0).currentTime);
    // progressDone = e;
    var seekTo = audioTrk.get(0).duration * ($('.mejs__time-slider').get(0).getAttribute("aria-valuenow") / 100);
    var percentage = Math.floor((100 / audioTrk.get(0).duration) * audioTrk.get(0).currentTime);
    if ($("[data-v-timein]").length > 0) {}
}

function seekTimeUpdate() {
    if (audioTrk.get(0)
        .readyState > 0 && !audioTrk.get(0).paused) {
        getVidTime();
        animInterval = setInterval(function() {
            playTime = (audioTrk.get(0).currentTime).toFixed(3);
            if ($("[data-v-timein]").length > 0 && !audioTrk.get(0).paused) {
                getTimeVal(playTime);
            } else if (audioTrk.get(0).ended === true && audioTrk.get(0).paused) {
                clearInterval(animInterval);
            }
        if ($("[data-class]").length > 0 && !audioTrk.get(0).paused) {
                addObjClass(playTime);
            }

        }, 50);
    }
}

function getVidTime() {
    currMins = Math.floor(audioTrk.get(0)
        .currentTime / 60);
    currSecs = Math.floor(audioTrk.get(0)
        .currentTime - currMins * 60);
    durMins = Math.floor(audioTrk.get(0)
        .duration / 60);
    durSecs = Math.floor(audioTrk.get(0)
        .duration - durMins * 60);
    if (currSecs < 10) {
        currSecs = '0' + currSecs;
    }
    if (durSecs < 10) {
        durSecs = '0' + durSecs;
    }
    if (currMins < 10) {
        currMins = '0' + currMins;
    }
    if (durMins < 10) {
        durMins = '0' + durMins;
    }
}

function mediaAuto() {
    if (mediaAutoStat) {
        mediaAutoStat = false;
        $(btnAuto)
            .removeClass("apBtn_active")
            .addClass("apBtn_inactive");
        mediaAutoCls = "apBtn_inactive";
    } else {
        mediaAutoStat = true;
        $(btnAuto)
            .removeClass("apBtn_inactive")
            .addClass("apBtn_active");
        mediaAutoCls = "apBtn_active";
    }
}

});
