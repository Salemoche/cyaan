<?php
/**
 *  Footer Template
 * 
 *  @package Cyaan
 */
?>

        
    </main>

<!-- < ?php get_template_part('template_parts/elements/salemoche-slider'); ?> -->
<?php 
    get_template_part('template_parts/elements/footer');
    // get_template_part('template_parts/elements/cookie-notice');
    // get_template_part('template_parts/elements/cookie-text');
    get_template_part('template_parts/variables');

    wp_footer(); ?>

</div>
<?php
    get_template_part('template_parts/elements/about-marquee');
    get_template_part('template_parts/elements/imprint');
?>
</body>
</html>