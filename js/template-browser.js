
// @codekit-prepend "vendor/backbone.marionette/backbone.marionette.js";

// Models
// @codekit-prepend "src/models.js";

// Views
// @codekit-prepend "src/view-sidebar.js";
// @codekit-prepend "src/view-root.js";
// @codekit-prepend "src/view-screen-collection.js";
// @codekit-prepend "src/view-screen-template.js";
// @codekit-prepend "src/view-screen-library-setup.js";
// @codekit-prepend "src/view-screen-library.js";
// @codekit-prepend "src/view-screen-import-template.js";

// Main Application Controller
// @codekit-prepend "src/controller-app.js";

(function($){

    $(function(){
        brj.store.app = new brj.store.controllers.App();
        brj.store.app.start();
    });
})(jQuery);

// Reference for later
// Actions from current template browser
/*
$('body').delegate('.fl-template-category-select', 'change', FLBuilder._templateCategoryChanged);
$('body').delegate('.fl-template-preview', 'click', FLBuilder._templateClicked);
$('body').delegate('.fl-user-template', 'click', FLBuilder._userTemplateClicked);
$('body').delegate('.fl-user-template-edit', 'click', FLBuilder._editUserTemplateClicked);
$('body').delegate('.fl-user-template-delete', 'click', FLBuilder._deleteUserTemplateClicked);
$('body').delegate('.fl-builder-template-replace-button', 'click', FLBuilder._templateReplaceClicked);
$('body').delegate('.fl-builder-template-append-button', 'click', FLBuilder._templateAppendClicked);
$('body').delegate('.fl-builder-template-actions .fl-builder-cancel-button', 'click', FLBuilder._templateCancelClicked);

// User Template Settings
$('body').delegate('.fl-builder-user-template-settings .fl-builder-settings-save', 'click', FLBuilder._saveUserTemplateSettings);
*/
