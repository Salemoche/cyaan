<?php
/**
 * ========================================
 * 
 * Bootstrap the Cyaan Theme
 * 
 * @package Cyaan
 * 
 * ========================================
 */

namespace CyaanNamespace\classes;

use CyaanNamespace\traits\Singleton;

class Theme {
    use Singleton;

    protected function __construct() {
        // load class

        Assets::get_instance();
        Menus::get_instance();
        Blocks::get_instance();
    
        $this->setup_hooks();
    }

    protected function setup_hooks() {
        // actions and filters

        add_action( 'after_setup_theme', [ $this, 'setup_theme' ] );
        add_action( 'admin_notices', [ $this, 'admin_notices'] );
        add_action( 'init', [ $this, 'change_post_type_labels'] );
    }

    public function setup_theme() {

/**================
 * Theme Support
 ================*/

        add_theme_support( 'title-tag' );

        // add_theme_support( 'custom-logo', [
        //     'header-text'   => ['site-title', 'site-description'],
        //     'height'        => 100,
        //     'width'         => 400,
        //     'flex-height'   => true,
        //     'flex-width'    => true
        // ] );

        add_theme_support( 'post-thumbnails' ); 

        add_image_size( 'featured-thumbnail', 350, 233, true); // get this size from the inspector to see how big the image should be

        add_theme_support( 'customize-selective-refresh-widgets' );

        add_theme_support( 'automatic-feed-links' );

        add_theme_support( 
            'html5', 
            [
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'script',
                'style'
            ]
        );

        add_theme_support( 'wp-block-style' );

        add_theme_support( 'align-wide' );

        add_theme_support( 'editor-styles' );
        add_editor_style( 'assets/build/css/editor.css' );

        $this->add_options_page();

        global $content_width;
        if ( !isset( $content_width ) ) {
            $content_width = 1240;
        }


/**================
 * Custom Menu 
================*/

        add_filter('custom_menu_order', '__return_true');
        add_filter('menu_order', [$this, 'custom_menu_order']);

        add_action( 'admin_menu', [$this, 'control_admin_access']);


/**================
 * Data handling
================*/
        add_filter('upload_mimes', function($mimes) {
            $mimes['svg'] = 'image/svg+xml';
            return $mimes;
        });
    }

    public function change_post_type_labels() {
        
        $get_post_type = get_post_type_object('post');
        // echo '<hr><pre class="sm-debug">';
        // print_r($get_post_type);
        // echo '</pre><hr>';
        // wp_die();
        $labels = $get_post_type->labels;
        $labels->name = 'Projekte';
        $labels->singular_name = 'Projekt';
        $labels->add_new = 'Projekt hinzufügen';
        $labels->add_new_item = 'Projekt hinzufügen';
        $labels->edit_item = 'Projekt bearbeiten';
        $labels->new_item = 'Projekt';
        $labels->view_item = 'Projekt ansehen';
        $labels->search_items = 'Projekte durchsuchen';
        $labels->not_found = 'Keine Projekte gefunden';
        $labels->not_found_in_trash = 'Keine Projekte im Trash gefunden';
        $labels->all_items = 'Alle Projekte';
        $labels->menu_name = 'Projekte';
        $labels->name_admin_bar = 'Projekte';
        $get_post_type->menu_icon = 'dashicons-admin-settings';
    }

    public function admin_notices() {

        $plugins_active = [
            'gutenberg'     =>  is_plugin_active( 'gutenberg/gutenberg.php' ),
            'salemoche'     =>  is_plugin_active( 'salemoche-wordpress-essentials/salemoche-wordpress-essentials.php' )
        ];

        if ( ! $plugins_active['gutenberg'] ) {
            $this->plugin_notice('Gutenberg', 'https://github.com/WordPress/gutenberg');
        }

        if ( ! $plugins_active['salemoche'] ) {
            $this->plugin_notice('Salemoche Essentials', 'https://github.com/Salemoche/salemoche-blocks');
        }
    }

    public function plugin_notice($plugin_name, $plugin_url) {

        $plugin_link = sprintf ( 
            '<a href="%1$s">%2$s Plugin</a>',
            esc_url($plugin_url),
            $plugin_name
        );

        $notice_content = sprintf (
            esc_html_x( 'To use all features of this Theme, please install and activate the %s', 'notice text', 'cyaan' ),
            $plugin_link
        );

        echo '<div class="notice notice-warning"><p>' . $notice_content . '</p></div>';
    }

    public function add_options_page() {
        if( function_exists('acf_add_options_page') ) {
    
            acf_add_options_page([
                'page_title'    => 'Site Settings',
                'menu_title'    => 'Site Settings',
                'menu_slug'    => 'site-settings',
                'menu_order'         => '-100'
            ]);
            
        }
    }

    public function custom_menu_order($menu_order) {
        return array( 
            'index.php',
            'ai1wm_export', 
            'site-settings',
            'edit.php?post_type=page',
            'edit.php', 
            'edit-comments.php'
        );
    }

    public function control_admin_access() {
        // if (!current_user_can( 'manage_options' )) {
        //     remove_menu_page( 'index.php' );
        // }
    }

    public function mime_types($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
}