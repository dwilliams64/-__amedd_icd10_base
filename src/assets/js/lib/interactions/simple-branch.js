// Flow chart
// Add class to new element and change aria attributes
var arrBranch = [];
var intBranch = 0;

$(document)
    .ready(function getBranch() {
        $('[data-branch]')
            .each(function(idx_a) {
                var thisBranch = $(this);
                if (idx_a < 9) {
                    thisBranch.attr("id", "branch_0" + (idx_a + 1))
                } else {
                    thisBranch.attr("id", "branch_" + (idx_a + 1))
                }
                arrBranch.push(thisBranch);
            });
    });

$(document).on('click', '[data-branch-btn]', function() {
    intBranch = intBranch + 1;
    var prevBranch =$(arrBranch[intBranch - 1]).attr("id")
    var currBranch =$(arrBranch[intBranch]).attr("id")
    //alert("prevBranch "+prevBranch+" currBranch "+currBranch);
    if (intBranch < arrBranch.length) {
        $(arrBranch[intBranch - 1]).addClass('is-hidden');
        $("#"+prevBranch).velocity('transition.slideDownOut', { duration: 500, delay: 100 })
        $("#"+currBranch).velocity('transition.slideUpIn', { display:'table', duration: 600, delay: 605 })

        $(arrBranch[intBranch]).removeClass('is-hidden');

    } else if (intBranch === arrBranch.length) {
        $('[data-branch-btn]').attr('disabled', true)
    }
});
