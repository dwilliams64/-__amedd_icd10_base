//

var arDrgObj = [],
    arDrpObj = [],
    arDrpRsp = [],
    arTgtObj = [],
    arTgtNm = [],
    arGetTgt = [],
    drgCount = 0,
    dragSrc,
    strTarget,
    setTgt,
    objSelect;

$(document).ready(function drgDrp() {

    $('.is-draggable').each(function(idx_a) {
        // body...
        var thisObj = $(this);
        var thisObjData = $(this).html();

        if (idx_a <= 9) {
            thisObj.attr("id", "drg_obj_0" + parseInt(idx_a + 1));
        } else {
            thisObj.attr("id", "drg_obj_" + parseInt(idx_a + 1));
        }

        thisObj
            .draggable({
                containment: 'main',
                cursor: '-webkit-grab',
                cursor: '-moz-grab',
                revert: true,
                start: ui_dragStart
            });
        thisObj.css('z-index', '2')
            .attr('tabindex', 0);
        $(thisObj).on('keydown', function(t) {
            switch (t.keyCode) {
                case 9:
                    rmPopup();
                    break;
                case 32:
                    rmPopup();
                    keyDragDrop(t.keyCode, this.id)
                    break;
            }
        })
        arDrgObj.push(thisObj);

        $('[data-sort-rsp]').each(function(idx_x) {
            var thisResponse = $(this);
            var dataResponse = thisResponse.attr("data-sort-rsp");
            thisResponse.removeAttr("data-sort-rsp");
            arDrpRsp.push(dataResponse);
        })
    });

    $('[data-sort-id]').each(function(idx_b) {
        var thisObj = $(this);
        thisObj.attr("id", "" + thisObj.attr('data-sort-id'));
        var thisObjNm = thisObj.siblings('h4').text();
        arGetTgt.push(thisObj.attr('id'));
        arTgtNm.push(thisObjNm);
        arTgtObj.push([thisObj, thisObjNm]);
        $(thisObj).droppable({
            drop: objDropRsp,
            hoverClass: 'is-hovered'
        });

    })

    $("[data-drag-list]").attr("tabindex",0);
    $("[data-drag-list]").children().attr("tabindex",0)

});

function objDropRsp(event, ui) {
    dragSrc = $(dragSrc);
    var dragSrcID = $(dragSrc)
        .attr('id');
    var drgParent = $(dragSrc).parent();
    var parentID = $(drgParent).attr('id')
    var strTempId = this.id;
    var intChoice = parseInt(dragSrcID.substring(dragSrcID.length - 2, dragSrcID.length));
    var intDrop = parseInt(strTempId.substring(strTempId.length - 2, strTempId.length));
    if (parseInt(arDrpRsp[intChoice - 1]) === intDrop) {
        var classList = "" + document.getElementById(dragSrcID).className.split(/\s+/);
        classList = classList.replace(/,/g, ' ')
        var newLI = parent.createElem("li");
        $(newLI).addClass(classList)
        $(newLI).html(arDrgObj[intChoice - 1].html())
        // $("#" + intDrop).css("left", "0px")
        // $("#" + intDrop).css("top", "0px")
        if($("#" + intDrop).children().hasClass("is-empty"))
        {
            $("#" + intDrop+" .is-empty").remove();
        }
        document.getElementById("" + intDrop).appendChild(newLI);
        $("#" + dragSrcID).remove();
        drgCount = drgCount + 1;
        if (drgCount === arDrgObj.length) {
            var completeLI = parent.createElem("li");
            $(completeLI)
                .html('Great Job!')
                .addClass('is-empty');
            document.getElementById("" + parentID).appendChild(completeLI);

        }
    } else {
        $(arDrgObj[intChoice - 1]).focus()
    }
}

function chkContent(a, b, c) {
    var intDrop = parseInt(b.substring(b.length - 2, b.length));
    var intChoice = parseInt(c.substring(c.length - 2, c.length));

    strTarget = a;
    if (parseInt(arDrpRsp[intChoice - 1]) === intDrop) {
        var classList = "" + document.getElementById(c).className.split(/\s+/);
        classList = classList.replace(/,/g, ' ')
        var newLI = parent.createElem("li");
        $(newLI).addClass(classList)
        $(newLI).html(arDrgObj[intChoice - 1].html())
        // $("#" + intDrop).css("left", "0px")
        // $("#" + intDrop).css("top", "0px")
        if($("#" + intDrop).children().hasClass("is-empty"))
        {
            $("#" + intDrop+" .is-empty").remove();
        }
        document.getElementById("" + intDrop).appendChild(newLI);
        $("#" + c).remove();
        drgCount = drgCount + 1;
        if (drgCount === arDrgObj.length) {
            var completeLI = parent.createElem("li");
            $(completeLI)
                .html('Great Job!')
                .addClass('is-empty');
            document.getElementById("" + parentID).appendChild(completeLI);

        }
    } else {
        $(arDrgObj[intChoice - 1]).focus()
    }
    rmPopup();
}

function keyDragDrop(e, i) {
    var x = e;
    if (!$('.js-data-popup').length > 0 || $('.js-data-popup').length === undefined) {
    } else if ($('.js-data-popup').length > 0) {
        rmPopup();
    }
    $("#" + i).append(mkPopup())

    objSelect = $(".js-data-popup li").first()
    // $(objSelect).css("background-color", "black")
    objSelect.focus();
}

function rmPopup() {
    $('.js-data-popup').remove();
}

function mkPopup() {
    var optMenu = parent.createElem("ul");
    $(optMenu).addClass("js-data-popup")
    for (var i = 0; i < arTgtNm.length; i++) {
        var optListItem = parent.createElem('li')
        $(optMenu).append(optListItem)
        $(optListItem).text('' + arTgtNm[i])
            .attr('tabindex', 0)
            .attr('id', 'list_0' + parseInt(i + 1));

        $(optListItem).on('keydown', function(k) {
            switch (k.keyCode) {
                case 9:
                    rmPopup();
                    break;
                case 13:
                    var testtext = $(this).text()
                    var parentId = $(this).parent().parent().attr('id')
                    chkContent(testtext, this.id, parentId);
                    break;
                case 38: // up
                if($(objSelect).prev()){
                    objSelect = $(objSelect).prev()
                    $(objSelect).focus()
                }
                   break;
                case 40: // down
                if($(objSelect).next()){
                     objSelect = $(objSelect).next()
                    $(objSelect).focus()
                   
                }
                    break;
            }
        })

    }
    return optMenu;
}

function navlist(e, i) {

}
function getNode(objNode) {
    // Add event handlers
    objNode.onmousedown = drag.start;
    objNode.onclick = function() { this.focus(); };
    objNode.onkeydown = keyboardDragDrop;
    //document.body.onclick = removePopup;
}
