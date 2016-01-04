(function($){

    brj.store.views.items.SidebarItem = Marionette.ItemView.extend({
        className: 'brj-sidebar-item',
        ui: {
            deleteBtn: '.delete-item'
        },
        events: {
            'click' : 'onClick',
            'click @ui.deleteBtn' : 'onClickDelete',
            'dragenter' : 'onDragEnter',
            'dragover' : 'onDragOver',
            'dragleave' : 'onDragLeave',
            'drop' : 'onDrop'
        },
        modelEvents: {
            'change:label' : 'onTitleChanged'
        },
        onClick: function() {
            this.activate();
        },
        activate: function() {
            $('.brj-sidebar-item.active').removeClass('active');
            this.$el.addClass('active');
            var view = this.getDetailView();
            brj.store.app.rootView.setDetailView(view);
        },
        onTitleChanged: function(event) {
            this.render();
        },
        onClickDelete: function(event) {
            //@todo: loop over templates in collection and remove from category.
            console.log('delete collection', this.model);
            this.$el.slideUp();
            this.model.destroy({wait: true}).then(function(data) {
                console.log('after destroy collection', data);
                //var savedCollection = brj.store.app.models.templateCollections.findWhere({handle: "saved"});
                //brj.store.app.rootView.setDetailView(view);
            });
        },

        /**
        * Drag / Drop Handlers
        */
        onDragEnter: function(event) {
            var template = brj.store.app.draggedTemplate;
            if (this.model.get('is_editable') && !this.model.contains(template)) {
                this.$el.addClass('drop-zone');
                event.originalEvent.dataTransfer.dropEffect = 'copy';
            } else {
                event.originalEvent.dataTransfer.dropEffect = 'none';
                console.log('collection is either not editable or already contains template');
            }
        },
        onDragOver: function(event) {
            // This is required to observe drop.
            event.preventDefault();
        },
        onDragLeave: function(event) {
            this.$el.removeClass('drop-zone');
        },
        onDrop: function(event) {
            this.$el.removeClass('drop-zone');

            var model = brj.store.app.draggedTemplate;
            brj.store.app.draggedTemplate = null;
            this.model.addTemplate(model);
        }
    });

    // "Template Collection" Item View
    brj.store.views.items.TemplateCollection = brj.store.views.items.SidebarItem.extend({
        template: 'brj-store-template-collection-sidebar-item-view',
        className: 'brj-sidebar-item',
        getDetailView: function() {

            // If already has a detail view, return
            if (this.detailView) { return this.detailView; }

            // If has a prepared collection
            /*
            if (this.model.has('collection')) {
                var collection = this.model.get('collection');
                this.detailView = new brj.store.views.screens.Collection({model: this.model});
            }
            */
            this.detailView = new brj.store.views.screens.Collection({model: this.model});
            return this.detailView;
        }
    });

    // "Template Collection" Collection View
    brj.store.views.collections.TemplateCollections = Marionette.CollectionView.extend({
        childView: brj.store.views.items.TemplateCollection,
        class: 'brj-sidebar-item-collection'
    });



    // Library Item View
    brj.store.views.items.Library = brj.store.views.items.SidebarItem.extend({
        template: 'brj-store-template-collection-sidebar-item-view',
        className: 'brj-sidebar-item brj-library-item',
        activate: function() {
            $('.brj-sidebar-item.active').removeClass('active');
            this.$el.addClass('active');
            var view = this.getDetailView();
            brj.store.app.rootView.setDetailView(view);
        },
        getDetailView: function() {
            if (this.model.has('url')) {
                // store view
                this.detailView = new brj.store.views.screens.Library({model: this.model});
                console.log('show store view', this.model.get('url'));
            } else {
                this.detailView = new brj.store.views.screens.NewLibrary({model: this.model});
                console.log('show library setup view', this.model);
            }
            return this.detailView;
        }
    });

    // Libraries Collection View
    brj.store.views.collections.Libraries = Marionette.CollectionView.extend({
        childView: brj.store.views.items.Library,
        class: 'brj-sidebar-item-collection'
    });



    // Sidebar View
    brj.store.views.Sidebar = Marionette.LayoutView.extend({
        template: 'brj-store-sidebar-view',
        regions: {
            collections: '.collection-region',
            libraries: '.libraries-region'
        },
        ui: {
            dismissBtn: '.dismiss-panel-trigger',
            newCollectionBtn: '.new-collection-item',
            newLibraryBtn: '.new-library-item',
            item: '.brj-sidebar-item'
        },
        events: {
            'click @ui.dismissBtn' : 'onDismissPanel',
            'click @ui.item' : 'onSelectItem',
            'click @ui.newCollectionBtn' : 'onNewCollectionClick',
            'click @ui.newLibraryBtn' : 'onNewLibraryClick'
        },
        onRender: function() {
            // Setup Collections Views
            this.templateCollections = brj.store.app.models.templateCollections;
            this.templateCollectionsView = new brj.store.views.collections.TemplateCollections({collection: this.templateCollections });
            this.getRegion('collections').show(this.templateCollectionsView);

            // Setup Libraries Views
            this.libraries = brj.store.app.models.libraries;
            this.librariesView = new brj.store.views.collections.Libraries({collection: this.libraries});
            this.getRegion('libraries').show(this.librariesView);
        },
        onShow: function() {
            // Activate and show the first collection's view.
            var firstCollectionView = this.templateCollectionsView.children.findByIndex(0);
            if (firstCollectionView !== undefined) {
                firstCollectionView.activate();
            }
        },
        onDismissPanel: function() {
            brj.store.app.dismissPanel();
        },
        onNewCollectionClick: function() {
            var collection = new brj.store.models.TemplateCollection({
                label: "New Collection"
            });
            //collection.initCollection();
            collection.save().then(function(data) {
                console.log('after save', data);
            });
            this.templateCollections.add(collection);
            console.log('new collection click', collection);
        },
        onNewLibraryClick: function() {
            var library = new brj.store.models.Library({
                label: "Setup Library",
                is_editable: true
            });
            this.libraries.add(library);
            console.log('new library', library);
        }
    });
})(jQuery);
