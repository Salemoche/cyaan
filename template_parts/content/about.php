<?php
/**
*========================================
*	
*	About Template
*
*   @package CyaanNamespace
*
*========================================*/

?>

<div class="cya-content cya-about cya-two-column">
    <div class="cya-column cya-column-left"></div>
    <div class="cya-about-content cya-column-right">
        <div class="cya-about__sentences">
            <?php the_field( 'about_sentences' ); ?>
        </div>
        <div class="cya-about__text">
            <?php the_field( 'about_text' ); ?>
        </div>
        <div class="cya-about__meta">
            <div class="cya-about__meta__address">
                <?php the_field( 'about_address' ); ?>
            </div>
            <div class="cya-about__meta__contact">
                <?php the_field( 'about_contact' ); ?>
            </div>
        </div>
    </div>
    
</div>
