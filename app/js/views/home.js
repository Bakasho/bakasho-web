var virt = require("virt"),
    app = require("../app"),
    Home = require("../components/home"),
    LayoutApp = require("../components/layouts/layout_app");


app.views.setPage("home", function(ctx) {
    return (
        virt.createView(LayoutApp, {
            ctx: ctx,
            i18n: app.i18n,
            render: function() {
                return (
                    virt.createView(Home)
                );
            }
        })
    );
});
