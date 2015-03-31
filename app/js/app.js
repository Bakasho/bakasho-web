var virt = require("virt"),
    virtDOM = require("virt_dom"),
    page = require("page"),
    i18n = require("i18n"),
    request = require("request"),
    layers = require("layers_browser"),
    state = require("./state"),
    dispatcher = require("./dispatcher"),
    config = require("./config"),

    RouteStore = require("./stores/route_store"),
    UserStore = require("./stores/user_store");


var app = global.app = exports;


app.router = new layers.Router();
app.state = state;
app.dispatcher = dispatcher;
app.config = config;

app.i18n = require("./utils/i18n");
app.views = require("./utils/views");

app.page = page;
app.node = null;

app.toJSON = function() {
    return state.toJSON();
};

app.fromJSON = function(json) {
    state.fromJSON(json);
    page.go(json.RouteStore.context.fullUrl.path);
};

app.init = function() {
    var App = require("./components/app");

    request.defaults.headers["Content-Type"] = "application/json";
    request.defaults.withCredentials = true;

    app.node = document.getElementById("app");

    page.on("request", function onRequest(ctx) {
        dispatcher.handleViewAction({
            actionType: RouteStore.consts.ROUTE_CHANGE,
            ctx: ctx
        });
    });

    UserStore.on("changeLocale", function onChangeLocale() {
        page.reload();
    });

    i18n.flatMode(config.flatLocaleMode);
    i18n.throwMissingError(config.throwMissingTranslationError);
    page.html5Mode(config.html5Mode);

    page.init();

    virtDOM(virt.createView(App), app.node);
};


require("./routes");
require("./views");
