<?php
/**
*========================================
*	
*	Cookie Text
*
*   @package Cyaan
*
*========================================*/

?>

<div class="sm-cookie-text sm-cookie-container">
    <button class="sm-cookie-text__accept sm-cookie-notice__control__accept cya-button cya-button">
        <?php the_field( 'cookie_accept', 'option' );?>
    </button>
    <div class="sm-cookie-text__content">
        <?php the_field( 'cookie_text', 'option' );?>
    </div>
</div>