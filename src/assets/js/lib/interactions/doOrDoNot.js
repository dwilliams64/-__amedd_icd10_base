// Coley Interaction Library - Do or Do Not Drag & Drop
var doc = document;
var arrTarg_01 = new Array();
var arrTarg_02 = new Array();
var arrChoiceItem = new Array();
var arrChoiceObj = new Array();
var arrFbItem = new Array();
var arrDropNm = [];
var dragResponse;
var intCurrNum = 0;
var intFocusChoice;
var btnCloseFeedback;
var objFocus;
var objNext;
var objNextId;
var testObj;
var divDragObj;

var falseFb = "<span>That's Incorrect</span>";
$(document)
    .ready(function initDDrop() {
        arrChoiceObj = [];
        arrTarg_01 = [];
        arrTarg_02 = [];

        $('.js-drag-fb')
            .each(function(idx_a) {
                var thisFb = $(this)
                    .html();
                arrFbItem.push(thisFb);
                $(this)
                    .remove();
            });

        $('.js-drag-choice')
            .each(function(idx_b) {
                var thisObj = $(this);
                var thisChoice = $(this)
                    .html();
                var responseObj;
                if (idx_b <= 9) {
                    thisObj.attr("id", "drag_choice_0" + idx_b)
                } else {
                    thisObj.attr("id", "drag_choice_" + idx_b)
                }
                if ($(this).children()
                    .hasClass('js-choice-01')) {
                    responseObj = 'true';
                } else if ($(this).children()
                    .hasClass('js-choice-02')) {
                    responseObj = 'false';
                }
                // thisObj.attr("tabindex", 0);
                thisObj
                    .draggable({
                        containment: 'crs-wrap',
                        cursor: '-webkit-grab',
                        cursor: '-moz-grab',
                        revert: true,
                        start: ui_dragStart
                    });
                arrChoiceItem.push([responseObj, thisChoice, arrFbItem[idx_b]]);
                arrChoiceObj.push(thisObj);
            });

        divDragObj = $(".js-choice-container");
        $(divDragObj).attr("tabindex", "0")
        $(divDragObj).focus()

        setStage();
    });

function setStage() {
arrDropNm = [];
    if ($('.js-drag-a').length > 0) {
        $('.ui-droppable').each(
            function(idx_c) {
                var thisObj = $(this);
                var thisObjText = $(this).text()
                if (idx_c < 9) {
                    thisObj.attr("id", "dd_targ_0" + (idx_c + 1))
                } else {
                    thisObj.attr("id", "dd_targ_" + (idx_c + 1))
                }
                $(thisObj).droppable({
                    drop: boxDrop,
                    hoverClass: 'is-hovered'
                });
                arrDropNm.push(thisObjText);
            });
        $('.js-drag-a')
            .each(function(idx_a) {
                var thisBtn = $(this);
                var thisBtnId = $(this).attr('id')
                $(this).attr('value',arrDropNm[0]);
                $(this).attr('aria-label',''+arrDropNm[0])
                if (idx_a < 9) {
                    thisBtn.attr("id", "dd_btn_a_0" + (idx_a + 1))
                } else {
                    thisBtn.attr("id", "dd_btn_a_" + (idx_a + 1))
                }
                thisBtn.on('click', function() {
                    dragObjBtn_a(this.id);
                    $(this.id)
                        .bind('click');
                });
                arrTarg_01.push(thisBtn);
            });

        $('.js-drag-b')
            .each(function(idx_b) {
                var thisBtn = $(this);
                $(this).attr('value',arrDropNm[1]);
                $(this).attr('aria-label',''+arrDropNm[1])
                if (idx_b <= 9) {
                    thisBtn.attr("id", "dd_btn_b_0" + (idx_b + 1))
                } else {
                    thisBtn.attr("id", "dd_btn_b_" + (idx_b + 1))
                }
                $(thisBtn).on('click', function() {
                    dragObjBtn_b(this.id);
                    $(this.id)
                        .bind('click');
                });
                arrTarg_02.push(thisBtn);
            });

        $('.js-drag-choice-p')
            .each(function(idx_b) {
                var thisObj = $(this);
                if (idx_b <= 9) {
                    thisObj.attr("id", "p_choice_0" + (idx_b + 1))
                } else {
                    thisObj.attr("id", "p_choice_" + (idx_b + 1))
                }
            });


        $('.js-btn-box')
            .each(function(idx_d) {
                var thisObj = $(this)
                if (idx_d <= 9) {
                    thisObj.attr("id", "dd_btn_box_0" + (idx_d + 1))
                } else {
                    thisObj.attr("id", "dd_btn_box_" + (idx_d + 1))
                }
            });
    }
    $("#divFeedBack").attr("tabindex", 0);
}

