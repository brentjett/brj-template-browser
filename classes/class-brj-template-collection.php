<?php
class BRJ_TemplateCollection {

    function __construct($args = array()) {

    }

    static function get_collections($type = null) {


        $collections = array(
            array(
                'handle' => "landing",
                'label' => 'Homepages',
                'is_editable' => false,
            ),
            array(
                'handle' => "company",
                'label' => 'Content Pages',
                'is_editable' => false,
            ),
            array(
                'handle' => "saved",
                'label' => 'Saved Templates',
                'is_editable' => false,
                'is_title_editable' => false
            )
        );
        $user_collections = array_values(get_option('brj_store_template_collections', array()));
        return array_merge($collections, $user_collections);
    }
}
?>
