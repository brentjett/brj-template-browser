(function($){
    brj.store.views.Root = Marionette.LayoutView.extend({
        el: '#brj-store-modal-root',
        template: 'brj-store-root-view',
        regions: {
            sidebar: '.sidebar-area',
            detail: '.detail-area',
            templateDrop: '.drop-area'
        },
        ui: {
            mask: '.fl-lightbox-mask'
        },
        events: {
            'click @ui.mask' : 'onOutsideClick',
            'dragenter' : 'onDragEnter'
        },
        detailViews: [],
        onRender: function() {

            this.sidebarView = new brj.store.views.Sidebar();
            this.sidebarView.parentView = this;
            this.getRegion('sidebar').show(this.sidebarView);

            this.dropAreaView = new brj.store.views.screens.ImportTemplate();
            this.getRegion('templateDrop').show(this.dropAreaView);
        },
        onOutsideClick: function(event) {
            brj.store.app.dismissPanel();
        },
        showDetailView: function(view) {
            this.getRegion('detail').show(view, {preventDestroy: true});
        },
        setDetailView: function(view) {
            if (view !== undefined) {
                var region = this.getRegion('detail');
                // reset the detailViews array
                this.detailViews = [view];
                this.showDetailView(view);
            }
        },
        addDetailView: function(view) {
            if (view !== undefined) {
                var lastView = this.getRegion('detail').currentView;
                this.detailViews.push(lastView);
                this.showDetailView(view);
            }
        },
        popDetailView: function() {
            var view = this.detailViews.pop();
            if (view !== undefined) {
                this.showDetailView(view);
            }
        },

        onDragEnter: function() {
            console.log('pane: on drag enter');
        }
    });
})(jQuery);
