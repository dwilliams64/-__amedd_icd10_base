// Coley Interaction Library - Jeopardy Game
var arrInstruction = [];
var arrAmt = [];
var arrJeopFrm = [];
var arrJeopBtn = [];
var arrJeopRdGrp = [];

var btnSubmit;
var btnIndex;
var btnNext;
var btnReplay;
var jBtnID;
var divJeopAmt;
var divJeopFb;
var divJeopContent;

var intChoiceAmt = 0;
var intForm = 0;
var intSetScore = 0;
var intTotAmt = 0;
var intSelect;

var strFormNm;
var strScore;

$(document)
    .ready(function() {
        divJeopAmt = $('.js-jeop-amt');
        divJeopContent = $('.js-jeop-content');
        divJeopFb = $('div[data-j-feedback]');
        strScore = $("p[data-j-amt]");
        btnSubmit = $("#btnJeop");
        btnNext = $("button[data-j-next]");
        btnReplay = $("button[data-j-replay]");
        $(divJeopContent).attr("tabindex", 0);
        $(divJeopAmt).attr("tabindex", 0);
        $(divJeopFb).attr("aria-hidden", "true").hide();
        $(divJeopFb).css("display", "none");
        $(btnSubmit).attr("aria-hidden", "true").hide();
        $(btnSubmit).css("display", "none");
        $(btnNext).attr("aria-hidden", "true").hide();
        $(btnNext).css("display", "none");
        $(btnReplay).attr("aria-hidden", "true").hide();
        $(btnReplay).css("display", "none");
        $(btnReplay).on("click", function() {
            resetJeopardy();
            $(this.id).bind("click");
        });
        $(btnNext).on("click", function() {
            nextFrm();
            $(this.id).bind("click");
        });

        $(strScore)
            .html('' + intSetScore);

        $("div[data-j-instructions]").each(function(idx) {
            var thisObj = $(this)
            var thisInstr = $(this)
                .html();

            $(thisObj).attr("aria-hidden", "true").hide();
            $(thisObj).css("display", "none");
            arrInstruction.push([thisObj, thisInstr]);
        });

        $(arrInstruction[0][0]).attr("aria-hidden", "false").show();
        $(arrInstruction[0][0]).css("display", "block");

        $("button[data-j-value]").each(
            function(idx) {
                var thisBtn = $(this);
                var thisVal = $(this).attr("data-j-value");
                if (idx <= 9) {
                    $(thisBtn).attr("id", "jBtn_0" + parseInt(idx + 1));
                } else {
                    $(thisBtn).attr("id", "jBtn_" + parseInt(idx + 1));
                }
                var btnId = $(thisBtn).attr("id");
                $(thisBtn).attr("tabindex", 0);

                thisBtn.on("click", function() {
                    doJeopardy(this.id);
                    $(this.id)
                        .bind('click');
                });
                arrAmt.push(thisVal);
                arrJeopBtn.push(thisBtn)
                intTotAmt = intTotAmt + parseInt(arrAmt[idx]);
            });

        $("form").each(function(idx) {
            var thisForm = $(this);
            if (idx <= 9) {
                thisForm.attr("id", "fm_0" + parseInt(idx + 1))
                    .attr("name", "fm_0" + parseInt(idx + 1));
            } else {
                thisForm.attr("id", "fm_" + parseInt(idx + 1))
                    .attr("name", "fm_" + parseInt(idx + 1));
            }

            var frmId = $(thisForm).attr("id");
            $("#" + frmId).attr("aria-hidden", "true").parent().hide()
            $("#" + frmId).parent().css("display", "none");

            var thisType = $(this).attr("data-j-type");
            var thisAnswer = $(this).attr("data-j-answer");
            var thisCorrect = $(this).attr("data-j-correct");
            var thisIncorrect = $(this).attr("data-j-incorrect");
            var thisName = $(this).attr("data-j-name");
            var thisText = $(this).prev("p[data-j-hdr]").text();

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
                var tempInput = $(tempSel).attr("id");
                arrCBO.push(tempInput);
            });
            arrJeopFrm.push([thisForm, thisType, thisAnswer, thisCorrect, thisIncorrect, thisName, thisText])
        });
    });

