<?php
class BRJ_REST_TemplateCollectionsController {

	function __construct() {
		add_action('rest_api_init', array($this, 'register_routes'));
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
        register_rest_route( 'brj-templates/v1', '/collections', array(
			array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_items' ),
			),
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => array( $this, 'create_item' )
			)
		));
        register_rest_route( 'brj-templates/v1', '/collections/(?P<handle>[\w-]+)', array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array( $this, 'get_item' )
			),
			array(
				'methods'         => WP_REST_Server::EDITABLE,
				'callback'        => array( $this, 'update_item' )
			),
			array(
				'methods' => WP_REST_Server::DELETABLE,
				'callback' => array( $this, 'delete_item' )
			),
		));
    }

    public function get_items($request) {
        return BRJ_TemplateCollection::get_collections();
    }

    public function get_item($request) {
        $response = array();
        $response['params'] = $request->get_params();
        $response['message'] = "GET ITEM";
        return $response;
    }

    public function create_item($request) {
		$collections = get_option('brj_store_template_collections', array());
		$handle = $request['handle'];
		$item = $request->get_params();
		unset($item['collection']);
		$collections[$handle] = $item;
		$saved = update_option('brj_store_template_collections', $collections);
        return $item;
    }

    public function update_item($request) {
		$collections = get_option('brj_store_template_collections', array());
		$handle = $request['handle'];
		$item = $request->get_params();
		unset($item['collection']);
		$collections[$handle] = $item;
		$saved = update_option('brj_store_template_collections', $collections);
        return $item;
    }

    public function delete_item($request) {
        $handle = $request['handle'];
		$collections = get_option('brj_store_template_collections', array());
		unset($collections[$handle]);
		$saved = update_option('brj_store_template_collections', $collections);
        return $collections;
    }

}
?>
