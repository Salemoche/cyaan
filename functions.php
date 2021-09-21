<?php
/**
 *  Theme Functions
 * 
 *  @package Cyaan
 */

// echo '<pre>';
// print_r (CYAAN_DIR_PATH);
// wp_die();

if ( !defined('CYAAN_DIR_PATH')) {
    define( 'CYAAN_DIR_PATH', untrailingslashit( get_template_directory() ));
}

if ( !defined('CYAAN_DIR_URI')) {
    define( 'CYAAN_DIR_URI', untrailingslashit( get_template_directory_uri() ));
}

if ( !defined('CYAAN_PLUGINS_PATH')) {
    define( 'CYAAN_PLUGINS_PATH', untrailingslashit( $plugin_dir = ABSPATH . 'wp-content/plugins/' ) );
}

// if ( !defined('CYAAN_PLUGINS_URI')) {
//     define( 'CYAAN_PLUGINS_URI', untrailingslashit( plugin_dir_url() ));
// }

if ( !defined('CYAAN_BUILD_URI')) {
    define( 'CYAAN_BUILD_URI', untrailingslashit( get_template_directory_uri() . '/assets/build' ));
}

if ( !defined('CYAAN_BUILD_PATH')) {
    define( 'CYAAN_BUILD_PATH', untrailingslashit( get_template_directory() . '/assets/build' ));
}

if ( !defined('CYAAN_BUILD_JS_DIR_PATH')) {
    define( 'CYAAN_BUILD_JS_DIR_PATH', untrailingslashit( get_template_directory() . '/assets/build/js' ));
}

if ( !defined('CYAAN_BUILD_JS_URI')) {
    define( 'CYAAN_BUILD_JS_URI', untrailingslashit( get_template_directory_uri() . '/assets/build/js' ));
}

if ( !defined('CYAAN_BUILD_IMG_URI')) {
    define( 'CYAAN_BUILD_IMG_URI', untrailingslashit( get_template_directory_uri() . '/assets/build/img' )); 
}

if ( !defined('CYAAN_BUILD_CSS_URI')) {
    define( 'CYAAN_BUILD_CSS_URI', untrailingslashit( get_template_directory_uri() . '/assets/build/css' ));
}

if ( !defined('CYAAN_BUILD_CSS_DIR_PATH')) {
    define( 'CYAAN_BUILD_CSS_DIR_PATH', untrailingslashit( get_template_directory() . '/assets/build/css' ));
}

if ( !defined('CYAAN_BLOCK_TEMPLATE_DIR')) {
    define( 'CYAAN_BLOCK_TEMPLATE_DIR', untrailingslashit( get_template_directory() .  '/block-templates/'));
}

if ( !defined('DEVELOPER_URL')) {
    define( 'DEVELOPER_URL', 'https://inter-action.design' );
}

//require_once CYAAN_DIR_PATH . '/inc/helpers/autoloader.php';
require_once CYAAN_DIR_PATH . '/vendor/autoload.php';
require_once CYAAN_DIR_PATH . '/inc/helpers/template-tags.php';
require_once CYAAN_PLUGINS_PATH . '/salemoche-wordpress-essentials/inc/helpers/helpers.php';

function cyaan_get_theme_instance() {
    \CyaanNamespace\classes\Theme::get_instance();
}

//======================
// Upload Limit
//======================

@ini_set( 'upload_max_size' , '64M' );
@ini_set( 'post_max_size', '64M');
@ini_set( 'max_execution_time', '300' );

cyaan_get_theme_instance();

?>