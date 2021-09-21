<?php
/**
 * Register Menus
 * 
 * @package Cyaan
 */

namespace CyaanNamespace\classes;

use CyaanNamespace\traits\Singleton;

class Menus {
    use Singleton;

    protected function __construct() {
        // load class
        $this->setup_hooks();
    }

    protected function setup_hooks() {
        // actions and filters
        add_action( 'init', [ $this, 'register_menus' ] );
    }

    public function register_menus() {
        register_nav_menus([
            'cyaan-header-menu' => esc_html__( 'Header Menu', 'cyaan' ),
            'cyaan-footer-menu' => esc_html__( 'Footer Menu', 'cyaan' )
        ]);
    }

    public function get_menu_id ( $location ) {
        // Get all the locations
        $locations = get_nav_menu_locations();

        // Get object id by location

        $menu_id = $locations[$location];
        return !empty($menu_id) ? $menu_id : '';
    }

    public function get_child_menu_items( $menu, $parent_id) {
        
        $child_menu_items = [];

        if ( is_array($menu) && !empty($menu) ) {
            foreach ($menu as $child_menu_item) {
                if ( intval($child_menu_item->menu_item_parent) === $parent_id ) {
                    array_push( $child_menu_items, $child_menu_item);
                }
            }
        }

        return $child_menu_items;
    }
}