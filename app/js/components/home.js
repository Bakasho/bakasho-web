var virt = require("virt"),
    propTypes = require("prop_types"),
    Mission = require("./mission"),
    Footer = require("./footer"),
    BackGroundImg = require("./background_img");


var HomePrototype;


module.exports = Home;


function Home(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Home, "Home");

HomePrototype = Home.prototype;

Home.contextTypes = {
    i18n: propTypes.func.isRequired
};

HomePrototype.render = function() {
    var i18n = this.context.i18n;

    return (
        virt.createView("div", {
                className: "home"
            },
            virt.createView(BackGroundImg, {
                src: "img/bg01.png"
            }),
            virt.createView("div", {
                    className: "header text-center"
                },
                virt.createView("img", {
                    src: "img/logo_shadow.png"
                }),
                virt.createView("h2",
                    i18n("home.description")
                ),
                virt.createView("p",
                    i18n("home.slogan")
                ),
                virt.createView("a", {
                        className: "btn contact",
                        target: "_blank",
                        href: "mailto:john.faucett@bakasho.com"
                    },
                    i18n("home.contact")
                )
            ),
            virt.createView(Mission),
            virt.createView(Footer)
        )
    );
};
