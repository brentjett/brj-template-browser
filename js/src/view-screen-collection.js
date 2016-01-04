(function($){
    brj.store.views.screens.Collection = Marionette.LayoutView.extend({
        template: 'brj-store-templates-view',
        className: 'brj-store-screen brj-store-screen-type-collection',
        regions: {
            content: '.detail-content'
        },
        ui: {
            title: '.detail-title'
        },
        events: {
            'keyup @ui.title' : 'onTitleChange',
            'blur @ui.title' : 'afterTitleChanged'
        },
        onRender: function() {
            var view = new brj.store.views.collections.Templates({collection: this.model.get('collection') });
            this.getRegion('content').show(view);
        },
        onTitleChange: function(event) {
            var title = $(this.ui.title).val();
            this.model.set('label', title);

        },
        afterTitleChanged: function(event) {
            console.log('collection before save', this.model.url());
            this.model.save().then(function(data) {
                console.log('title saved', data);
            });
        }
    });

    brj.store.views.items.Template = Marionette.ItemView.extend({
        template: 'brj-store-template-item-view',
        className: 'detail-item detail-template-item',
        ui: {
            thumbnail: ".template-item-thumbnail",
            label: ".template-item-title",
            content: '.detail-content'
        },
        events: {
            'click @ui.thumbnail' : 'onClickItem',
            'click @ui.label' : 'onClickItem',
            'dragstart @ui.thumbnail' : 'onDragThumbnail',

            /* Handle drag/drop import */
            'dragenter @ui.content' : 'onDragEnter',
            'dragover @ui.content' : 'onDragOver',
            'dragleave @ui.content' : 'onDragLeave',
            'drop @ui.content' : 'onDrop'
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
        },

        onDragEnter: function() {
            console.log('drag enter');
            // IF EDITABLE COLLECTION
            this.$el.addClass('drop-zone');
        },
        onDragOver: function() {
            // This is required to observe drop.
            event.preventDefault();
        },
        onDragLeave: function() {
            console.log('drag leave');
        },
        onDrop: function() {
            console.log('drop');
        },
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
})(jQuery);
