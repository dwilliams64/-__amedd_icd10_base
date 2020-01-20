/* JavaScript Document */

var apiAlert;
var iFrameWin;
var startTimeStamp;

var arrCompVal = [];
var arrGetViewed = new Array();
var arrResources = new Array();
var arrSideMenu = new Array();
var arrTempViewed = new Array();
var arrMenuItem = new Array();
var arrGetPg = new Array();
var arrLsnExam = [];
var arrLsnComp = [];
var arrViewed = [];
var arrInteraction = [];
var arrInteraction_Comp = [];
var arrInteractionList = [];
var arrModule = [];
var arrLsn = [];
var arrPg = [];
var arrPgLI = [];
var arrTempPg = [];
var arrSetLI = [];
var arrTempLI = [];
var arrTempLsn = [];
var arrTempMod = [];

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Content definition
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Array is built on the courseframe.html page*/

var intBookmark;
var intInteractionCount;
var intInteractionComp;
var intCurrentPg;
var intComplete;
var intFinalScore;
var intLsnComp;
var intPctComp;
var intRegPgAmt = 1;
var intTotComp;
var intTotPg;

var blnProcessedUnload = false;
var blnReachedEnd = false;
var blnPgKC;
var blnPgDnD;
var blnPgLsn;
var blnViewed = true;
var blnKC = true;
var blnLsn = false;
var blnExam = false;
var blnlSplitMenu = false;
var blnMediaAutoStat;
var blnRemediate = false;
var blnCCStat;

var strCourseComp;
var strCurrentPage;
var strGetSuspendData;
var strKC_complete;
var strPage;
var strPgRemed;
var strInteraction_stat;
var strSuccess_stat;

var intMediaAutoStat;
var intCCStat;
var meshOn;

parent.iFrameWin = window;

function createElem(elmTp, id) {
    var elm = document.createElement(elmTp);
    if (id) {
        $(elm)
            .attr("id", id);
    }
    return elm;
}

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Function: 'doStart()'
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
function doStart() {
    // /*initialize communication with the LMS*/
    ScormProcessInitialize();
    getThisData();

    setTimeout(function() {
        if (initialized === "true" || initialized === true) {
            /*it's a best practice to set the lesson status to incomplete when
            first launching the course (if the course is not already completed)*/
            intInteractionComp = 0;
            var completionStatus = ScormProcessGetValue("cmi.completion_status");
            if (completionStatus === "unknown") {
                ScormProcessSetValue("cmi.completion_status", "not attempted");
                ScormProcessSetValue("cmi.success_status", "unknown");
                intCurrentPg = 0;
                arrViewed = [];
            } else {
                /*see if the user stored a intBookmark previously (don't check for errors
                because cmi.location may not be initialized*/
                intBookmark = ScormProcessGetValue("cmi.location");
                /*if there isn't a stored intBookmark, start the user at the first page*/
                if (isNaN(parseInt(intBookmark))) {
                    intCurrentPg = 0;
                } else {
                    /*if there is a stored intBookmark, prompt the user to resume from the previous location*/
                    if (confirm("Would you like to resume from where you previously left off?")) {
                        intCurrentPg = parseInt(intBookmark);
                    } else {
                        intCurrentPg = 0;
                    }
                }
                strGetSuspendData = "" + ScormProcessGetValue("cmi.suspend_data");

                if (strGetSuspendData !== "undefined") {
                    arrViewed = [];
                    arrTempViewed = [];
                    arrTempViewed = (ScormProcessGetValue("cmi.suspend_data"))
                        .split(",");
                    var testViewed = arrTempViewed[0];
                    arrViewed = arrTempViewed;
                    if (testViewed === true) {}
                }
            }

            intInteractionCount = parseInt(ScormProcessGetValue('cmi.interactions._count'), 10);
            if (intInteractionCount === 0) {
                var gInteraction_stat;
                for (var i = 0; i < arrInteraction.length; i++) {
                    var objId = (arrInteraction[i][0]).replace(/\s+/g, '.');
                    ScormProcessSetValue("cmi.interactions." + i + ".id", "" + objId);
                    //                    ScormProcessSetValue("cmi.interactions." + i + ".type", "choice");
                    if (gInteraction_stat != "correct" || gInteraction_stat != "incorrect") {
                        gInteraction_stat = "neutral";
                        ScormProcessSetValue("cmi.interactions." + i + ".result", "" + gInteraction_stat);
                    } else if (gInteraction_stat === "correct" || gInteraction_stat === "incorrect") {
                        ScormProcessSetValue("cmi.interactions." + i + ".result", "" + gInteraction_stat);
                        arrInteraction_Comp.push(objId)
                        intInteractionComp = intInteractionComp + 1;
                        arrInteraction_Comp = removeDupesArr(arrInteraction_Comp)
                    }
                    arrInteraction[i][2] = gInteraction_stat;
                }
                getkcid();
            } else {
                for (var i = 0; i < arrInteraction.length; i++) {
                    if (ScormProcessGetValue("cmi.interactions." + i + ".result") === "correct" || ScormProcessGetValue("cmi.interactions." + i + ".result") === "incorrect") {
                        var objId = (arrInteraction[i][0]).replace(/\s+/g, '.');
                        arrInteraction_Comp.push(objId)
                        intInteractionComp = intInteractionComp + 1;
                        arrInteraction_Comp = removeDupesArr(arrInteraction_Comp)
                    }
                }
                getkcid();
            }
            intMediaAutoStat = parseInt(ScormProcessGetValue("cmi.learner_preference.audio_level"));
            intCCStat = parseInt(ScormProcessGetValue("cmi.learner_preference.audio_captioning"));
            ScormProcessSetValue("cmi.location", "" + intCurrentPg);
            persistData();
        } else {

            apiAlert = createElem('div', 'apiAlert');
            $(apiAlert)
                .insertBefore('.skip-to');
            $(apiAlert)
                .addClass('no-api');
            $(apiAlert)
                .html('**Attention**: Could not establish a connection with the LMS.');

            intCurrentPg = 0;
        }

        setTimeout(function() {
            if (initialized === "true" || initialized === true) {
                strPage = arrPg[parseInt(intCurrentPg)];
                setFrm(strPage)
            } else {
                strPage = $("#contentframe").attr("src");
            }
        }, 500)
    }, 500);
}

