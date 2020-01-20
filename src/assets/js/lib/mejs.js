import mediaelement from 'mediaelement';

$('.mejs-player--course').mediaelementplayer({
    defaultAudioHeight: '36',
    audioVolume: 'vertical',
    toggleCaptionsButtonWhenOnlyOne: true,
    stretching: 'responsive',
    success: function(mediaElement, originalNode) {
        // Evaluate Autoplay status
        if ($(parent.document).find('#autoplay').is(':checked') && parent.intMediaAutoStat === 2) {
            mediaElement.play();
            $("#crs-set-auto").prop("checked", true);
        }

        // Evaluate Closed Captions status
        if ($(parent.document).find('#cc-auto').is(':checked') && parent.intCCStat === 1) {
            $(".mejs__captions-button").find('button')[0].click();
            $("#crs-set-cc").prop("checked", true);
        }

        // Set media settings to SCORM Data Models
        if (parent.initialized === "true" || parent.initialized === true) {
            parent.ScormProcessSetValue("cmi.learner_preference.audio_level", parent.intMediaAutoStat);
            parent.ScormProcessSetValue("cmi.learner_preference.audio_captioning", parent.intCCStat);
        }
    }
});

// Set onclick for Media Autoplay
$('#crs-set-auto').on('click', function() {
    auto_play();
})

// Set onclick for Media Closed Captions
$('#crs-set-cc').on('click', function() {
    cc_set();
})

//Media Player Autoplay function
function auto_play() {
    if (parent.intMediaAutoStat === undefined || parent.intMediaAutoStat === 1) {
        parent.intMediaAutoStat = 2;
        parent.blnMediaAutoStat = true;
        $("#crs-set-auto").prop("checked", true);
        $(parent.document).find('#autoplay').prop("checked", true)
    } else if (parent.intMediaAutoStat === 2) {
        parent.intMediaAutoStat = 1;
        parent.blnMediaAutoStat = false;
        $("#crs-set-auto").prop("checked", false);
        $(parent.document).find('#autoplay').prop("checked", false)
    }
}

//Media Player Closed Caption function
function cc_set() {
    if (parent.intCCStat === undefined || parent.intCCStat === 0) {
        parent.intCCStat = 1;
        parent.blnCCStat = true;
        $("#crs-set-cc").prop("checked", true);
        $(parent.document).find('#cc-auto').prop("checked", true)
    } else if (parent.intCCStat === 1) {
        parent.intCCStat = 0;
        parent.blnCCStat = false;
        $("#crs-set-cc").prop("checked", false);
        $(parent.document).find('#cc-auto').prop("checked", false)
    }
}
