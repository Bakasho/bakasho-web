var map = require("map");


var views = exports,

    pages = {},
    modals = {};


views.setPage = function(name, callback) {
    pages[name] = callback;
};

views.getPage = function(name) {
    return pages[name];
};

views.setModal = function(name, render, onClose) {
    modals[name] = {
        render: render,
        onClose: onClose
    };
};

views.mapModals = function(fn) {
    return map(modals, fn);
};
