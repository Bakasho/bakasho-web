var virt = require("virt"),
    virtDOM = require("virt-dom"),
    propTypes = require("prop_types"),
    eventListener = require("event_listener");


var MissionPrototype;


module.exports = Mission;


function Mission(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.onResize = function(e) {
        return _this.__onResize(e);
    };
}
virt.Component.extend(Mission, "Mission");

MissionPrototype = Mission.prototype;

Mission.contextTypes = {
    i18n: propTypes.func.isRequired
};

MissionPrototype.componentDidMount = function() {
        eventListener.on(window, "resize", this.onResize);
        this.onResize();
    },

    MissionPrototype.componentWillUnmount = function() {
        eventListener.off(window, "resize", this.onResize);
    },

    MissionPrototype.__onResize = function() {
        var node = virtDOM.findDOMNode(this);

        node.style.marginTop = "0px";
        node.style.marginTop = (window.innerHeight - node.offsetTop) + "px";
    },

    MissionPrototype.render = function() {
        var i18n = this.context.i18n;

        return (
            virt.createView("div", {
                    className: "mission grid col-12"
                },
                virt.createView("div", {
                        className: 'missionInner grid col-8 push-2'
                    },
                    virt.createView("h1", {
                        className: "title"
                    }, i18n("mission.header")),
                    virt.createView("p", {
                        className: "content"
                    }, i18n("mission.statement_intro")),
                    virt.createView("p", {
                        className: "content"
                    }, i18n("mission.statement_p1")),
                    virt.createView("p", {
                        className: "content"
                    }, i18n("mission.statement_p2")),
                    virt.createView("p", {
                        className: "content"
                    }, i18n("mission.statement_p3"))
                )
            )
        );
    };
