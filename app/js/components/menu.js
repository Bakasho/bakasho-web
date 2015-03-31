var virt = require("virt"),
    propTypes = require("prop_types");


var MenuPrototype;


module.exports = Menu;


function Menu(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        opened: false
    };

    this.onClick = function(e) {
        return _this.__onClick(e);
    };
}
virt.Component.extend(Menu, "Menu");

MenuPrototype = Menu.prototype;

Menu.contextTypes = {
    i18n: propTypes.func.isRequired
};

MenuPrototype.__onClick = function(e) {

    e.preventDefault();

    this.setState({
        opened: !this.state.opened
    });
};

MenuPrototype.render = function() {
    var i18n = this.context.ctx.i18n,
        content = "";

    if (this.state.opened === true) {
        content = (
            virt.createView("div", {
                    key: "content",
                    className: "content"
                },
                virt.createView("ul", {
                        className: "nav"
                    },
                    virt.createView("li", {
                            className: "item"
                        },
                        virt.createView("a", null,
                            i18n("home.menu.home")
                        )
                    ),
                    virt.createView("li", {
                            className: "item"
                        },
                        virt.createView("a", null,
                            i18n("home.menu.projects")
                        )
                    )
                )
            )
        );
    }

    return (
        virt.createView("div", {
                className: "menu"
            },
            virt.createView("a", {
                    key: "button",
                    className: "button",
                    onClick: this.onClick
                },
                virt.createView("img", {
                    className: "button-img",
                    src: "img/menu.png"
                })
            ),
            content
        )
    );
};
