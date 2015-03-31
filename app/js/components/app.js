var virt = require("virt"),
    app = require("../app"),
    RouteStore = require("../stores/route_store");


var AppPrototype;


module.exports = App;


function App(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        render: null
    };

    this.onChange = function() {
        _this.__onChange();
    };
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

AppPrototype.displayName = "App";

AppPrototype.__onChange = function() {
    var render = app.views.getPage(RouteStore.getState());

    if (render) {
        this.setState({
            ctx: RouteStore.getContext(),
            render: render
        });
    } else {
        throw new Error("App onChange no page state found named " + RouteStore.getState());
    }
};

AppPrototype.componentDidMount = function() {
    RouteStore.addChangeListener(this.onChange);
};

AppPrototype.componentWillUnmount = function() {
    RouteStore.removeChangeListener(this.onChange);
};

AppPrototype.render = function() {
    if (this.state.render) {
        return (
            virt.createView("div", {
                className: "app"
            }, this.state.render(this.state.ctx))
        );
    } else {
        return (
            virt.createView("div", {
                className: "app"
            })
        );
    }
};
