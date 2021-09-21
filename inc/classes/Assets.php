<?php
/**
 * Enqueues all Assets
 * 
 * @package Cyaan
 */

namespace CyaanNamespace\classes;

use CyaanNamespace\traits\Singleton;

class Assets {
    use Singleton;

    protected function __construct() {
        // Load class
        $this->setup_hooks();
    }

    protected function setup_hooks() {
        // Actions and filters

        add_action( 'wp_enqueue_scripts', [ $this, 'register_styles'] );
        add_action( 'wp_enqueue_scripts', [ $this, 'register_scripts'] );
    }

    public function register_styles() {
        
        // Register Styles
        wp_register_style( 'style-css', get_stylesheet_uri(), [], filemtime( CYAAN_DIR_PATH . '/style.css'), 'all' );
        wp_register_style( 'main-css', CYAAN_BUILD_CSS_URI . '/main.css', [], filemtime( CYAAN_BUILD_CSS_DIR_PATH . '/main.css'), 'all' );

        // Enqueue Styles
        wp_enqueue_style('style-css');
        wp_enqueue_style('main-css');
    }

    public function register_scripts() {

        // Register Scripts
        wp_register_script( 'main-js', CYAAN_BUILD_JS_URI . '/main.js', [ 'jquery' ], filemtime( CYAAN_BUILD_JS_DIR_PATH . '/main.js'), true );
        wp_register_script( 'slick-js', CYAAN_BUILD_JS_URI . '/slick.js', [ 'jquery' ], filemtime( CYAAN_BUILD_JS_DIR_PATH . '/slick.js'), true );
    
        // Enqueue Scripts
        wp_enqueue_script('main-js');
        wp_enqueue_script('slick-js');
    }

    // public function enqueue_editor_assets() {
    //     $asset_config_file = sprintf('%s/assets.php', CYAAN_BUILD_PATH);

    //     if ( !file_exists( $asset_config_file ) ) {
    //         return;
    //     }

    //     $asset_config = require_once $asset_config_file;

    //     if ( empty( $asset_config['js/editor.js'] ) ) {
    //         return;
    //     }

    //     $editor_asset = $asset_config['js/editor.js'];
    // }
}