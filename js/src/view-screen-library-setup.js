(function($){
    brj.store.views.screens.NewLibrary = Marionette.LayoutView.extend({
        template: 'brj-store-setup-library-view',
        className: 'brj-store-screen brj-store-screen-type-add-library',
        ui: {
            urlInput: 'input[name="store-url"]'
        },
        events: {
            'change @ui.urlInput' : 'onChangeURL'
        },
        onChangeURL: function(event) {
            var url = $(event.target).val();
            this.model.set('url', url);
            this.model.set('label', 'Loading...');

            var view = new brj.store.views.screens.Library({model: this.model});
            brj.store.app.rootView.setDetailView(view);
        }
    });
})(jQuery);
