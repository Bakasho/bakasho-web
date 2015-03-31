var virt = require("virt"),
    propTypes = require("prop_types");


var BackGroundImgPrototype;


module.exports = BackGroundImg;


function BackGroundImg(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(BackGroundImg, "BackGroundImg");

BackGroundImg.propTypes = {
    src: propTypes.string.isRequired
};

BackGroundImgPrototype = BackGroundImg.prototype;

BackGroundImgPrototype.render = function() {
    return (
        virt.createView("div", {
                className: "bg"
            },
            virt.createView("img", {
                className: "bg-img",
                src: this.props.src
            })
        )
    );
};
