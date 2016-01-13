<?php
class FLBuilderTemplateBrowser {

    /**
    * Primary object constructor.
    * This method kicks off everything if the builder is active.
    * @return void
    */
    function __construct() {

        if (class_exists('FLBuilderModel')) {

            add_action('wp_enqueue_scripts', array($this, 'enqueue'));
            add_action('wp_footer', array($this, 'print_template_html'));

            // WP REST Controllers - TO BE DEPRECATED
            $rest_templates = new BRJ_REST_TemplatesController();
            $rest_collections = new BRJ_REST_TemplateCollectionsController();
            $rest_libraries = new BRJ_REST_LibrariesController();

            // AJAX Handler
            $ajax = new FLBuilderTemplateBrowserAJAX();
        }
    }

    /**
    * Enqueue scripts and styles - only called when builder is active.
    * @return void
    */
    function enqueue() {
        if (class_exists( 'FLBuilderModel' ) && FLBuilderModel::is_builder_active() ) {

            // Enqueue Stylesheets
            wp_enqueue_style('fl-template-browser', plugins_url('/css/template-browser.css', dirname(__FILE__)), array('open-sans'));

            // Enqueue Scripts
            wp_enqueue_script('fl-template-browser', plugins_url('/js/min/template-browser-min.js', dirname(__FILE__)), array('backbone', 'wp-util' ));

            $data = array(
                'collections' => BRJ_TemplateCollection::get_collections(),
                'libraries' => array_values(BRJ_TemplateLibrary::get_libraries()),
                'root' => esc_url_raw( get_rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' )
            );
            wp_localize_script('fl-template-browser', 'BRJ_StoreInitialData', $data);
        }
    }

    /**
    * Print the base html and all template scripts.
    * @return void
    */
    function print_template_html() {
        if (class_exists( 'FLBuilderModel' ) && FLBuilderModel::is_builder_active() ) {
            ?>
            <div id="brj-store-modal-root" class="fl-template-browser-modal brj-store-modal fl-lightbox-wrap"></div>
            <?php
            require_once FLBUILDER_BROWSER_DIR . 'templates/root-view.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/sidebar-view.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/screen-templates.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/screen-template-single.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/screen-template-setup-library.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/screen-template-library.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/item-template.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/item-collection-sidebar.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/empty-no-templates.php';
            require_once FLBUILDER_BROWSER_DIR . 'templates/screen-template-import-template.php';
        }
    }
}
?>
