(function($){
    brj.store.views.screens.Library = Marionette.LayoutView.extend({
        template: 'brj-store-library-view',
        className: 'brj-store-screen brj-store-screen-type-library',
        regions: {
            content: '.detail-content'
        },
        ui: {},
        onRender: function() {
            console.log('render library', this.model);
            //var view = new brj.store.views.collections.Templates({collection: this.model.get('collection') });
            //this.getRegion('content').show(view);
        }
    });

    /*
    brj.store.views.items.Template = Marionette.ItemView.extend({
        template: 'brj-store-template-item-view',
        className: 'detail-item detail-template-item',
        ui: {
            thumbnail: ".template-item-thumbnail",
            label: ".template-item-title"
        },
        events: {
            'click @ui.thumbnail' : 'onClickItem',
            'click @ui.label' : 'onClickItem',
            'dragstart @ui.thumbnail' : 'onDragThumbnail',
        },
        modelEvents: {
            'change:label' : 'render'
        },
        onClickItem: function(event) {
            if (this.model.is_blank()) {
                if (confirm("Are you sure you want to reset your layout?")) {
                    brj.store.app.dismissPanel();
                    FLBuilder._applyTemplate(0, false, 'core');
                }
                return;
            }
            var view = new brj.store.views.screens.Template({model: this.model});
            brj.store.app.rootView.addDetailView(view);
        },
        onDragThumbnail: function(event) {

            // Pass template to collection (drop zone)
            brj.store.app.draggedTemplate = this.model;

            // Handle Drag-to-download
            var label = this.model.get('label');
            var filename = label + '.json';
            var url = "application/octet-stream:" + filename + ":" + document.location.origin + this.model.url();
            event.originalEvent.dataTransfer.setData("DownloadURL", url);
        },
        onLabelChanged: function(event) {
            console.log('item label changed', label);
            this.render();
        }
    });

    brj.store.views.NoTemplates = Marionette.ItemView.extend({
        template: 'brj-store-template-no-templates-view',
        className: 'brj-no-templates'
    });

    brj.store.views.collections.Templates = Marionette.CollectionView.extend({
        childView: brj.store.views.items.Template,
        emptyView: brj.store.views.NoTemplates,
        className: 'detail-item-row'
    });
    */
})(jQuery);
