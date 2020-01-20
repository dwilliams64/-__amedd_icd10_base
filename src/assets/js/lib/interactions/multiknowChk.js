/*--JavaScript Document Knowledge Checks --*/
var arrCBO = [];
var arrCBOSelect = [];
var arrCBORsp = [];
var arrCkGrp = [];
var arrCorrRsp = [];
var arrGetChkRsp = [];
var arrGetCBORsp = [];
var arrGetOption = [];
var arrRdGrp = [];
var arrMatchCBO = [];
var arrMatchLbl = [];
var arrMatchOpt = [];
var arrOptCBO = [];
var arrRemed = [];
var arrCorr = [];
var arrIncorr = [];
var arrListCorr = [];
var arrListIncorr = [];
var arrForm = [];
var arr_wrong = [];

var boolAtt = true;
var intAtt = 0;
var intAttMaxed;
var intCurrNum;
var intForm = 0;
var intQuestAmt;
var intSelect;
var intObj;

var btnSubmit;
var btnRetry;
var divFeedback;
var strRemedValue;
var strFormNm;
var strGetType;
var strGetResponse;
var strResetTxt;
const openMain = $('[data-q]');
const isfbOpen = 'is-feedback-open';

var boolAllow = false;

$(document)
    .ready(function() {
        var correct;
        var incorrect;
        var frmId;
        var tempLbl;
        var tempInput;
        divFeedback = $('#feedback');
        $(divFeedback).attr('tabindex', 0)
        $(divFeedback).children().attr('tabindex', 0);


        arrRemed[0] = correct;
        arrRemed[1] = incorrect;
        btnSubmit = $("[data-q-submit]");

        $("form").each(function(idx) {
            var thisForm = $(this);
            if (idx <= 9) {
                $(thisForm).attr("id", "fm_0" + parseInt(idx + 1));
            } else {
                $(thisForm).attr("id", "fm_" + parseInt(idx + 1));
            }
            frmId = $(thisForm).attr("id");
            var thisType = $(this).attr("data-q-type");
            var thisAnswer = $(this).attr("data-q-answer");
            var thisCorrect = $(this).attr("data-q-correct");
            var thisIncorrect = $(this).attr("data-q-incorrect");
            var thisRetry = $(this).attr("data-q-retry");
            var thisName = $(this).attr("data-q-name");
            var thisAttempt = $(this).attr("data-q-attempt");
            $(this).find("label").each(function(idx_a) {
                var tempLbl = $(this);

                if (idx_a <= 9) {
                    tempLbl.attr("for", "" + frmId + "_input_0" + parseInt(idx_a + 1))

                } else {
                    tempLbl.attr("for", "" + frmId + "_input_" + parseInt(idx_a + 1));
                }
                var tempInput = tempLbl.find("input");
                var thisVal = tempInput.attr("value");
                tempInput.attr("id", "" + tempLbl.attr("for"))
                    .attr("name", "" + thisName + "_input")
            });

            $(this).find("select").each(function(idx_b) {
                var tempSel = $(this);
                if (idx_b <= 9) {
                    tempSel.attr("id", "" + frmId + "_sel_0" + parseInt(idx_b + 1));
                } else {
                    tempSel.attr("id", "" + frmId + "_sel_" + parseInt(idx_b + 1));
                }

                $(this)
                    .change(function() {
                        ckCBO(this.id);
                    });

                $(this).find("option").each(function(idx_c) {
                    var tempOpt = $(this);
                    if (idx_c <= 9) {
                        tempOpt.attr("id", "" + frmId + "_opt_0" + parseInt(idx_c + 1));
                    } else {
                        tempOpt.attr("id", "" + frmId + "_opt_" + parseInt(idx_c + 1));
                    }
                });
                tempInput = $(tempSel).attr("id");
                arrCBO.push(tempInput);
            });
            arrForm.push([thisForm, thisType, thisAnswer, thisCorrect, thisIncorrect, thisName, thisAttempt, thisRetry, frmId])
        });
        showForm();
        $("button[data-q-adv]").attr("disabled", true);
    });

