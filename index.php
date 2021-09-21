<?php
/**
 * Main Template file
 * @package UZHxUNIGE
*/

get_header();

?>

<div id="primary">
    <main id="main" class="site-main" role="main">
        <?php
        if ( have_posts() ) : while ( have_posts() ) : the_post();
            
            get_template_part('template_parts/content', 'regular');

            endwhile; 
    
        cyaan_pagination();
        
        else :
            get_template_part('template_parts/content', 'none');
        endif; 
        ?>
    </main>
</div>
    
<?php
get_footer();