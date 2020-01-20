
var dragSrc;

/*-- Drag & Drob Functions --*/
function dragStart(e) {
    $(this)
        .css('opacity', '0.4');

    dragSrc = $(this);

    e.dataTransfer.effectAllowed = 'move';
    /*e.dataTransfer.setData('text/html', this.innerHTML);*/
    /*Empty Transfer: Firefox requires data transfer for drag*/
}

function ui_dragStart(event, ui) {
    /*$(this)
        .css('opacity', '0.4')*/
    dragSrc = $(this);
}

function ui_drop(event, ui) {
    var draggable = ui.draggable;
    //alert('The square with ID "' + draggable.attr('id') + '" was dropped onto me!');
}

function dragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); /* Necessary. Allow drop.*/
    }

    e.dataTransfer.dropEffect = 'move'; /*See the section on the DataTransfer object.*/
    return false;
}

function objOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    /*this  e.target is the current hover target.
  doDropBox.classList.add('over');*/
}

function dragLeave(e) {
    /*this.classList.remove('over');  // this / e.target is previous target element.*/
}

function drop(e) {
    /*this / e.target is current target element.*/

    if (e.stopPropagation) {
        e.stopPropagation(); /*// stops the browser from redirecting.*/
    }

    this.preventDefault();
    if (e.target == doDropBox) {} else {}

    e.dataTransfer.setData();

    /*See the section on the DataTransfer object.*/
    return false;
}
