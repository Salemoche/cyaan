<?php
/**
 * ========================================
 * 
 * Template Name: Index
 * 
 * @package 
 * 
 * ========================================
 */


get_header();

?>

<?php
// The Loop
if ( have_posts() ) : while ( have_posts() ) : the_post();

    get_template_part('template_parts/content/index' );

endwhile; endif; wp_reset_postdata();?>

<?php get_footer(); ?>