function showForm() {
    for (var i = 0; i < arrForm.length; i++) {
        if (i != intForm) {
            var thisForm = $(arrForm[i][0]).attr("id");
            $("#" + thisForm).attr("aria-hidden", "true").parent().hide()
            $("#" + thisForm).parent().attr("display", "none");
        } else {
            var thisForm = $(arrForm[intForm][0]).attr("id");
            var test = $("#" + thisForm).parent();
            $("#" + thisForm).attr("aria-hidden", "false").parent().show()
            $("#" + thisForm).parent().attr("display", "block");
            intAttMaxed = parseInt(arrForm[intForm][6])
        }
    }
    // $(document).unbind("keydown", keyFunc);
    intCurrNum = intForm + 1;
    intQuestAmt = arrForm.length;
    $("span[data-q-num]").html(intCurrNum + " ");
    $("span[data-q-amt]").html(" " + intQuestAmt);
    mkQuestion();
}

function mkQuestion() {
    $(btnSubmit).unbind("click");
    strGetType = arrForm[intForm][1];
    strFormNm = arrForm[intForm][5];
    intSelect = "";
    switch (strGetType) {
        case 'mc':
            $("input:radio[name=" + strFormNm + "_input]")
                .click(function() {
                    intObj = $("input:radio[name=" + strFormNm + "_input]:checked").attr("id")
                    intSelect = $("input:radio[name=" + strFormNm + "_input]")
                        .index($("input:radio[name=" + strFormNm + "_input]:checked"));
                })
                .removeAttr("disabled");
            $("label")
                .each(function(index) {
                    arrRdGrp.push([$(this)
                        .children("input"), this
                    ]);
                });
            $(btnSubmit).bind("click", function() {
                valOptForm();
            })
            break;
        case 'ms':
            $("input:checkbox[name=" + strFormNm + "_input]")
                .click(function() {
                    intObj = $("input:checkbox[name=" + strFormNm + "_input]:checked").attr("id")
                    intSelect = $("input:checkbox[name=" + strFormNm + "_input]")
                        .index($("input:checkbox[name=" + strFormNm + "_input]:checked"))
                })
                .removeAttr("disabled");

            $("input:checkbox[name=" + strFormNm + "_input]").parent()
                .each(function(index) {
                    arrCkGrp.push([$(this)
                        .children("input"), this
                    ]);
                });
            $(btnSubmit).bind("click", function() {
                valCk();
            })
            break;
        case 'match':
            $(btnSubmit).unbind("click");
            arrCBOSelect = [];
            arrOptCBO = [];
            cboSub();
            break;
    }
    strGetResponse = arrForm[intForm][2];
    arrCorrRsp = [];
    if (strGetResponse.length === 1) {
        arrCorrRsp.push(parseInt(strGetResponse));
    } else {
        arrCorrRsp = strGetResponse;
        arrCorrRsp = arrCorrRsp.split(',');
        for (var i = 0; i < arrCorrRsp.length; i++) {
            arrCorrRsp[i] = parseInt(arrCorrRsp[i])
        }
    }
}

//fuctionality for radio button selection
function valBtn(btn) {
    var cnt = -1;
    for (var i = btn.length - 1; i > -1; i--) {
        if (btn[i].checked) {
            cnt = i;
            i = -1;
        }
    }
    if (cnt > -1) {
        var tempId = parseInt((btn[cnt].id)
            .substring(((btn[cnt].id)
                    .length - 1), (btn[cnt].id)
                .length));
        return tempId;
    } else {
        return null;
    }
}

//fuctionality to evaluate the radio button selection
function valOptForm(form) {
    for (var iRad = 0; iRad < arrRdGrp.length; iRad++) {
        $(arrRdGrp[iRad][0])
            .attr("disabled", true);
    }
    if (intSelect !== "" && parseInt(intSelect + 1) === parseInt(arrForm[intForm][2])) {
        $("input:radio[name=" + strFormNm + "_input]")
            .each(function(idx_a) {
                if (parseInt(arrForm[intForm][2]) === parseInt(idx_a + 1)) {
                    $(this).parent().addClass('is-correct');
                }
            });
        successFeedback();
    } else {
        $("input:radio[name=" + strFormNm + "_input]")
            .each(function(idx_a) {
                if (parseInt(arrForm[intForm][2]) != parseInt(idx_a + 1)) {
                    $(this).parent().addClass('is-incorrect');
                }
            });
        failFeedback();
    }
    if (intCurrNum === arrForm.length) {
        $("button[data-q-adv]").text("Select 'Next' to Continue").val();
        parent.getkcid();
    }
}

