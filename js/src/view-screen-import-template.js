(function($){
    brj.store.views.screens.ImportTemplate = Marionette.LayoutView.extend({
        template: 'brj-store-import-template-view',
        className: 'brj-store-screen brj-store-screen-type-import-template',
        ui: {},
        /*
        events: {
            'dragenter' : 'onDragEnter',
            'dragleave' : 'onDragLeave'
        },
        onDragEnter: function(event) {
            this.$el.addClass('show-drop-zone');
        },
        onDragLeave: function(event) {
            this.$el.removeClass('show-drop-zone');
        }
        */
    });
})(jQuery);
