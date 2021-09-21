<?php
/**
*========================================
*	
*	Imprint
*
*   @package Cyaan
*
*========================================*/

$imprint_id = 24;


?>          
<div class="cya-imprint-container">
    <div class="cya-imprint cya-two-column cya-content">
        <button class="cya-imprint-button cya-imprint-button-close cya-imprint-button-top cya-imprint-button-top-close cya-button"><?php echo get_the_title($imprint_id); ?></button>
        <button class="cya-imprint-button cya-imprint-button-scroll cya-imprint-button-top cya-imprint-button-top-scroll cya-button">scroll ↑</button>
        <div class="cya-column cya-column-left"></div>
        <div class="cya-column-right cya-imprint__content">
            <?php echo get_the_content('', false, $imprint_id); ?>
        </div>
        <button class="cya-imprint-button cya-imprint-button-close cya-imprint-button-bottom cya-button">X</button>
    </div>  
</div>