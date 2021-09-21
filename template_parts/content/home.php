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

<div class="cya-content cya-home">
    <div class="cya-home__images">
        <?php
        // The Query
        $args = [
            'post_type'		=>	'post',
            'orderby'         =>  'menu_order'
        ];
        $query = new WP_Query( $args );
        $total_index = 1;
        $project_index = 1;

        // The Query
        if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
            $in_project_index = 1;
            $repeater_fields = get_field('project_images');

            if (!empty($repeater_fields)) :
                foreach ($repeater_fields as $repeater_field ) :
                    ?>
                    <div 
                        class="cya-image" 
                        id="cya-image-<?php echo $project_index . '-' . $in_project_index; ?>" 
                        data-total-index="<?php echo $total_index; ?>" 
                        data-project-index="<?php echo $project_index; ?>"  
                        data-in-project-index="<?php echo $in_project_index; ?>"
                        data-description="<?php echo get_the_title() ?>"
                        data-width="<?php echo $repeater_field['width']?>%"
                        >
                        <!-- style="order: < ?php echo $total_index; ?>" -->
                        <?php if(!empty($repeater_field['image'])): ?>
                            <div class="cya-image__image">
                                <?php echo wp_get_attachment_image($repeater_field['image']['ID'], 'full'); ?>
                            </div>
                            <!-- <div class="cya-image__info-box cya-info-box">< ?php echo get_the_title() ?></div> -->
                        <?php elseif(!empty($repeater_field['video'])): ?>
                            <div class="cya-image__video cya-video">
                                <video preload="metadata" alt="<?php echo $repeater_field['video']['alt'] ?>" muted autoplay loop>
                                    <source src="<?php echo $repeater_field['video']['url'] ?>#t=0.5" type="video/mp4" />
                                </video>
                                <div class="cya-video__button" style="background-image: url('<?php the_field('video_icon', 'option') ?>');"></div>
                            </div>
                            <!-- <div class="cya-image__info-box cya-info-box">< ?php echo get_the_title() ?></div> -->
                        <?php endif; ?>
                        <!-- <div class="debug-counter">< ?php echo $total_index ?></div> -->
                        <div class="cya-image__info-box cya-info-box"><?php echo get_the_title() ?></div>
                    </div>
                <?php $in_project_index ++; $total_index ++; endforeach;
            else :
                $total_index ++;
            endif;
        $project_index ++; endwhile; endif; wp_reset_postdata();?>
    </div>
    <div class="cya-home__info">
        <button class="cya-home__info__button cya-info-button cya-button cya-button">Info</button>
    </div>
</div>
