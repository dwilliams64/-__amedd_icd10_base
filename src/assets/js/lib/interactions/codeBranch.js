/********** Code Branch **********/

var arrCodeBranch = [];
var arrCodeLbl = [];
var arrSubCodeBranch = [];
var intCodeBranch = -1;
var intSubCodeBranch = -1;
var arrSubCode = [];
var arrSubUsage = [];
var arrSubImpact = [];
var arrSubTabPanel = [];
var arrSubSel = [];
var codeCircle;
var usageCircle;
var impactCircle;
var dataObj;
var intObj;
var strInstrHdr;
var strInstrTxt;

$(document)
    .ready(function codeBranch() {
        $('[data-code-obj]')
            .each(function(idx_a) {
                var thisBranch = $(this);
                if (idx_a < 9) {
                    thisBranch.attr("id", "cBranch_0" + (idx_a + 1))
                } else {
                    thisBranch.attr("id", "cBranch_" + (idx_a + 1))
                }
                arrCodeBranch.push(thisBranch);
                var thisText = $(arrCodeBranch[idx_a]).text();
                thisText = $.trim(thisText);
                arrCodeLbl.push(thisText);
            });

        $('[data-subcode-obj]')
            .each(function(idx_b) {
                var thisBranch = $(this);
                if (idx_b < 9) {
                    thisBranch.attr("id", "cSubBranch_0" + (idx_b + 1))
                } else {
                    thisBranch.attr("id", "cSubBranch_" + (idx_b + 1))
                }
                arrSubCodeBranch.push(thisBranch);
                // $(arrSubCodeBranch[idx_b]).addClass('is-hidden');
            });

        $('[data-sel]').each(function(idx) {
            var thisPanel = $(this);
            arrSubTabPanel.push(thisPanel);
        });

        strInstrHdr = $(".t-instruct").html();
        strInstrTxt = $(".c-instruct__title").html();

        $('[dt-sub-sel]').each(function(idx) {
            var thisSel = $(this);
            arrSubSel.push(thisSel);
        })

        $('[data-sub-code]').each(function(idx_c) {
            var thisSubCode = $(this).html();
            thisSubCode = $.trim(thisSubCode);
            // var subCode = Handlebars.compile(thisSubCode);
            // console.log("subCode "+subCode);
            arrSubCode.push(thisSubCode)
        });
        $('[data-sub-usage]').each(function(idx_u) {
            var thisSubUsage = $(this).html();
            thisSubUsage = $.trim(thisSubUsage);
            // var subUsage = Handlebars.compile(thisSubUsage);
            // console.log("subUsage "+subUsage);
            arrSubUsage.push(thisSubUsage)
        });
        $('[data-sub-impact]').each(function(idx_i) {
            var thisSubImpact = $(this).html();
            thisSubImpact = $.trim(thisSubImpact);
            // var subImpact = Handlebars.compile(thisSubImpact);
            // console.log("subImpact "+subImpact);
            arrSubImpact.push(thisSubImpact)
        });
        codeCircle = $('.sub_circle_01');
        usageCircle = $('.sub_circle_02');
        impactCircle = $('.sub_circle_03');
    });

$('[data-code-obj]').on('click', function() {
    dataObj = $(this).attr("data-code-obj")
    intObj = parseInt(dataObj);

    // $(".code-list").removeClass('code-list-hide');

    clrPanel();
    // for (var i = 0; i < arrSubCodeBranch.length; i++) {
    //     var getSubcode = parseInt($(arrSubCodeBranch[i][0]).attr("data-sub-code"))
    //     console.log("intObj " + intObj + " parseInt(arrSubCodeBranch[i]) " + parseInt($(arrSubCodeBranch[i][0]).attr("data-subcode-obj")))
    //     if (getSubcode === parseInt(intObj)) {
    //         console.log("removed")
    //         $(".code-list").removeClass('code-list-hide');
    //     }
    // }
    // intCodeBranch = intCodeBranch + 1;
    // var prevBranch =$(arrCodeBranch[intCodeBranch - 1]).attr("id")
    // var currBranch =$(arrCodeBranch[intCodeBranch]).attr("id")
    // //alert("prevBranch "+prevBranch+" currBranch "+currBranch);
    // if (intCodeBranch < arrCodeBranch.length) {
    //     $(arrCodeBranch[intCodeBranch - 1]).addClass('is-hidden');
    //     $("#"+prevBranch).velocity('transition.slideDownOut', { duration: 500, delay: 100 })
    //     $("#"+currBranch).velocity('transition.slideUpIn', { display:'table', duration: 600, delay: 605 })

    //     $(arrCodeBranch[intCodeBranch]).removeClass('is-hidden');

    // } else if (intCodeBranch === arrCodeBranch.length) {
    //     // $('[data-code-obj]').attr('disabled', true)
    // }
    console.log('dataObj ' + !isNaN(parseInt(dataObj)))
    console.log('intObj ' + intObj)
});