//fuctionality to combo box elements
function valCk() {
    arrGetChkRsp = [];
    $("input:checkbox[name=" + strFormNm + "_input]")
        .each(function(idx_b) {
            if ($(this).is(":checked")) {
                arrGetChkRsp.push(parseInt(idx_b + 1));
            }
            $(this)
                .attr("disabled", true);
        })

    if ('' + arrCorrRsp === '' + arrGetChkRsp) {
        for (var x = 0; x < arrCorrRsp.length; x++) {
            var idx_correct = parseInt(arrCorrRsp[x]);
            $(arrCkGrp[idx_correct - 1][1]).addClass("is-correct");
        }
        successFeedback();
    } else {
        arr_wrong = [];
        arr_wrong = (diff(arrGetChkRsp, arrCorrRsp));
        for (var x = 0; x < arr_wrong.length; x++) {
            var i = arr_wrong[x]
            $(arrCkGrp[parseInt(i - 1)][1]).addClass("is-incorrect");
        }
        failFeedback();
    }
    if (intCurrNum === arrForm.length) {
        parent.getkcid();
    }
}

//fuctionality to evaluate the radio button selection
function ckCBO(cbo) {
    arrCBOSelect = []
    for (var i = 0; i < arrCBO.length; i++) {
        arrCBOSelect.push([arrCBO[i]]);
    }
    arrCBOSelect = parent.removeDupesArr(arrCBOSelect);
    arrOptCBO = arrCBOSelect;
    intSelect = arrCBOSelect.length;
}

function cboSub() {
    $(btnSubmit).unbind("click");
    $(btnSubmit).bind("click", function() {
        valckCBO();
    })
}

//fuctionality to evaluate the combo box selections
function valckCBO() {
    arrCBORsp = [];
    arrGetCBORsp = [];

    for (var j = 0; j < arrCBOSelect.length; j++) {
        arrGetCBORsp.push($("#" + arrCBOSelect[j] + " option:selected")
            .index());
        $(arrCBOSelect[j]).attr("disabled", true);
    }

    for (var i = 0; i < arrCBO.length; i++) {
        $("#" + arrCBO[i]).attr("disabled", true)
    }

    if ('' + arrCorrRsp === '' + arrGetCBORsp) {
        for (var x = 0; x < arrCorrRsp.length; x++) {
            var idx_correct = parseInt(arrCorrRsp[x]);
            $("#" + arrCBOSelect[idx_correct - 1]).parent().addClass("is-correct-cbo");
        }
        successFeedback();
    } else {
        arr_wrong = [];
        arr_wrong = compare_arrays(arrGetCBORsp, arrCorrRsp);
        for (var x = 0; x < arr_wrong.length; x++) {
            for (var y = 0; y < arrCBOSelect.length; y++) {
                if (parseInt(arr_wrong[x]) === parseInt(arrCorrRsp[y] - 1)) {
                    $("#" + arrCBOSelect[parseInt(arr_wrong[x])]).parent().addClass("is-incorrect-cbo");
                }
            }
        }
        failFeedback();
    }
    if (intCurrNum === arrForm.length) {
        parent.getkcid();
    }
}

//fuctionality to diasble the submit but after selection
function disableSub() {
    btnSubmit.attr("disabled", true);
}

function nextQuest() {
    if (intForm < (arrForm.length - 1)) {
        intForm = intForm + 1;
    }
    clearKC();
    showForm();
    btnSubmit.removeAttr('disabled');
    $("button[data-q-adv]").attr("disabled", true);

    $(divFeedback).removeClass("is-open")
    $(openMain).removeClass(isfbOpen);
}

// functionality for reset button
function drawReset() {
    setTimeout(function() {

        btnRetry = $("button[data-q-retry]");
        if ($(btnRetry).length > 0) {
            //$(btnRetry).unbind("click")
            $(btnRetry).on("click", function() {
                clearKC();
                showForm();
            })
        }
    }, 500);

    $(divFeedback)
        .html(arrForm[intForm][7])
        .addClass("is-open")
        .css('tabindex', 0);


    if (strGetType === 'match') {
        arrCBOSelect = [];

    }
    btnSubmit.removeAttr('disabled');
    $(openMain).removeClass(isfbOpen);
}

