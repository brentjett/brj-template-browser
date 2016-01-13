<?php
/*
Plugin Name: Beaver Builder Template Browser
Version: 0.2-alpha
Author: Brent Jett
Description: Experimental templates panel for beaver builder. Allows you to organize your own templates as well as expose public templates for other sites to consume.
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
define( 'FLBUILDER_BROWSER_DIR', plugin_dir_path( __FILE__ ) );
define( 'FLBUILDER_BROWSER_URL', plugins_url( '/', __FILE__ ) );

require_once FLBUILDER_BROWSER_DIR . 'classes/class-fl-builder-template-browser.php';
require_once FLBUILDER_BROWSER_DIR . 'classes/class-fl-builder-template-browser-ajax.php';
require_once FLBUILDER_BROWSER_DIR . 'classes/class-fl-builder-template.php';
require_once FLBUILDER_BROWSER_DIR . 'classes/class-brj-template-collection.php';
require_once FLBUILDER_BROWSER_DIR . 'classes/class-brj-template-library.php';

// REST Controllers - Will deprecate in favor of wp_ajax calls.
require_once FLBUILDER_BROWSER_DIR . 'classes/class-brj-rest-templates-controller.php';
require_once FLBUILDER_BROWSER_DIR . 'classes/class-brj-rest-template-collections-controller.php';
require_once FLBUILDER_BROWSER_DIR . 'classes/class-brj-rest-libraries-controller.php';

/**
* Instantiate main template browser object.
* Object's constructor checks if builder is active and kicks off setup.
*/
function fl_builder_template_browser_init() {

    $template_browser = new FLBuilderTemplateBrowser();
}
add_action('init', 'fl_builder_template_browser_init');




// Scratchwork
/*
function filter_display_admin_bar($show) {
    $context = $_GET['context'];
    if ($context == 'template-browser') {
        return false;
    }
    return $show;
}
add_filter('show_admin_bar', 'filter_display_admin_bar');
*/
?>
