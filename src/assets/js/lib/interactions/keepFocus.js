function keepFocus(e) {
    if (e.keyCode === 9) {
        if ($(divFeedback).hasClass("is-open")) {
            $('[data-q-button]').focus()
            e.preventDefault();
        }
    }
}