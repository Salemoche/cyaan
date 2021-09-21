<?php
/**
*========================================
*	
*	Cookie Notice
*
*   @package Cyaan
*
*========================================*/

$args = wp_parse_args( 
    $args, 
    [
        'index' => 0
    ]
);

$the_post_id = get_the_ID();
$index = $args['index'];

?>

<div class="cya-image" data-index="<?php echo $index; ?>">
    <div class="cya-image__image">
        <?php echo get_the_post_thumbnail(); ?>
    </div>
</div>