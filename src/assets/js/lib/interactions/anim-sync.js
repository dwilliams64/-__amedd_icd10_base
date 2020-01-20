var arrSyncElm = [];
var arrTempSync = [];
var arrTabCount = [];
var arrPlayed = [];
var arrAddClass = [];
var arrTempClass = [];
var syncTime;
var thisShow;
$(document)
    .ready(function() {
        if (parent.blnRemediate) {
            var divRemd = createElem("div");
            $('.crs-wrap').append(divRemd);
        }
        if ($("[data-v-timein]").length > 0) {
            syncElement();
        }

        if ($("[data-class]").length > 0) {
            addDynamicClass();
        }

        function syncElement() {
            arrSyncElm = [];
            if ($("[data-show]").length > 0) {
                thisShow = $("[data-show]").attr("data-show");
            }
            $("[data-v-timein]").each(function(idx) {
                var thisElm = $(this);
                var thisElmId;

                if (idx < 9) {
                    thisElmId = $(thisElm).attr("id", "sync-elm_0" + parseInt(idx + 1));
                } else {
                    thisElmId = $(thisElm).attr("id", "sync-elm_" + parseInt(idx + 1));
                }
                var getElmId = $(thisElm).attr("id");
                var thisIn = $(this).attr("data-v-timein");
                var thisOut = $(this).attr("data-v-timeout");
                var thisAnimIn = $(this).attr("data-v-ani-in");
                var thisAnimOut = $(this).attr("data-v-ani-out");
                var thisSwitch = "off"
                var thisDuration = $(this).attr("data-v-duration");
                var thisDelay = $(this).attr("data-v-delay");
                var thisEaseIn = $(this).attr("data-v-ease-in");
                var thisEaseOut = $(this).attr("data-v-ease-out");
                var thisClasses;
                if ($("[data-v-timein]")[0].hasAttribute('class') != undefined) {
                    thisClasses = $("[data-v-timein]")[idx]
                        .getAttribute('class')
                }
                if (thisOut === "") {
                    thisOut = "none";
                }
                arrSyncElm.push([thisElm, getElmId, thisIn, thisOut, thisAnimIn, thisAnimOut, thisSwitch, thisDuration, thisDelay, thisEaseIn, thisEaseOut])
                arrTempSync.push([thisElm, getElmId, thisIn, thisOut, thisAnimIn, thisAnimOut, thisSwitch, thisDuration, thisDelay, thisEaseIn, thisEaseOut]);
            });

        }
        setTimeout(function() {
            var $trans = $('.transition-box').addClass('is-open');
            setTimeout(function() {
                $trans.removeClass('is-open');
            }, 3000);
        }, 100);
    })

