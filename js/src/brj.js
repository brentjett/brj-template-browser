
window.Marionette = Backbone.Marionette;
window.brj = window.brj || {};
brj.store = {
    models: {},
    collections: {},
    views: {
        screens: {},
        collections: {},
        items: {}
    },
    controllers: {}
};

// Switch to wp.template renderer
Marionette.Renderer.render = function(template, data){
    var renderer = wp.template(template);
    return renderer(data);
};