function clearKC() {
    switch (strGetType) {

        case 'mc':
            for (var i = 0; i < arrRdGrp.length; i++) {
                $(arrRdGrp[i][0]).removeAttr('disabled');
                $(arrRdGrp[i][0]).removeAttr('checked');
                $(arrRdGrp[i][0]).prop('checked', false);
            }
            $(btnSubmit).unbind("click");
            btnSubmit.removeAttr('disabled');
            $(btnSubmit).bind("click", function() {
                valOptForm();
            })
            $("input:radio[name=" + strFormNm + "_input]")
                .each(function(idx_a) {
                    $(this).parent().removeClass('is-correct');
                    $(this).parent().removeClass('is-incorrect');
                });
            break;

        case 'ms':
            for (var i = 0; i < arrCkGrp.length; i++) {

                $(arrCkGrp[i][0]).removeAttr('disabled');
                $(arrCkGrp[i][0]).removeAttr('checked');
                $(arrCkGrp[i][0]).prop('checked', false);
            }
            $(btnSubmit).unbind("click");
            btnSubmit.removeAttr('disabled');
            $(btnSubmit).bind("click", function() {
                valCk();
            })
            $("input:checkbox[name=" + strFormNm + "_input]")
                .each(function(idx_a) {
                    $(this).parent().removeClass('is-correct');
                    $(this).parent().removeClass('is-incorrect');
                });
            break;

        case 'match':
            for (var j = 0; j < arrOptCBO.length; j++) {
                $("#" + arrOptCBO[j])
                    .removeAttr("disabled")
                $("#" + arrOptCBO[j]).parent().removeClass("is-correct-cbo");
                $("#" + arrOptCBO[j]).parent().removeClass("is-incorrect-cbo");
                $("#" + arrOptCBO[j]).prop("selectedIndex", 0);
            }

            for (var i = 0; i < arrCBO.length; i++) {
                $("#" + arrCBO[i]).removeAttr("disabled");
            }

            $(btnSubmit).unbind("click");
            btnSubmit.removeAttr('disabled');
            $(btnSubmit).bind("click", function() {
                valckCBO();
            })
            break;
    }

    $(strResetTxt).remove();
    $(divFeedback).html("").removeClass("is-open");
    $(openMain).removeClass(isfbOpen);
}

function successFeedback() {
    $(divFeedback)
        .html(arrForm[intForm][3])
        .addClass("is-open");
    parent.strInteraction_stat = "correct";
    parent.strSuccess_stat = "passed";
    parent.intSetScr = 100;

    $(openMain).addClass(isfbOpen);

    $(divFeedback).focus();
    if ((intForm + 1) < arrForm.length) {
        $("button[data-q-adv]").removeAttr("disabled");
        // keepFocus(divFeedback);
    }
    intAtt = 0;
    // $(document).bind("keydown", keepFocus);
    // $(document).bind("keydown", keyFunc);
    callFocus();
    disableSub();
}

function failFeedback() {
    if (boolAtt) {
        intAtt = intAtt + 1;
        if (intAtt < intAttMaxed) {
            $(divFeedback)
                .html()
            drawReset();
        } else {
            $(divFeedback).html(arrForm[intForm][4])
            intAtt = 0;
            if ((intForm + 1) < arrForm.length) {
                $("button[data-q-adv]").removeAttr("disabled");
            }
            disableSub();
        }
    }
    $(divFeedback)
        .addClass("is-open");
    $(divFeedback)
        .focus();
    $(openMain).addClass(isfbOpen);
    parent.strInteraction_stat = "incorrect";
    parent.strSuccess_stat = "failed";
    parent.intSetScr = 0;
    // if (parent.initialized === true || parent.initialized === "true") {
    //     parent.strSuccess_stat = "failed";
    //     parent.intSetScr = 0;
    // }
    intSelect = "";

    callFocus();
}

function diff(A, B) {
    return A.filter(function(a) {
        return B.indexOf(a) == -1;
    });
}

function compare_arrays(a, b) {
    var common = [];
    for (var i = 0; i < a.length; i++) {
        if (b[i] != a[i]) {
            common.push(i);
        }
    }
    return common;
}

function keyFunc(e) {
    if (e.keyCode === 9 && intAtt < intAttMaxed && intCurrNum < arrForm.length) {
        if ($(divFeedback).hasClass("is-open")) {
            $('[data-q-button]').focus()
            e.preventDefault();
        }
    } else {
        $(document).unbind("keydown", keyFunc);
    }
}

function callFocus() {
    if (intAtt < intAttMaxed && intCurrNum < arrForm.length) {
        $(document).bind("keydown", keepFocus);
    } else {
        $(document).unbind("keydown", keepFocus);
    }
}

$(document).on('click', '[data-q-adv]', function() {
    nextQuest();
});