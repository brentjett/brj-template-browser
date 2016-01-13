(function($){

    /**
    * Main Application Controller
    */
    brj.store.controllers.App = Marionette.Application.extend({
        views: {},
        rootView: {},
        models: {
            templateCollections: {},
            preparedCollections: {}
        },
        onStart: function() {
            this.initModels();
            this.initViews();

            // Override if blank show template browser.
            FLBuilder._initTemplateSelector = function() {
    			var rows = $(FLBuilder._contentClass).find('.fl-row');

    			if(rows.length === 0) {
                    brj.store.app.displayPanel();
    			}
    		};
        },
        initModels: function() {

            this.models.libraries = new brj.store.collections.Libraries(BRJ_StoreInitialData.libraries);

            // Populate Template Collections
            this.models.templateCollections = new brj.store.collections.TemplateCollections(BRJ_StoreInitialData.collections);

            // Fetch Templates
            this.models.templates = new brj.store.collections.Templates();
            this.models.templates.fetch().then(function(data) {

                // Populate Each Collection with Templates
                brj.store.app.models.templateCollections.forEach(function(collection) {
                    var handle = collection.get('handle');
                    var templates = [];

                    switch (handle) {
                        case 'landing':
                            templates = brj.store.app.models.templates.whereInCollection('landing');
                            break;
                        case 'saved':
                        var blank = brj.store.app.models.templates.findWhere({handle: 0});
                        templates = [blank];
                        templates = templates.concat(brj.store.app.models.templates.whereInCollection('saved'));
                            break;
                        default:
                            templates = brj.store.app.models.templates.whereInCollection(handle);
                    }
                    collection.get('collection').add(templates);
                });
            });
        },
        initViews: function() {

            // setup panel
            this.rootView = new brj.store.views.Root();
            this.rootView.render();

            // Add Button to BB Toolbar.
            var html = '<span class="fl-builder-store-button fl-builder-button">Templates (demo)</span>';
            $('.fl-builder-templates-button').after(html);

            $('.fl-builder-store-button').on('click', this.displayPanel );
        },
        displayPanel: function() {
            $('body').toggleClass('brj-store-display-panel');
        },
        dismissPanel: function() {
            $('body').removeClass('brj-store-display-panel');
        }
    });
})(jQuery);
