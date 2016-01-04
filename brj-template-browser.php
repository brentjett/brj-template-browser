<?php
/*
Plugin Name: Template Browser for Beaver Builder (Experimental)
Version: 0.1
Author: Brent Jett
Description: Experimental templates panel for beaver builder. Allows you to organize your own templates as well as expose public templates for other sites to consume.
*/
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
define( 'BRJ_STORE_DIR', plugin_dir_path( __FILE__ ) );
define( 'BRJ_STORE_URL', plugins_url( '/', __FILE__ ) );

require_once BRJ_STORE_DIR . 'classes/class-brj-template-browser.php';
require_once BRJ_STORE_DIR . 'classes/class-brj-builder-template.php';
require_once BRJ_STORE_DIR . 'classes/class-brj-template-collection.php';
require_once BRJ_STORE_DIR . 'classes/class-brj-template-library.php';
require_once BRJ_STORE_DIR . 'classes/class-brj-rest-templates-controller.php';
require_once BRJ_STORE_DIR . 'classes/class-brj-rest-template-collections-controller.php';
require_once BRJ_STORE_DIR . 'classes/class-brj-rest-libraries-controller.php';

function brj_store_init() {
    $store = new BRJ_TemplateBrowser();
}
add_action('init', 'brj_store_init');
?>
