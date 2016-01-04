<?php
class BRJ_TemplateLibrary {

    function __construct($args = array()) {}

    static function get_libraries() {
        $libraries = get_option('brj_store_template_libraries');
		if (empty($libraries)) {
			$libraries = array(
				'main' => array(
					'handle' => 'main',
					'label' => 'Template Store',
					'url' => 'http://local.bb-test-suite.com',
                    'is_editable' => false
				)
			);
            update_option('brj_store_template_libraries', $libraries);
		}
        return $libraries;
    }
}
?>
