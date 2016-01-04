<?php
class BRJ_BuilderTemplate {

    function __construct($args) {

        if (is_object($args)) {
            // turn post object into props
            $this->get_template_for_post($args);
        }
        if (is_array($args)) {
            // setup props
        }
    }

    function get_template_for_post($post) {
        return new BRJ_BuilderTemplate();
    }

    static function get_template($id, $type = 'user') {
        $template = new BRJ_BuilderTemplate();

        return $template;
    }
}
?>