function setFrm(val) {
    if ($("#contentframe").length > 0) {
        var theIframe = parent.document.getElementById("contentframe").src;
    }
    $("#contentframe").attr("src", val);
    for (var j = 0; j < arrGetPg.length; j++) {
        if (val === arrGetPg[j][1].path) {
            intCurrentPg = parseInt(j)
        }
    }

    chkNav(val);

    setTimeout(function() {
        if (intMediaAutoStat === 2 || blnMediaAutoStat === true) {
            $('#contentframe').contents().find("#crs-set-auto").prop("checked", true);
            $("#autoplay").prop("checked", true);
        } else {
            $('#contentframe').contents().find("#crs-set-auto").prop("checked", false);
            $("#autoplay").prop("checked", false);
        }

        if (intCCStat === 1 || blnCCStat === true) {
            $('#contentframe').contents().find("#crs-set-cc").prop("checked", true);
            $("#cc-auto").prop("checked", true);
        } else {
            $('#contentframe').contents().find("#crs-set-cc").prop("checked", false);
            $("#cc-auto").prop("checked", false);
        }
    }, 500);
    ScormProcessSetValue("cmi.location", intCurrentPg);
    persistData();
    getProgress();
    intTotPg = parseInt(arrPg.length - 1);
    strPage = val;
}

function getThisData() {
    $.getJSON("data/global.json", function(data) {
        var mod_nm = data.module;
        var tempMod = mod_nm;
        meshOn = data.meshworks;
        $.each(mod_nm, function(idx) {
            arrModule[idx] = tempMod[idx].name
        });
    });
    $.getJSON("data/pages.json", function(data) {
        arrGetPg = [];
        $.each(data, function(key, val) {
            arrGetPg.push([key, val]);
            arrPg.push(val.path);
            if (val.kc === true || val.dnd === true || val.jeopardy) {
                arrInteraction.push([val.path, val.title]);
            }
            if (val.lesson != undefined) {
                arrLsn.push(val.lesson);
            }
            arrLsn = removeDupesArr(arrLsn);
        });
    });
}

