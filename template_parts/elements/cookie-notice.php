<?php
/**
*========================================
*	
*	Cookie Notice
*
*   @package Cyaan
*
*========================================*/

?>

<div class="sm-cookie-notice">
    <div class="sm-cookie-notice__content">
        <?php the_field( 'cookie_notice', 'option' );?>
    </div>
    <div class="sm-cookie-notice__control">
        <button class="sm-cookie-notice__control__accept cya-button cya-button">
            <?php the_field( 'cookie_accept', 'option' );?>
        </button>
        <button class="sm-cookie-notice__control__learn-more cya-button cya-button">
            <?php the_field( 'cookie_learn_more', 'option' );?>
        </button>
    </div>
</div>