<?php

/**
 * Register Block Classes
 * 
 * @package CYAAN
 */

namespace CyaanNamespace\classes;

use CyaanNamespace\traits\Singleton;

class Blocks {
    use Singleton;

    function __construct() {

        add_action('block_categories', [$this, 'add_block_categories']);
        add_action('acf/init', [$this, 'register_block']);
    }


    public function add_block_categories ( $categories ) {
        
        $category_slugs = wp_list_pluck( $categories, 'slug' );

        return in_array( 'cyaan', $category_slugs, true) ? $categories : 
            array_merge ([
                    [
                        'slug' => 'cyaan',
                        'title' => __( 'UZH – UNIGE Blocks', 'cyaan' ),
                        'icon' => 'table-row-after'
                    ]
                ], 
                $categories
            );
    }

    public function register_block () {
        if( function_exists('acf_register_block_type') ) {

            acf_register_block_type(array(
                'name'              => 'block',
                'title'             => __('Block'),
                'description'       => __('A custom block for the Block'),
                'render_template'   => CYAAN_BLOCK_TEMPLATE_DIR . '/block.php',
                'category'          => 'cyaan',
                'mode'              => 'auto',
                // 'align'             => 'full',
                'icon'              => 'admin-comments',
                'keywords'          => array( 'block'),
                // 'enqueue_assets'    => [ $this, 'enqueue_assets' ],
            ));
        }
    }

    public function enqueue_assets () {
        // wp_enqueue_script( 'block-testimonial', SALEMOCHE_ESSENTIALS_JS_URL . '/main.js', ['jquery'], false, true );
        // wp_enqueue_style( 'block-testimonial', SALEMOCHE_ESSENTIALS_CSS_URL . '/main.css');
    }
}