$('[dt-sub-code]').on('click', function() {
    if (!isNaN(parseInt(dataObj)) === true) {
        var testCode = $('[data-code-obj=' + parseInt(intObj) + ']').attr('data-code-obj')
        var subLbl = $.trim($('[dt-sub-code]').text());
        console.log('subLbl ' + subLbl);
        if (parseInt(testCode) === intObj) {
            console.log('again testCode ' + testCode);
            $('[data-code-obj="' + testCode + '"]').children('[sub-code-hdr]').removeClass('sub_code_reveal')
        }
        $(arrSubTabPanel[1]).children().children('[data-sel-hdr]').html(subLbl + ": " + arrCodeLbl[intObj - 1]);
        $(arrSubTabPanel[1]).children().children('[data-sel-descr]').html(arrSubCode[intObj - 1]);
    }
    // $(arrSubTabPanel[1]).html();
});

$('[dt-sub-usage]').on('click', function() {
    if (!isNaN(parseInt(dataObj)) === true) {
        var testUsage = $('[data-code-obj=' + parseInt(intObj) + ']').attr('data-code-obj')
        var subLbl = $.trim($('[dt-sub-usage]').text());
        console.log('subLbl ' + subLbl);
        if (parseInt(testUsage) === intObj) {
            console.log('again testUsage ' + testUsage);
            $('[data-code-obj="' + testUsage + '"]').children('[sub-usage-hdr]').removeClass('sub_code_reveal')
        }
        $(arrSubTabPanel[2]).children().children('[data-sel-hdr]').html(subLbl + ": " + arrCodeLbl[intObj - 1]);
        $(arrSubTabPanel[2]).children().children('[data-sel-descr]').html(arrSubUsage[intObj - 1]);
    }
    // $(arrSubTabPanel[2]).html();
});

$('[dt-sub-impact]').on('click', function() {
    if (!isNaN(parseInt(dataObj)) === true) {
        var testImpact = $('[data-code-obj=' + parseInt(intObj) + ']').attr('data-code-obj')
        var subLbl = $.trim($('[dt-sub-impact]').text());
        console.log('subLbl ' + subLbl);
        if (parseInt(testImpact) === intObj) {
            console.log('again testImpact ' + testImpact);
            $('[data-code-obj="' + testImpact + '"]').children('[sub-impact-hdr]').removeClass('sub_code_reveal')
        }
        $(arrSubTabPanel[3]).children().children('[data-sel-hdr]').html(subLbl + ": " + arrCodeLbl[intObj - 1]);
        $(arrSubTabPanel[3]).children().children('[data-sel-descr]').html(arrSubImpact[intObj - 1]);
    }
    // $(arrSubTabPanel[3]).html();
});

function clrPanel() {
    for (var i = 0; i < arrSubTabPanel.length; i++) {
        $(arrSubTabPanel[i]).removeClass('is-active');
        $(arrSubSel[i]).parent().removeClass('is-active');
        if (i > 0) {
            $(arrSubTabPanel[i]).children().children('[data-sel-hdr]').text('');
            $(arrSubTabPanel[i]).children().children('[data-sel-descr]').text('');
            $(arrSubTabPanel[i]).attr('aria-hidden',true);
        }
    }

    $('.t-instruct').text("Testing");
            $(arrSubTabPanel[0]).children().children('[data-sel-hdr]').text(strInstrHdr);
            $(arrSubTabPanel[0]).children().children('[data-sel-descr]').text(strInstrTxt);
            $(arrSubTabPanel[0]).removeAttr('aria-hidden');

    $(arrSubSel[0]).parent().addClass('is-active');
    $(arrSubTabPanel[0]).addClass('is-active');
}