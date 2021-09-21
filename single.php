<?php
/**
 * Single Post Template
 * 
 * @package Cyaan
 */

get_header();

 ?>


<div id="primary">
    <main id="main" class="site-main mt-5" role="main">
        <?php
        if ( have_posts() ) : while ( have_posts() ) : the_post();
            ?>
            <?php
                get_template_part('template_parts/content');
            ?>
            <?php
        endwhile; 
    
        else :
            get_template_part('template_parts/content-none');
        endif; 
        ?>

        <div class="container">
            <?php
            previous_post_link();
            next_post_link();
            ?>
        </div>
    </main>
</div>

<?php get_footer(); ?>