function getTimeVal(pt) {
    if ($("[data-v-timein]").length > 0 && (audioTrk.get(0).ended != true)) {
        var pt;
        var thisPlayer = audioTrk.get(0);
        var atimeIn;
        var atimeOut;
        syncTime = pt;

        if (parseFloat(pt) < 0.400) {
            for (var idx = 0; idx < arrTempSync.length; idx++) {
                arrSyncElm[idx] = arrTempSync[idx];
            }
        }
        for (var x = 0; x < arrSyncElm.length; x++) {
            var thisStyle = $("#" + arrSyncElm[x][1]).attr("style");
            var animIn = "" + arrSyncElm[x][4];
            var animOut = "" + arrSyncElm[x][5];
            atimeIn = parseFloat(arrSyncElm[x][2]);
            if (isNaN(arrSyncElm[x][3])) {
                atimeOut = arrSyncElm[x][3];
            } else {
                atimeOut = parseFloat(arrSyncElm[x][3]);
            }

            var elemOpacity = $("#" + arrSyncElm[x][1]).css("opacity")
            var objDisplay = $("#" + arrSyncElm[x][1]).css("display")
            if (parseFloat(pt) <= (parseFloat(arrSyncElm[0][2]) - .01)) {
                for (var z = 0; z < arrSyncElm.length; z++) {
                    if (!$("#" + arrSyncElm[z][1]).hasClass("v-enter")) {
                        $("#" + arrSyncElm[z][1]).addClass("v-enter");
                    }
                }
            }

            if (!isNaN(atimeOut) === true && parseFloat(pt) > (atimeIn + .005) && (parseFloat(pt)) <= atimeOut && arrSyncElm[x][6] != "on") {
                arrSyncElm[x][6] = "on";
                $("#" + arrSyncElm[x][1]).velocity('' + animIn, { duration: parseInt(arrSyncElm[x][7]), delay: parseInt(arrSyncElm[x][8]) });
                if (arrPlayed.length > 0) {
                    if ($.inArray(arrSyncElm[x][1], arrPlayed) < 0) {
                        arrPlayed.push([arrSyncElm[x][0], arrSyncElm[x][1], arrSyncElm[x][2], arrSyncElm[x][3], arrSyncElm[x][4], arrSyncElm[x][5], arrSyncElm[x][6], arrSyncElm[x][7], arrSyncElm[x][8], arrSyncElm[x][9]]);
                    } else {
                        arrPlayed.push([arrSyncElm[x][0], arrSyncElm[x][1], arrSyncElm[x][2], arrSyncElm[x][3], arrSyncElm[x][4], arrSyncElm[x][5], arrSyncElm[x][6], arrSyncElm[x][7], arrSyncElm[x][8], arrSyncElm[x][9]]);

                    }
                } else {
                    arrPlayed.push([arrSyncElm[x][0], arrSyncElm[x][1], arrSyncElm[x][2], arrSyncElm[x][3], arrSyncElm[x][4], arrSyncElm[x][5], arrSyncElm[x][6], arrSyncElm[x][7], arrSyncElm[x][8], arrSyncElm[x][9]]);

                }
                var dObj = $("#" + arrSyncElm[x][1]).attr("data-v-obj");

                if ($("#" + arrSyncElm[x][1]).attr("data-v-obj") !== undefined) {
                    addObjClass(dObj)
                } else {
                    console.log("test 1" + dObj);
                }

            } else if (isNaN(atimeOut) === true && parseFloat(pt) > (atimeIn + .005) && arrSyncElm[x][6] != "on") {
                arrSyncElm[x][6] = "on";
                $("#" + arrSyncElm[x][1]).velocity('' + animIn, { duration: parseInt(arrSyncElm[x][7]), delay: parseInt(arrSyncElm[x][8]) });
                if (arrPlayed.length > 0) {
                    if ($.inArray(arrSyncElm[x][1], arrPlayed) < 0) {
                        arrPlayed.push([arrSyncElm[x][0], arrSyncElm[x][1], arrSyncElm[x][2], arrSyncElm[x][3], arrSyncElm[x][4], arrSyncElm[x][5], arrSyncElm[x][6], arrSyncElm[x][7], arrSyncElm[x][8], arrSyncElm[x][9]]);
                    }
                } else {
                    arrPlayed.push([arrSyncElm[x][0], arrSyncElm[x][1], arrSyncElm[x][2], arrSyncElm[x][3], arrSyncElm[x][4], arrSyncElm[x][5], arrSyncElm[x][6], arrSyncElm[x][7], arrSyncElm[x][8], arrSyncElm[x][9]]);
                }
                var dObj = $("#" + arrSyncElm[x][1]).attr("data-v-obj");

                if ($("#" + arrSyncElm[x][1]).attr("data-v-obj") !== undefined) {
                    addObjClass(dObj)
                } else {
                    console.log("test 2" + dObj);
                }
            }

            if (!isNaN(atimeOut) === true && parseFloat(pt) >= atimeOut && arrSyncElm[x][6] === "on") {
                $("#" + arrSyncElm[x][1]).velocity('' + animOut, { duration: parseInt(arrSyncElm[x][7]), delay: parseInt(arrSyncElm[x][8]) });
                arrSyncElm[x][6] = "off";
            }

            if (parseFloat(pt) < atimeIn && arrSyncElm[x][6] === "on") {
                $("#" + arrSyncElm[x][1]).velocity('fadeOut', { duration: 400, delay: parseInt(arrSyncElm[x][8]) });
                arrSyncElm[x][6] = "off";
            }

            // $(".some-class").data("width") !== undefined


        }

        for (var y = 0; y < arrPlayed.length; y++) {
            elemOpacity = $("#" + arrPlayed[y][1]).css("opacity")
            var playTimeIn = parseFloat(arrPlayed[y][2])
            if (playTimeIn > (parseFloat(pt)) && elemOpacity > 0) {
                for (var z = 0; z < arrSyncElm.length; z++) {
                    if (arrSyncElm[z][1] === arrPlayed[y][1] && arrSyncElm[z][6] != "off") {
                        arrSyncElm[z][6] = "off"
                        $("#" + arrSyncElm[z][1]).velocity('fadeOut')
                    }
                }
            }
        }

    } else if (audioTrk.get(0).ended === true) {
        animStopFunction();
    }
}

function animStopFunction() {
    audioTrk.get(0).pause();
    audioTrk.get(0).removeEventListener("timeupdate", seekTimeUpdate);
    // animShowall()
}

function addDynamicClass() {
    $("[data-class]").each(function(idx_b) {
        var thisObj = $(this);
        var thisObjId;
        if (idx_b < 9) {
            thisObjId = $(thisObj).attr("id", "data-obj_0" + parseInt(idx_b + 1));
        } else {
            thisObjId = $(thisObj).attr("id", "data-obj_" + parseInt(idx_b + 1));
        }
        var getObjId = $(thisObj).attr("id");
        var thisObjIn = $(this).attr("data-class-in");
        var thisObjOut = $(this).attr("data-class-out");


        var thisCls = $(this)
            .attr('data-class')
        arrAddClass.push([thisObj, getObjId, thisObjIn, thisObjOut, thisCls]);

    });
}

function addObjClass(pt) {
    var pt;
    var dataObjIn;
    var dataObjOut;
    var dataObj;

    if ($("[data-class]").length > 0 && (audioTrk.get(0).ended !== true)) {
        // console.log("addClass " + pt)
        for (var x = 0; x < arrAddClass.length; x++) {
            dataObj = $("#" + arrAddClass[x][1]);
            dataObjIn = parseFloat(arrAddClass[x][2]);
            if (arrAddClass[x][3] === "") {
                dataObjOut = "";
                console.log("arrAddClass[x][3] " + dataObjOut);
            } else if (!isNaN(arrAddClass[x][3])) {
                dataObjOut = parseFloat(arrAddClass[x][3]);
            }

            if (parseFloat(pt) > (dataObjIn + .005) && (parseFloat(pt)) <= dataObjOut) {
                dataObj.addClass("" + arrAddClass[x][4])
            } else if (parseFloat(pt) > (dataObjIn + .005) && dataObjOut === "") {
                dataObj.addClass("" + arrAddClass[x][4])
            }
            if (dataObjOut !== "" && parseFloat(pt) > (dataObjOut + .005)) {
                dataObj.removeClass("" + arrAddClass[x][4])
            }

            if (parseFloat(pt) < (dataObjIn + .005)) {
                dataObj.removeClass("" + arrAddClass[x][4])
            }
        }
    }
}
