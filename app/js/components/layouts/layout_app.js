var virt = require("virt"),
    propTypes = require("prop_types");


var LayoutAppPrototype;


module.exports = LayoutApp;


function LayoutApp(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(LayoutApp, "LayoutApp");

LayoutAppPrototype = LayoutApp.prototype;

LayoutApp.propTypes = {
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired,
    render: propTypes.func.isRequired
};

LayoutApp.childContextTypes = {
    ctx: propTypes.object.isRequired,
    i18n: propTypes.func.isRequired
};

LayoutAppPrototype.displayName = "LayoutApp";

LayoutAppPrototype.getChildContext = function() {
    return {
        ctx: this.props.ctx,
        i18n: this.props.i18n
    };
};

LayoutAppPrototype.render = function() {
    return (
        virt.createView("div", {
                className: "layout"
            },
            virt.createView("div", {
                    className: "content"
                },
                this.props.render()
            )
        )
    );
};


module.exports = LayoutApp;
