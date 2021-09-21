<?php
/**
*========================================
*	
*	Landing Template
*
*   @package Cyaan
*
*========================================*/

?>

<section class="cya-landing active">
    <div class="cya-landing__video">
        <!-- <video src="< ?php echo get_template_directory_uri() . '/assets/video/video_test.mov'; ?>" autoplay loop muted class="" id="cya-landing-video"></video> -->
        <?php echo wp_get_attachment_image( get_field('landing_video_placeholder', 'option')['ID'], 'full' ) ?>
        <!-- <video src="< ?php echo get_field('landing_video', 'option') ?>" autoplay loop muted class="" id="cya-landing-video"></video> -->
        <video poster="<?php echo get_field('landing_video_placeholder', 'option')['url'] ?>" preload="none" autoplay loop muted class="" id="cya-landing-video">
            <source src="<?php echo get_field('landing_video', 'option') ?>" type="video/mp4" />
        </video>
    </div>
    <!-- <div class="cya-landing__about">
        < ?php the_field('about_text', 'option');?>
    </div> -->
    <div class="cya-landing__enter cya-landing__enter-enter">
        <?php the_field('enter_button_label', 'option');?>
    </div>
    <div class="cya-landing__enter cya-landing__enter-cyaan">
        CYAAN
    </div>
</section>