function showJeop(e) {
    for (var i = 0; i < arrJeopFrm.length; i++) {
        if ((i) != e) {
            var thisForm = $(arrJeopFrm[i][0]).attr("id");
            $("#" + thisForm).attr("aria-hidden", "true").parent().hide()
            $("#" + thisForm).parent().css("display", "none");
        } else {
            var thisForm = $(arrJeopFrm[e][0]).attr("id");
            var test = $("#" + thisForm).parent();
            $("#" + thisForm).attr("aria-hidden", "false").parent().show()
            $("#" + thisForm).parent().css("display", "block");
        }
    }

    $(btnSubmit).unbind("click");
    var strGetType = arrJeopFrm[e][1];
    strFormNm = arrJeopFrm[e][5];
    intSelect = "";
    switch (strGetType) {
        case 'mc':
            $("input:radio[name=" + strFormNm + "_input]")
                .click(function() {
                    $(btnSubmit).attr("aria-hidden", "false").show();
                    $(btnSubmit).css("display", "block")
                        .removeAttr("disabled");
                  var intObj = $("input:radio[name=" + strFormNm + "_input]").attr("id")
                    intObj = parseInt(intObj.substring(intObj.length - 2, intObj.length))
                    intSelect = $("input:radio[name=" + strFormNm + "_input]")
                        .index($("input:radio[name=" + strFormNm + "_input]:checked"));
                })
                .removeAttr("disabled");
            $("label")
                .each(function(index) {
                    arrJeopRdGrp.push([$(this)
                        .children("input"), this
                    ]);
                });
            $(btnSubmit).bind("click", function() {
                var testing = $(arrJeopFrm[e][0]).attr("id")
                valForm(arrJeopFrm[e][0]);
                if (intChoiceAmt < arrAmt.length) {
                    $(btnNext).attr("aria-hidden", "false").show();
                    $(btnNext).css("display", "block");
                }
            })
            break;
        case 'ms':
            $("input:checkbox[name=" + strFormNm + "_input]")
                .click(function() {
                    intObj = $("input:checkbox[name=" + strFormNm + "_input]").attr("id")
                    intObj = parseInt(intObj.substring(intObj.length - 2, intObj.length))
                    intSelect = $("input:checkbox[name=" + strFormNm + "_input]")
                        .index($("input:checkbox[name=" + strFormNm + "_input]:checked"))
                })
                .removeAttr("disabled");

            $("input:checkbox[name=" + strFormNm + "_input]").parent()
                .each(function(index) {
                    arrJeopCkGrp.push([$(this)
                        .children("input"), this
                    ]);
                });
            $(btnSubmit).bind("click", function() {
                valCheck();
            })
            break;
    }
    $(divJeopFb).attr("aria-hidden", "true").hide();
    $(divJeopFb).css("display", "none");
}

function doJeopardy(btnId) {
    var answerNode = [];
    jBtnID = btnId;
    if (arrJeopRdGrp.length > 0) {
        for (var i = 0; i < arrJeopRdGrp.length; i++) {
            $(arrJeopRdGrp[i][0]).attr('checked', false);
        }
    }

    btnIndex = (parseInt(btnId.substring((btnId.length - 2), btnId.length))) - 1;

    $("p[data-j-fb-hdr]")
        .html('' + arrJeopFrm[btnIndex][6]);

    for (var i = 0; i < arrInstruction.length; i++) {
        $(arrInstruction[i][0]).attr("aria-hidden", "true").hide();
        $(arrInstruction[i][0]).css("display", "none");
    }

    intForm = btnIndex
    showJeop(intForm)
    $("#" + btnId)
        .attr("name", "$" + arrAmt[intForm] + ": Selected")
    //.attr("disabled", true)
    setTimeout(function() {
        $(arrJeopBtn[intForm])
            .attr("title", "$" + arrAmt[intForm] + ": Selected");
    }, 200);

    $(btnNext).attr("aria-hidden", "true").hide();
    $(btnNext).css("display", "none");
    $(btnSubmit).attr("aria-hidden", "true").hide();
    $(btnSubmit).css("display", "none");
    $(divJeopContent).focus();
}