function doUnload() {

    /*don't call this function twice*/
    if (blnProcessedUnload === true) {
        return;
    } else {
        blnProcessedUnload = true;
    }

    /*in this sample course, the course is considered complete when the last page is reached*/
    if (intPctComp === 100) {
        blnReachedEnd = true;
        ScormProcessSetValue("cmi.completion_status", "completed");
        ScormProcessSetValue("cmi.success_status", "passed");
        ScormProcessSetValue("cmi.exit", "normal");
    } else {
        ScormProcessSetValue("cmi.completion_status", "incomplete");
        ScormProcessSetValue("cmi.success_status", "failed");
        ScormProcessSetValue("cmi.exit", "suspend");
    }


    ScormProcessSetValue("cmi.score.raw", "" + intPctComp);
    ScormProcessSetValue("cmi.location", "" + intCurrentPg);
    ScormProcessSetValue("cmi.suspend_data", "" + arrViewed);
    ScormProcessSetValue("cmi.exit", "suspend");

    /*if the user just closes the browser, we will default to saving
    their progress data. If the user presses exit, he is prompted.
    If the user reached the end, the exit normall to submit results.
    if (pressedExit === false && blnReachedEnd === false) {
        ScormProcessSetValue("cmi.exit", "suspend");
    }*/
    persistData();
    ScormProcessFinish();
}

function removeDupesArr(arr) {
    var i,
        len = arr.length,
        arrOutput = [],
        objArr = {};

    for (var i = 0; i < len; i++) {
        objArr[arr[i]] = 0;
    }
    for (var i in objArr) {
        arrOutput.push(i);
    }
    return arrOutput;
}

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

function getkcid() {
    var intKC;
    if (initialized === "true" || initialized === true) {
        for (var i = 0; i < arrInteraction.length; i++) {
            if (ScormProcessGetValue("cmi.interactions." + i + ".id") === "" + arrPg[intCurrentPg] && (ScormProcessGetValue("cmi.interactions." + i + ".result") != "correct" || ScormProcessGetValue("cmi.interactions." + i + ".result") != "incorrect")) {
                if (strInteraction_stat === undefined) {
                    strInteraction_stat = "neutral";
                }
                ScormProcessSetValue("cmi.interactions." + i + ".result", "" + strInteraction_stat);
                intInteractionComp = intInteractionComp + 1;
                intKC = i;
            }
        }
    }

    setTimeout(function() {
        $("#contentframe").contents().find(".js-pager-next").removeClass("is-disabled")
        if (meshOn === 'true') {
            $("#contentframe").contents().find(".js-pager-next").attr("href", "javascript: parent.updateCEMS('" + arrPg[intCurrentPg + 1] + "');javascript:parent.setFrm('" + arrPg[intCurrentPg + 1] + "');javascript:window.top.strCurrentPage='" + arrPg[intCurrentPg + 1] + "'")
        } else {
            $("#contentframe").contents().find(".js-pager-next").attr("href", "javascript:parent.setFrm('" + arrPg[intCurrentPg + 1] + "');javascript:window.top.strCurrentPage='" + arrPg[intCurrentPg + 1] + "'")
        }
        $("#contentframe").contents().find(".js-pager-next").unbind("click")
    }, 200);
    if (!isNaN(intKC) && intKC != null) {
        setKC(intKC);
    }
}

function setKC(idx) {
    var objId = (arrInteraction[idx][0]).replace(/\s+/g, '.');
    var gInteraction_stat = "" + ScormProcessGetValue("cmi.interactions." + idx + ".result");
    if (ScormProcessGetValue("cmi.interactions." + idx + ".result") === "correct" || ScormProcessGetValue("cmi.interactions." + idx + ".result") === "incorrect") {
        arrInteraction_Comp.push(objId)
        arrInteraction_Comp = removeDupesArr(arrInteraction_Comp)
        arrInteraction[idx][2] = gInteraction_stat;
        arrViewed.push(intCurrentPg);
        arrViewed = removeDupesArr(arrViewed);
        ScormProcessSetValue("cmi.suspend_data", "" + arrViewed);
    }
    persistData();
}

