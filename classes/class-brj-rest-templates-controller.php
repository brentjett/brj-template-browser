<?php

class BRJ_REST_TemplatesController {

	function __construct() {
		add_action('rest_api_init', array($this, 'register_routes'));
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		register_rest_route('brj-templates/v1', '/templates', array(
			array(
				'methods' => WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_items' )
			),
			array(
				'methods' => WP_REST_Server::CREATABLE,
				'callback' => array( $this, 'create_item' )
			)
		));
		register_rest_route( 'brj-templates/v1', '/templates/(?P<id>[\w-]+)', array(
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

	function get_items($request) {
		$templates = array();


		$user_templates = get_posts( array(
			'post_type' 				=> 'fl-builder-template',
			'orderby' 					=> 'menu_order title',
			'order' 					=> 'ASC',
			'posts_per_page' 			=> -1,
			'fl-builder-template-type'	=> 'layout'
		));
		//$user_templates = FLBuilderModel::get_user_templates();
		if (!empty($user_templates)) {
			foreach($user_templates as $post) {
				$layout = get_post_meta($post->ID, '_fl_builder_data', true);
				if ($layout) {
					$categories = get_post_meta($post->ID, 'template_categories', true);
					if (empty($categories)) {
						$categories = array('saved');
					}
					$templates[] = array(
						'handle' => $post->ID,
						'label' => $post->post_title,
						'description' => $post->post_excerpt,
						'author' => $post->post_author,
						'modified' => $post->post_modified,
						'edit_link' => FLBuilderModel::get_edit_url($post->ID),
						'categories' => $categories, /* @todo: Get Categories */
						/*'layout' => $layout,*/
						'type' => 'user',
						'is_global' => get_post_meta($post->ID, '_fl_builder_template_global', true),
						'is_editable' => true
					);
				}
			}
		}

		$template_data = FLBuilderModel::get_templates();
		if (!empty($template_data)) {
			foreach($template_data as $data) {
				$templates[] = array(
					'handle' => $data->index,
					'label' => $data->name,
					'screenshot' => array(
						'thumbnail' => FL_BUILDER_URL . 'img/templates/' . $data->image
					),
					'author' => array(
						'name' => 'Beaver Builder Team'
					),
					'categories' => array($data->category),
					/*'layout' => $data->nodes,*/
					'is_premium' => $data->premium,
					'is_builtin' => true,
					'type' => 'core'
				);
			}
		}
		$response = rest_ensure_response( $templates );
		return $response;
	}

    public function get_item($request) {
        $response = get_post($request['id']);
        return $response;
    }

    public function create_item($request) {
        $response = array();
        $response['params'] = $request->get_params();
        $response['message'] = "CREATE";
        return $response;
    }

    public function update_item($request) {
		$template = $request->get_params();
		$id = $template['handle'];

		update_post_meta($id, 'template_categories', $template['categories']);

        return $template;
    }

    public function delete_item($request) {
        $response = array();
        $response['params'] = $request->get_params();
        $response['message'] = "DELETE ITEM";
        return $response;
    }
}
?>
