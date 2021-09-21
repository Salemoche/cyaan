<?php
/**
*========================================
*	
*	Footer
*
*   @package Cyaan
*
*========================================*/

$imprint_id = 24;

?>

<footer class="cya-footer">
    <div class="cya-footer-container">
        <a href="mailto:<?php the_field( 'email', 'option' ) ?>" class="cya-button cya-footer-contact">
            CONTACT
        </a>
        <!-- <div class="cya-footer-info">
            < ?php the_field( 'footer_text', 'option' );?>
        </div> -->
        <button class="cya-imprint-button cya-imprint-button-close cya-button cya-footer-imprint"><?php echo get_the_title($imprint_id); ?></button>
    </div>
</footer>