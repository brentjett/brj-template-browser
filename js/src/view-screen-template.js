(function($){
    brj.store.views.screens.Template = Marionette.LayoutView.extend({
        template: 'brj-store-single-template-view',
        className: 'brj-store-screen brj-store-screen-type-single-template',
        id: function() {
            return 'brj-screen-' + this.model.get('name');
        },
        ui: {
            backBtn: '.pop-detail-view',
            actionBtn: '.template-actions .brj-simple-button',
            downloadBtn: '[data-action="download"]',
            editBtn: '[data-action="edit"]',
            thumbnail: '.template-thumbnail',
            name: '.template-name'
        },
        events: {
            'click @ui.backBtn' : 'onDismissScreen',
            'click @ui.actionBtn' : 'onClickTemplateAction',
            'dragstart @ui.thumbnail' : 'onDragThumbnail',
            'keyup @ui.name' : 'onEditName',
        },
        serializeData: function() {
            var data = this.model.toJSON();
            data.actions = {};
            data.actions.replace = "Replace Existing Layout";
            if (data.handle !== 0) {
                data.actions.append = "Append to Existing Layout";
            }
            if (this.model.is_editable()) {
                data.actions.edit = "Edit Template";
            }

            data.actions.download = "Download Template";

            if (this.model.is_deletable()) {
                data.actions.delete = "Delete Template";
            }
            return data;
        },
        onRender: function() {

            // Setup download button
            if (this.ui.downloadBtn) {
                var label = this.model.get('label');
                var filename = label + '.json';
                var href = this.model.getURL();
                var button = $(this.ui.downloadBtn);
                button.prop('download', filename);
                button.prop('href', href);
            }
        },
        onDismissScreen: function(event) {
            brj.store.app.rootView.popDetailView();
        },
        onClickTemplateAction: function(event) {
            var action = $(event.target).data('action');
            var id = this.model.get('handle');
            if (action === 'replace' || action === 'append') {
                if (action === 'replace') {
                    var append = false;
                } else {
                    var append = true;
                }
                brj.store.app.dismissPanel();
                FLBuilder._applyTemplate(id, append, this.model.get('type'));
                event.preventDefault();
            }

            if (action === 'edit') {
                var href = this.model.get('edit_link');
                window.open(href);
            }

            if (action === 'delete') {
                var view = this;
                FLBuilder.ajax( {
					action: 'fl_builder_save',
					method: 'delete_user_template',
					template_id: view.model.get('handle')
				}).done(function(data) {
                    view.collection.remove(view.model);
                    brj.store.app.rootView.popDetailView();
                });
                event.preventDefault();
            }
        },
        onDragThumbnail: function(event) {
            var label = this.model.get('label');
            var filename = label + '.json';
            var url = "application/octet-stream:" + filename + ":" + this.model.url();
            event.originalEvent.dataTransfer.setData("DownloadURL", url);
        },
        onEditName: function(event) {
            var name = $(this.ui.name).val();
            console.log('edited name', name);
            this.model.set('label', name);
            console.log('about to save title');
            this.model.save().then(function(data) {
                console.log('saved name', data);
            });
        }
    });
})(jQuery);