function chkNav(val) {
    var idx_i;

    if (initialized === "true" || initialized === true) {
        blnPgKC = arrGetPg[intCurrentPg][1].kc;
        blnPgDnD = arrGetPg[intCurrentPg][1].dnd;

        if ((blnPgKC === true || blnPgDnD === true)) {
            for (var y = 0; y < arrInteraction.length; y++) {
                var chkPath = arrInteraction[y][0]
                if (chkPath === val) {
                    idx_i = y;
                }
            }
            strKC_complete = "" + ScormProcessGetValue("cmi.interactions." + idx_i + ".result")
            arrInteraction[idx_i][2] = strKC_complete;

            if ((strKC_complete === "correct") || (strKC_complete === "incorrect")) {
                setTimeout(function() {
                    $("#contentframe").contents().find('[data-close]').bind('click', function() {
                        $("#contentframe").contents().find(".js-pager-next").bind("click", function(e) {
                            // e.preventDefault()
                        })
                        if (meshOn === 'true') {
                            $("#contentframe").contents().find(".js-pager-next").attr("href", "javascript: parent.updateCEMS('" + arrPg[intCurrentPg + 1] + "');javascript:parent.setFrm('" + arrPg[intCurrentPg + 1] + "');javascript:window.top.strCurrentPage='" + arrPg[intCurrentPg + 1] + "'")
                        } else {
                            $("#contentframe").contents().find(".js-pager-next").attr("href", "javascript:parent.setFrm('" + arrPg[intCurrentPg + 1] + "');javascript:window.top.strCurrentPage='" + arrPg[intCurrentPg + 1] + "'")
                        }
                        $("#contentframe").contents().find(".js-pager-next").removeClass("is-disabled")
                    })
                    $("#contentframe").contents().find(".js-pager-next").bind("click", function(e) {
                        // e.preventDefault()
                    })
                    if (meshOn === 'true') {
                        $("#contentframe").contents().find(".js-pager-next").attr("href", "javascript: parent.updateCEMS('" + arrPg[intCurrentPg + 1] + "');javascript:parent.setFrm('" + arrPg[intCurrentPg + 1] + "');javascript:window.top.strCurrentPage='" + arrPg[intCurrentPg + 1] + "'")
                    } else {
                        $("#contentframe").contents().find(".js-pager-next").attr("href", "javascript:parent.setFrm('" + arrPg[intCurrentPg + 1] + "');javascript:window.top.strCurrentPage='" + arrPg[intCurrentPg + 1] + "'")
                    }
                    $("#contentframe").contents().find(".js-pager-next").removeClass("is-disabled")
                }, 500)

                arrViewed.push(intCurrentPg);
                arrViewed = removeDupesArr(arrViewed);
                ScormProcessSetValue("cmi.suspend_data", "" + arrViewed);
            } else if ((strKC_complete === "neutral") || (strKC_complete === undefined)) {
                setTimeout(function() {
                    $("#contentframe").contents().find('[data-close]').bind('click', function() {
                        $("#contentframe").contents().find(".js-pager-next").bind("click", function(e) {
                                e.preventDefault()
                            }),
                            $("#contentframe").contents().find(".js-pager-next").removeAttr("href", ""),
                            $("#contentframe").contents().find(".js-pager-next").addClass("is-disabled")
                    })
                    $("#contentframe").contents().find(".js-pager-next").bind("click", function(e) {
                            e.preventDefault()
                        }),
                        $("#contentframe").contents().find(".js-pager-next").removeAttr("href", ""),
                        $("#contentframe").contents().find(".js-pager-next").addClass("is-disabled")
                }, 500)

            }
        } else {
            arrViewed.push(intCurrentPg);
            arrViewed = removeDupesArr(arrViewed);
            ScormProcessSetValue("cmi.suspend_data", "" + arrViewed);
        }
    }
}

