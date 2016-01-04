<?php
class BRJ_TemplateBrowser {

    function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue'));
        add_action('wp_footer', array($this, 'print_template_html'));

        $rest_templates = new BRJ_REST_TemplatesController();
        $rest_collections = new BRJ_REST_TemplateCollectionsController();
        $rest_libraries = new BRJ_REST_LibrariesController();
    }

    function enqueue() {
        if (class_exists( 'FLBuilderModel' ) && FLBuilderModel::is_builder_active()) {

            wp_enqueue_script('brj-store', plugins_url('/js/min/brj-store-min.js', dirname(__FILE__)), array('backbone', 'wp-api', 'wp-util' ));
            wp_enqueue_style('brj-store', plugins_url('/css/brj-store.css', dirname(__FILE__)), array('open-sans'));

            $data = array(
                'collections' => BRJ_TemplateCollection::get_collections(),
                'libraries' => array_values(BRJ_TemplateLibrary::get_libraries())
            );
            wp_localize_script('brj-store', 'BRJ_StoreInitialData', $data);
        }
    }

    function print_template_html() {
        ?>
        <div id="brj-store-modal-root" class="brj-store-modal fl-lightbox-wrap"></div>
        <?php
        require_once BRJ_STORE_DIR . 'templates/root-view.php';
        require_once BRJ_STORE_DIR . 'templates/sidebar-view.php';
        require_once BRJ_STORE_DIR . 'templates/screen-templates.php';
        require_once BRJ_STORE_DIR . 'templates/screen-template-single.php';
        require_once BRJ_STORE_DIR . 'templates/screen-template-setup-library.php';
        require_once BRJ_STORE_DIR . 'templates/screen-template-library.php';
        require_once BRJ_STORE_DIR . 'templates/item-template.php';
        require_once BRJ_STORE_DIR . 'templates/item-collection-sidebar.php';
        require_once BRJ_STORE_DIR . 'templates/empty-no-templates.php';
    }
}
?>
