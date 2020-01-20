'use strict';
$(document).ready(function disclaimer() {
    var pgTitle = $('title').text();
    $('a').each(function() {
        var links = $(this);

        if (links.attr('target') === '_blank') {

            if (link_is_external(links)) {
                // External
                links.click(function(event) {
                    alert('You are now leaving the course titled: ' + pgTitle + '. The appearance of hyperlinks does not constitute endorsement by the SCMS of this web site or the information, products or services contained therein. The content manager of this Online Learning Module and SCMS do not exercise any editorial control over the information you may find at these locations. Such links are consistent with the stated purpose of this SCMS Internet/Intranet service.');
                })
                links.keydown(function(event) {
                    alert('You are now leaving the course titled: ' + pgTitle + '. The appearance of hyperlinks does not constitute endorsement by the SCMS of this web site or the information, products or services contained therein. The content manager of this Online Learning Module and SCMS do not exercise any editorial control over the information you may find at these locations. Such links are consistent with the stated purpose of this SCMS Internet/Intranet service.');
                })
            } else {
                links.click(function(event) {
                    alert('You are now leaving the course titled: ' + pgTitle + '. The content manager of this Online Learning Module does not exercise any editorial control over the information you may find at these locations. Such links are consistent with the stated purpose of this SCMS Internet/Intranet service.');
                })
                links.keydown(function(event) {
                    alert('You are now leaving the course titled: ' + pgTitle + '. The content manager of this Online Learning Module does not exercise any editorial control over the information you may find at these locations. Such links are consistent with the stated purpose of this SCMS Internet/Intranet service.');
                })
            }
        }
    });

    $('a[href$=".pdf"]').each(function() {
        var linkPDF = $(this);
        if (linkPDF) {
            linkPDF.click(function(event) {
                if (!confirm('You are opening an Adobe Acrobat PDF document. It can be viewed in your browser or by using applications that will allow you to view Adobe Acrobat PDF files.'));
            })

            linkPDF.keydown(function(event) {
                if (!confirm('You are opening an Adobe Acrobat PDF document. It can be viewed in your browser or by using applications that will allow you to view Adobe Acrobat PDF files.'));
            })
        }
    });
});

function link_is_external(link_element) {
    return link_element.host !== window.location.host;
}