function startDragDrop() {
    $(divDoDontInstruction)
        .remove();
    do_dragDrop();
}

function feedbackClose() {
    $(divFeedback).css("display", "none");
    if (intCurrNum == arrChoiceItem.length) {
        parent.strInteraction_stat = "correct"
        parent.intSetInteractionScr = 100;
        parent.getkcid();
        for (i = 0; i < arrChoiceItem.length; i++) {
            var a = $(arrTarg_01[i]).attr("id");
            var b = $(arrTarg_02[i]).attr("id");

            $("#" + a).on('click', function() {
                dragObjBtn_a(this.id);
                $(this.id)
                    .bind('click');
            });
            $("#" + b).on('click', function() {
                dragObjBtn_b(this.id);
                $(this.id)
                    .bind('click');
            });

            $(arrChoiceObj[i])
                .css('cursor', 'pointer');

            $(arrTarg_01[i])
                .css('opacity', '1');
            $(arrTarg_02[i])
                .css('opacity', '1');
            $(arrChoiceObj[i])
                .css('opacity', '1');

            $(arrChoiceObj[i])
                .attr('draggable', 'true');

            arrChoiceObj[i].on('dragstart', dragStart, false);
            arrChoiceObj[i].on('dragenter', dragEnter, false);
            arrChoiceObj[i].on('dragover', dragOver, false);
            arrChoiceObj[i].on('dragleave', dragLeave, false);
            arrChoiceObj[i].on('drop', drop, false);
            arrChoiceObj[i].on('dragend', dragEnd, false);
        }
    }

    $(divDragObj).focus()
}

function objSetFocus(val) {
    setTimeout(function() { $("#" + val).focus(), 300 })
}

function getFeedbackObj() {

    divFeedback = $("#divFeedBack");
    $(divFeedback)
        .removeClass('is-fb-correct')
        .removeClass('is-fb-incorrect');
    $(hdrFeedback)
        .removeClass('is-fb-correct')
        .removeClass('is-fb-incorrect');
    $(pFeedback)
        .removeClass('is-fb-correct')
        .removeClass('is-fb-incorrect');

    setTimeout(function() {
        $("#divFeedBack").focus();
        var $focused = $(':focus').attr('id');
    });
}

function boxDrop(event, ui) {
    var dragSrcID = $(dragSrc)
        .attr('id');
    var intChoice = parseInt(dragSrcID.substring(dragSrcID.length - 2, dragSrcID.length));
    var getResponse = arrChoiceItem[intChoice][0];
    intFocusChoice = intChoice;
    getFeedbackObj();

    if (this.id == 'dd_targ_01') {
        if (getResponse == 'true') {
            var id_doBtn = $(arrTarg_01[intChoice])
                .attr('id');
            var id_dontBtn = $(arrTarg_02[intChoice])
                .attr('id');
            $(arrTarg_01[intChoice])
                .attr('disabled', 'true');
            $(arrTarg_02[intChoice])
                .attr('disabled', 'true');
            $(arrTarg_01[intChoice])
                .unbind('click');
            $(arrTarg_02[intChoice])
                .unbind('click');
            $(dragSrc)
                .draggable('disable');

            dragResponse = 'true';
            $(divFeedback)
                .addClass('is-fb-correct');
            $(hdrFeedback)
                .addClass('is-fb-correct');
            $(pFeedback)
                .addClass('is-fb-correct');
            $(hdrFeedback)
                .html("<span>That's Correct</span>" + (arrChoiceItem[intChoice][1]));

            $(pFeedback)
                .html("" + arrChoiceItem[intChoice][2]);
            intCurrNum = intCurrNum + 1;
        } else {
            dragResponse = 'false'
            $(divFeedback)
                .addClass('is-fb-incorrect');
            $(hdrFeedback)
                .addClass('is-fb-incorrect');
            $(pFeedback)
                .addClass('is-fb-incorrect');
            $(hdrFeedback)
                .html('' + falseFb);
            $(pFeedback)
                .html('Please Try Again');
        }
    } else if (this.id == 'dd_targ_02') {
        if (getResponse == 'false') {
            var id_doBtn = $(arrTarg_01[intChoice])
                .attr('id');
            var id_dontBtn = $(arrTarg_02[intChoice])
                .attr('id');
            $(arrTarg_01[intChoice])
                .attr('disabled', 'true');
            $(arrTarg_02[intChoice])
                .attr('disabled', 'true');
            $(arrTarg_01[intChoice])
                .unbind('click');
            $(arrTarg_02[intChoice])
                .unbind('click');

            $(dragSrc)
                .draggable('disable');

            dragResponse = 'true';

            $(divFeedback)
                .addClass('is-fb-correct');
            $(hdrFeedback)
                .addClass('is-fb-correct');
            $(pFeedback)
                .addClass('is-fb-correct');
            $(hdrFeedback)
                .html('' + dragResponse);
            $(hdrFeedback)
                .html("<span>That's Correct</span>" + (arrChoiceItem[intChoice][1]));
            $(pFeedback)
                .html('' + arrChoiceItem[intChoice][2]);
            intCurrNum = intCurrNum + 1;
        } else {
            dragResponse = 'false'
            $(divFeedback)
                .addClass('is-fb-incorrect');
            $(hdrFeedback)
                .addClass('is-fb-incorrect');
            $(pFeedback)
                .addClass('is-fb-incorrect');
            $(hdrFeedback)
                .html('' + falseFb);
            $(pFeedback)
                .html('Please Try Again');
        }
    }
    $(divFeedBack).css("display", "table");
    return false;
}

