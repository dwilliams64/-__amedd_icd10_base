$(document).ready(function() {
    parent.getProgress();
    setTimeout(function() {
        if (parent.blnRemediate) {
            var divRemed = parent.createElem("div");
            $(divRemed).addClass("c-remediation-bar")
                .attr('data-closable','');
            var aRemed = parent.createElem("a");
            $(aRemed).attr("href", "javascript:parent.setFrm('" + parent.strPgRemed + "');javascript:window.top.strCurrentPage='" + parent.strPgRemed + "'")
                .text("Return to Course Completion Page");
            var btnRemed = parent.createElem("button");
            $(btnRemed).addClass("o-close-btn o-close-btn--white")
                .attr("aria-label", "Close alert")
                .attr("type", "button")
                .attr('data-close','');
            var sRemed = parent.createElem("span");
            $(sRemed).attr("aria-hidden", "true")
                .html("&times;");
            $(btnRemed).append(sRemed);
            $(divRemed).append(aRemed)
                .append(btnRemed);
            $('.l-course-wrap').append(divRemed);
            parent.blnRemediate=false;
        }
    }, 500);

  if ($('#js-dnd-inst').length>0) {
    var popup = new Foundation.Reveal($('#js-dnd-inst'));
    popup.open();
  }

});
