<?php
class BRJ_REST_LibrariesController {

	function __construct() {
		add_action('rest_api_init', array($this, 'register_routes'));
	}

    function register_routes() {
        register_rest_route( 'brj-templates/v1', '/libraries', array(
			array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_items' ),
			),
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => array( $this, 'create_item' )
			)
		));
        register_rest_route( 'brj-templates/v1', '/libraries/(?P<handle>[\w-]+)', array(
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
		register_rest_route( 'brj-templates/v1', '/libraries/mine', array(
			array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_store' ),
			),
		));
    }

    function get_items($request) {
		return array_values(BRJ_TemplateLibrary::get_libraries());
	}

    function get_item($request) {
		$libraries = get_option('brj_store_template_libraries');
		$handle = $request['handle'];
		$item = $libraries[$handle];
		return $item;
	}

    function create_item($request) {
		$libraries = get_option('brj_store_template_libraries');
		$item = $request->get_params();
		$handle = $item['handle'];
		$libraries[$handle] = $item;
		$saved = update_option('brj_store_template_libraries');
		return $item;
	}

	function update_item($request) {
		$libraries = get_option('brj_store_template_libraries');
		$item = $request->get_params();
		$handle = $item['handle'];
		$libraries[$handle] = $item;
		$saved = update_option('brj_store_template_libraries');
		return $item;
	}

    function delete_item($request) {
		$libraries = get_option('brj_store_template_libraries');
		$handle = $item['handle'];
		unset($libraries[$handle]);
		return;
	}

	function get_store($request) {
		$response = array(
			'templates' => array(),
			'collections' => BRJ_TemplateCollection::get_collections(),
		);
		return $response;
	}
}
?>