function dragEnd(e) {
    if (dragResponse == 'true') {
        $(this)
            .css('opacity', '0.5');
    } else if (dragResponse == 'true') {
        $(this)
            .css('opacity', '1');
    }
}

function dragObjBtn_a(btnID) {
    getID = '' + btnID;
    var intChoice = parseInt((getID)
        .substring(getID.length - 2, getID.length)) - 1;
    var dragSrcID = '' + $(arrChoiceObj[intChoice])
        .attr('id');
    var getResponse = arrChoiceItem[intChoice][0];

    getFeedbackObj();

    if (getResponse == 'true') {
        var id_doBtn = $(arrTarg_01[intChoice])
            .attr('id');
        var id_dontBtn = $(arrTarg_02[intChoice])
            .attr('id');
        $(arrTarg_01[intChoice])
            .attr('disabled', 'true');
        $(arrTarg_02[intChoice])
            .attr('disabled', 'true');
        $(arrTarg_01[intChoice])
            .unbind('click');
        $(arrTarg_02[intChoice])
            .unbind('click');
        $('#' + dragSrcID)
            .draggable('disable');

        dragResponse = 'true';

        $(divFeedback)
            .addClass('is-fb-correct');
        $(hdrFeedback)
            .addClass('is-fb-correct');
        $(pFeedback)
            .addClass('is-fb-correct');
        $(hdrFeedback)
            .html("<span>That's Correct</span>" + (arrChoiceItem[intChoice][1]));
        $(pFeedback)
            .html('' + arrChoiceItem[intChoice][2]);
        intCurrNum = intCurrNum + 1;
    } else {
        dragResponse = 'false'
        $(divFeedback)
            .addClass('is-fb-incorrect');
        $(hdrFeedback)
            .addClass('is-fb-incorrect');
        $(pFeedback)
            .addClass('is-fb-incorrect');
        $(hdrFeedback)
            .html('' + falseFb);
        $(pFeedback)
            .html('Please Try Again');
    }
    $(divFeedBack).css("display", "table");
}

function dragObjBtn_b(btnID) {
    var intChoice = parseInt(btnID.substring(btnID.length - 2, btnID.length)) - 1;
    var dragSrcID = '' + $(arrChoiceObj[intChoice])
        .attr('id');
    var getResponse = arrChoiceItem[intChoice][0];

    getFeedbackObj();

    if (getResponse == 'false') {
        var id_doBtn = $(arrTarg_01[intChoice])
            .attr('id');
        var id_dontBtn = $(arrTarg_02[intChoice])
            .attr('id');
        $(arrTarg_01[intChoice])
            .attr('disabled', 'true');
        $(arrTarg_02[intChoice])
            .attr('disabled', 'true');
        $(arrTarg_01[intChoice])
            .unbind('click');
        $(arrTarg_02[intChoice])
            .unbind('click');
        $('#' + dragSrcID)
            .draggable('disable');
        dragResponse = 'true';

        $(divFeedback)
            .addClass('is-fb-correct');
        $(hdrFeedback)
            .addClass('is-fb-correct');
        $(pFeedback)
            .addClass('is-fb-correct');
        $(hdrFeedback)
            .html("<span>That's Correct</span>" + (arrChoiceItem[intChoice][1]));
        $(pFeedback)
            .html('' + arrChoiceItem[intChoice][2]);
        intCurrNum = intCurrNum + 1;
    } else {
        dragResponse = 'false'
        $(divFeedback)
            .addClass('is-fb-incorrect');
        $(hdrFeedback)
            .addClass('is-fb-incorrect');
        $(pFeedback)
            .addClass('is-fb-incorrect');
        $(hdrFeedback)
            .html('' + falseFb);
        $(pFeedback)
            .html('Please Try Again');
    }
    $(divFeedBack).css("display", "table");
}