function valForm(form) {
    var frmID = form.attr("id");

    for (var iRad = 0; iRad < arrJeopRdGrp.length; iRad++) {
        $(arrJeopRdGrp[iRad][0])
            .attr("disabled", true);
    }
    intChoiceAmt = intChoiceAmt + 1;

    $("div[data-j-fb-hdr]").html("" + arrJeopFrm[btnIndex][6]);
    if ((parseInt(intSelect) + 1) === parseInt(arrJeopFrm[intForm][2])) {
        $("input:radio[name=" + strFormNm + "_input]")
            .each(function(idx_a) {
                if (parseInt(arrJeopFrm[intForm][2]) === parseInt(idx_a + 1)) {
                    $(this).parent().addClass('is-correct');
                }
            });
        intSetScore = intSetScore + parseInt(arrAmt[btnIndex]);
        $("div[data-j-fb-content]").html("" + arrJeopFrm[btnIndex][3]);

    } else {
        $("input:radio[name=" + strFormNm + "_input]")
            .each(function(idx_a) {
                if (parseInt(arrJeopFrm[intForm][2]) != parseInt(idx_a + 1)) {
                    $(this).parent().addClass('is-incorrect');
                }
            });
        intSetScore = intSetScore - parseInt(arrAmt[btnIndex]);
        $("div[data-j-fb-content]").html("" + arrJeopFrm[btnIndex][4]);
    }
    $(strScore).text("" + intSetScore);

    if (intChoiceAmt < arrAmt.length) {
        $(arrInstruction[1][0]).attr("aria-hidden", "false").show();
        $(arrInstruction[1][0]).css("display", "block");
        // $(btnNext).attr("aria-hidden", "false").show();
        // $(btnNext).css("display", "block");

    } else if (intChoiceAmt >= arrAmt.length) {
        $(btnNext).attr("aria-hidden", "true").hide();
        $(btnNext).css("display", "none");
        if (intSetScore == intTotAmt) {
            $("div[data-j-fb-hdr]").html("Congratulations!");
            $("div[data-j-fb-content]")
                .html("<p>You've answered all correctly.<p>");
            parent.strInteraction_stat = "correct"
        } else {
            $(arrInstruction[2][0]).attr("aria-hidden", "false").show();
            $(arrInstruction[2][0]).css("display", "block");
            $(btnReplay).attr("aria-hidden", "false").show();
            $(btnReplay).css("display", "block");
            parent.strInteraction_stat = "incorrect"
        }

        parent.getkcid();
    }

    $(divJeopFb).attr("aria-hidden", "false").show();
    $(divJeopFb).css("display", "block");
    $(btnSubmit).attr("disabled", true);
    $(btnSubmit).css("display", "none");
    $(arrJeopFrm[btnIndex][0]).attr("aria-hidden", "true").parent().hide()
    $(arrJeopFrm[btnIndex][0]).parent().css("display", "none");
    arrJeopBtn[btnIndex].attr("disabled", true)
    $(divJeopContent).focus()
}

function resetJeopardy() {

    for (var i = 0; i < arrInstruction.length; i++) {
        $(arrInstruction[i][0]).attr("aria-hidden", "true").hide();
        $(arrInstruction[i][0]).css("display", "none");
    }
    $(arrInstruction[0][0]).attr("aria-hidden", "false").show();
    $(arrInstruction[0][0]).css("display", "block");

    for (var i = 0; i < arrJeopBtn.length; i++) {
        $(arrJeopBtn[i]).removeAttr("disabled")
    }
    $(divJeopFb).attr("aria-hidden", "true").hide();
    $(divJeopFb).css("display", "none");
    $(btnSubmit).attr("aria-hidden", "true").hide();
    $(btnSubmit).css("display", "none");
    $(btnReplay).attr("aria-hidden", "true").hide();
    $(btnReplay).css("display", "none");

    for (var i = 0; i < arrJeopFrm.length; i++) {
        var thisForm = $(arrJeopFrm[i][0]).attr("id");
        $("#" + thisForm).attr("aria-hidden", "true").parent().hide()
        $("#" + thisForm).parent().css("display", "none");
    }
    intSetScore = 0;
    intChoiceAmt = 0;
    $(strScore)
        .html('' + intSetScore)

    for (var i = 0; i < arrJeopRdGrp.length; i++) {
        $(arrJeopRdGrp[i][0]).removeAttr('disabled');
        $(arrJeopRdGrp[i][0]).attr('checked', false);
    }
}

function nextFrm() {
    $(divJeopAmt).focus();
    $(btnNext).attr("aria-hidden", "true").hide();
    $(btnNext).css("display", "none");
}