function getProgress() {
    var $kc_status = $("#contentframe").contents().find(".js-kc-status");
    var $kc_complete = $("#contentframe").contents().find(".js-kc-comp");
    var $kc_incomplete = $("#contentframe").contents().find(".js-kc-incomp");
    var $kc_list = $("#contentframe").contents().find(".js-kc-list");
    var $kc_done = $("#contentframe").contents().find(".js-kc-done");
    var $kc_amt = $("#contentframe").contents().find(".js-kc-amt");
    var $course_viewed = $("#contentframe").contents().find(".js-course-viewed");
    var intKC_rem = 0;
    var intKC_amt = parseInt(arrInteraction.length);
    if ($kc_list.length > 0) {
        strPgRemed = strCurrentPage;
    }
    $kc_list.empty();
    arrTempMod = [];
    arrTempLI = [];
    arrSetLI = [];
    arrPgLI = [];
    arrTempPg = [];

    for (var y = 0; y < arrInteraction.length; y++) {
        strKC_complete = ScormProcessGetValue("cmi.interactions." + y + ".result")
        arrInteraction[y][2] = strKC_complete;
        if (arrInteraction[y][2] === "correct" || arrInteraction[y][2] === "incorrect") {
            intKC_rem = intKC_rem + 1;
        }
    }
    arrTempPg = runthis();

    for (var w = 0; w < arrTempPg.length; w++) {
        var strTempPath = arrTempPg[w][1];
        var intPath = parseInt(strTempPath.substring(0, 2));
        var strMod = arrTempPg[w][1];
        var intMod = parseInt(strMod.substring(0, 2));
        var intTempMod = parseInt(strMod.substring(3, 5));
        var intLsn = parseInt(strMod.substring(6, 8));
        var setHref = '<a href="javascript:parent.setFrm(\'' + arrTempPg[w][1] + '\'); javascript:window.top.strCurrentPage=\'' + arrTempPg[w][1] + '\';javascript:parent.addRemed()">' + arrTempPg[w][0] + '</a>';
        arrTempMod.push(intMod);
        arrTempMod = removeDupesArr(arrTempMod);
        var thisLI = createElem("li");
        $(thisLI).html(setHref);
        $(thisLI).addClass("c-list__item")
        arrTempLI.push([intTempMod, intLsn, thisLI]);
    }

    $kc_done.text("" + intKC_rem);
    $kc_amt.text("" + intKC_amt);
    arrSetLI = multiDimensionalUnique(arrTempLI);

    if (!blnViewed) {
        var intPgViewed = parseInt(arrViewed.length / intTotPg * 100)
        intPctComp = parseInt((parseInt(course_complete(pgViewed(), kc_comp(), lsn_comp(), final_comp())) + parseInt(intPgViewed)));
    } else {
        intPctComp = course_complete(pgViewed(), kc_comp(), lsn_comp(), final_comp());
    }

    if (arrTempMod.length > 0) {
        for (var a = 0; a < arrTempMod.length; a++) {
            var thisDiv;
            var thisHdr = createElem("h4");
            var strHdr;
            if (a < 9) {
                thisDiv = createElem("div", "div_comp0" + parseInt(arrTempMod[a]));
            } else {
                thisDiv = createElem("div", "div_comp" + parseInt(arrTempMod[a]));
            }
            strHdr = arrModule[parseInt(arrTempMod[a]) - 1];
            $(thisDiv).addClass("l-review")
            $(thisHdr).html(strHdr);
            $(thisHdr).addClass("l-review__module-title")
            $(thisDiv).append(thisHdr);
            for (var b = 0; b < arrSetLI.length; b++) {
                if (parseInt(arrSetLI[b][0]) === parseInt(arrTempMod[a])) {
                    var thisSubDiv = createElem("div");
                    $(thisSubDiv).addClass("l-review__lsn-group")
                    var thisSubHdr = createElem("h5");
                    $(thisSubHdr).addClass("l-review__lesson")
                    var strSubHdr;
                    var thisOL = createElem("ol");
                    $(thisOL).addClass("l-review__list c-list c-list--sm c-list--lined")
                    $(thisDiv).append(thisSubDiv);
                    $(thisSubDiv).append(thisSubHdr);
                    $(thisSubDiv).append(thisOL);
                    for (var c = 0; c < arrTempLI.length; c++) {
                        if (parseInt(arrTempLI[c][0]) === parseInt(arrSetLI[b][0]) && parseInt(arrTempLI[c][1]) === parseInt(arrSetLI[b][1])) {
                            $(thisOL).append(arrTempLI[c][2]);
                            strSubHdr = "Lesson " + (parseInt(arrSetLI[b][1]));
                            if (strSubHdr === "Lesson 0") {
                                strSubHdr = "Module Introduction"
                            } else if (strSubHdr === "Lesson 99") {
                                strSubHdr = "Module Summary"
                            }
                            $(thisSubHdr).html(strSubHdr);
                        }
                    }
                }
            }
            $($kc_list, window.parent.frames[0].document).append(thisDiv)

            if (intPctComp === 100) {
                $kc_complete.removeClass("is-hidden");
                if (!$kc_incomplete.hasClass("is-hidden")) {
                    $kc_incomplete.addClass("is-hidden");
                }
            } else {
                $kc_incomplete.removeClass("is-hidden");
                if (!$kc_complete.hasClass("is-hidden")) {
                    $kc_complete.addClass("is-hidden");
                }
            }
        }
    } else {
        if (intPctComp === 100) {
            $kc_complete.removeClass("is-hidden");
            if (!$kc_incomplete.hasClass("is-hidden")) {
                $kc_incomplete.addClass("is-hidden");
            }
        } else {
            $kc_incomplete.removeClass("is-hidden");
            if (!$kc_complete.hasClass("is-hidden")) {
                $kc_complete.addClass("is-hidden");
            }
        }
    }
    $('[data-course-progress]', window.parent.frames[0].document).html("" + intPctComp + "% ");
}

