(function($){

    brj.store.models.Base = Backbone.Model.extend(
		/** @lends WPApiBaseModel.prototype  */
		{
			/**
			 * Set nonce header before every Backbone sync.
			 *
			 * @param {string} method.
			 * @param {Backbone.Model} model.
			 * @param {{beforeSend}, *} options.
			 * @returns {*}.
			 */
			sync: function( method, model, options ) {
				options = options || {};

				if ( 'undefined' !== typeof WP_API_Settings.nonce ) {
					var beforeSend = options.beforeSend;

					options.beforeSend = function( xhr ) {
						xhr.setRequestHeader( 'X-WP-Nonce', WP_API_Settings.nonce );

						if ( beforeSend ) {
							return beforeSend.apply( this, arguments );
						}
					};
				}

				return Backbone.sync( method, model, options );
			}
		}
	);

    brj.store.collections.Base = Backbone.Collection.extend({});

    brj.store.models.Template = brj.store.models.Base.extend({
        idAttribute: 'handle',
        urlRoot: '/wp-json/brj-templates/v1/templates',
        defaults: {
            handle: null,
            label: "",
            description: "",
            author: {
                name: ""
            },
            modified: "",
            is_public: false,
            is_editable: false,
            screenshot: {
                thumbnail: "/wp-content/plugins/bb-experiments/brj-store/assets/default-screen-thumb.png"
            },
            layout: {},
            categories: []
        },
        is_editable: function() {
            if (this.has('edit_link') && this.get('is_editable') ) {
                return true;
            }
            return false;
        },
        is_deletable: function() {
            if (this.get('type') == 'user') return true;
            return false;
        },
        is_blank: function() {
            if (this.get('handle') === 0) return true;
            return false;
        },
        getURL: function() {
            return this.url();
        },
        addCategory: function(name) {
            var cats = this.get('categories');
            cats.push(name);
            this.set('categories', cats);
        },
        removeCategory: function(name) {
            var cats = this.get('categories');
            cats.remove(name);
            this.set('categories', cats);
        },
        resetHandle: function() {
            var handle = ((( 1 + Math.random() ) * 0x10000 ) | 0 ).toString(16).substring(1);
            this.set('handle', handle);
        }
    });

    brj.store.collections.Templates = brj.store.collections.Base.extend({
        url: '/wp-json/brj-templates/v1/templates',
        model: brj.store.models.Template,
        /**
        * Utility method for finding templates in a particular collection.
        */
        whereInCollection: function(name) {
            var models = this.filter(function(item) {
                if (name) {
                    var categories = item.get('categories');
                    var result = _.indexOf(categories, name);
                    if (result !== -1) return true;
                }
                return false;
            });
            return models;
        }
    });


    // Template Collections
    brj.store.models.TemplateCollection = brj.store.models.Base.extend({
        idAttribute: 'handle',
        urlRoot: '/wp-json/brj-templates/v1/collections',
        defaults: {
            label: "",
            collection: null,
            is_public: false,
            is_editable: true
        },
        initialize: function() {

            this.set('collection', new brj.store.collections.Templates());

            if (!this.has('handle')) {
                var handle = ((( 1 + Math.random() ) * 0x10000 ) | 0 ).toString(16).substring(1);
                this.set('handle', handle);
            }
        },
        /*
        initCollection: function() {
            console.log('init collection');
            // Setup Collection
            var has_handle = this.has('handle');
            var has_collection = this.has('collection');

            if (!has_collection && has_handle ) {
                var handle = this.get('handle');
                var models = brj.store.app.models.templates.whereInCollection(handle);
                //var collection = new brj.store.collections.Templates(models);
                //this.set('collection', collection);
            }
        },
        */
        addTemplate: function(template) {
            if (!template.get('is_editable')) {
                template = template.clone();
                var label = template.get('label');
                template.set('id', null);
                template.set('handle', null);
                template.set('is_editable', true);
                template.set('label', label + ' (copy)');
            }

            template.addCategory(this.get('handle'));

            this.get('collection').add(template);

            // if not in 'saved' collection, add it.
            if (this.get('handle') !== 'saved') {
                var savedCollection = brj.store.app.models.templateCollections.findWhere({handle: "saved"});
                if (!savedCollection.contains(template)) {
                    console.log('add saved', template);
                    template.addCategory('saved');
                    savedCollection.get('collection').add(template);
                }
            }

            template.save().then(function(data) {
                console.log('saved after drop', template, data);
            });

        },
        contains: function(template) {
            var collection = this.get('collection');
            if (collection.contains(template)) {
                return true;
            }
            return false;
        }
    });

    brj.store.collections.TemplateCollections = brj.store.collections.Base.extend({
        url: '/wp-json/brj-templates/v1/collections',
        model: brj.store.models.TemplateCollection
    });



    // Libraries
    brj.store.models.Library = brj.store.models.Base.extend({
        idAttribute: 'handle',
        urlRoot: '/wp-json/brj-templates/v1/libraries',
        defaults: {
            handle: null,
            label: "",
            url: null,
            is_editable: true
        },
        initialize: function() {
            if (!this.has('handle')) {
                var handle = ((( 1 + Math.random() ) * 0x10000 ) | 0 ).toString(16).substring(1);
                this.set('handle', handle);
            }
            if (this.has('url')) {
                this.fetchLibraryContent();
            }
        },
        fetchLibraryContent: function() {
            var url = this.get('url') + '/wp-json/brj-templates/v1/libraries/mine';
            console.log('about to fetch library', url);
        },
        onFetchedLibraryContent: function() {

        }
    });

    brj.store.collections.Libraries = brj.store.collections.Base.extend({
        url: '/wp-json/brj-templates/v1/libraries',
        model: brj.store.models.Library,
    });

})(jQuery);
