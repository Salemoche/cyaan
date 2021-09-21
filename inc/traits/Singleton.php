<?php
/**
 * Creates Singleton Trait that checks if an Object has been instantiatet yet and if not, creates new instance of the Class;
 * 
 * @package Cyaan
 */

namespace CyaanNamespace\traits;

trait Singleton {
    public function __construct() {

    }

    public function __clone() {

    }

    final public static function get_instance() {
        static $instance = [];

        $called_class = get_called_class();

        if( !isset( $instance[$called_class])) {
            $instance[$called_class] = new $called_class();

            do_action( sprintf( 'cyaan_singleton_init%s', $called_class));
        }

        return $instance[$called_class];
    }
}