function kc_comp() {
    var $intpct;
    if (blnKC) {
        $intpct = parseInt(arrInteraction_Comp.length / (arrInteraction.length) * 100);
        return $intpct;
    } else {
        return null;
    }
}

function lsn_comp() {
    var $intpct;
    if (blnLsn) {
        $intpct = parseInt((arrLsnComp.length / arrLsnExam.length) * 100);
        return $intpct;
    } else {
        return null;
    }
}

function pgViewed() {
    var $intpct;
    if (blnViewed) {
        $intpct = parseInt(arrViewed.length / intTotPg * 100);
        return $intpct;
    } else {
        return null;
    }
}

function final_comp() {
    var $intpct;
    if (blnExam && strCourseComp === "failed") {
        $intpct = parseInt((arrViewed.length) / intTotPg) * 100;
        return $intpct;
    } else {
        return null;
    }
}

function addRemed() {
    blnRemediate = true;
}

function pgMissed(arr1, arr2) {
    var thisArr = [];
    for (var a = 0; a < arr1.length - 1; arr1++) {
        var kc = arr1[a][1].kc
        var dd = arr1[a][1].dnd
        var jp = arr1[a][1].jeopardy
        if (!kc && !dd && !jp) {
            thisArr.push([arr1[a][1].title, arr1[a][1].path])
        }
    }
    for (var b = 0; b < arr2.length; arr2++) {
        var idx = $.inArray(arr2[b], thisArr)
        thisArr.splice(idx, 1);
    }
    return thisArr
}

function getCoursePg(arr1, arr2) {
    var thisArr = [];
    for (var a = 0; a < arr1.length - 1; arr1++) {
        thisArr.push([arr1[a][1].title, arr1[a][1].path])
    }
    for (var a = 0; a < arr1.length; a++) {
        $.inArray(parseInt(arr1[a]))
    }
}

function runthis() {
    var thisArr = [];
    var intKC;
    for (var a = 0; a < arrGetPg.length - 1; a++) {
        var kc = arrGetPg[a][1].kc;
        var dd = arrGetPg[a][1].dnd;
        var jp = arrGetPg[a][1].jeopardy;
        var thisPath = arrGetPg[a][1].path;
        thisArr.push([arrGetPg[a][1].title, arrGetPg[a][1].path])
    }

    for (var b = 0; b < arrViewed.length; b++) {
        var idx = parseInt(arrViewed[b]);
        var strPath = arrGetPg[idx][1].path;
        for (var d = 0; d < thisArr.length; d++) {
            if (strPath === thisArr[d][1]) {
                thisArr.splice(d, 1);
            }
        }
    }
    return thisArr
}

function course_complete(a, b, c, d) {
    var xComp = 0;
    arrCompVal = [];
    if (!(isNaN(a)) && a != null) {
        arrCompVal.push(a)
    }
    if (!(isNaN(b)) && b != null) {
        arrCompVal.push(b)
    }
    if (!(isNaN(c)) && c != null) {
        arrCompVal.push(c)
    }
    if (!(isNaN(d)) && d != null) {
        arrCompVal.push(d)
    }
    for (var i = 0; i < arrCompVal.length; i++) {
        xComp = xComp + arrCompVal[i];
    }
    xComp = parseInt(xComp / arrCompVal.length);
    return xComp;
}
