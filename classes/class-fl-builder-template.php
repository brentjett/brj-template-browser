<?php
class FLBuilderTemplate {

    /**
    * Post ID for saved post. ID number for static templates.
    */
    public $id = null;

    /**
    * Array of layout nodes
    */
    public $layout = array();

    /**
    * Default constructor
    */
    function __construct($args) {
        if (is_object($args)) {
            // assume its a post
            $this->init_from_post($args);
        }

        if (is_array($args)) {
            // assume it's static template data
            $this->init_from_data($data);
        }
    }

    /**
    * Populate the current object with data from saved WP_Post.
    */
    function init_from_post($post) {
        // Setup properties
        return $this;
    }

    /**
    * Populate the current object with data from array.
    * The array is expected in the format of stored static template data.
    */
    function init_from_data($data = array()) {
        // Setup properties
        return $this;
    }

}
?>
