
// @codekit-prepend "vendor/backbone.marionette/backbone.marionette.js";
// @codekit-prepend "src/brj.js";

// Models
// @codekit-prepend "src/models.js";

// Views
// @codekit-prepend "src/view-sidebar.js";
// @codekit-prepend "src/view-root.js";
// @codekit-prepend "src/view-screen-collection.js";
// @codekit-prepend "src/view-screen-template.js";
// @codekit-prepend "src/view-screen-library-setup.js";
// @codekit-prepend "src/view-screen-library.js";

// Main Application Controller
// @codekit-prepend "src/controller-app.js";

(function($){

    // DOM Ready
    $(function(){
        brj.store.app = new brj.store.controllers.App();
        brj.store.app.start();
    });
})(jQuery);
