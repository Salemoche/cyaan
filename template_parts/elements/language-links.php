<?php
/**
*========================================
*	
*	Tile Template
*
*   @package BGE
*
*========================================*/


$args = wp_parse_args(
    $args,
    array(
        'languages'   => []
    )
);
    $languages = $args['languages'];
    $language_codes = wp_list_pluck( $languages, 'code' );

    // echo '<hr><pre class="sm-debug">';
    // print_r($languages);
    // echo '</pre><hr>';
    // wp_die();

?>

<li class="header-menu__list__item header-menu__list__item-languages">
    <div class="header-menu__list__item__label">
        <?php echo implode('/', $language_codes) ?> 
    </div>
    <ul class="header-menu__list__item__submenu">
        <?php
        foreach ( $languages as $language ) :
            ?>
            <li class="header-menu__list__item__submenu__item submenu-item <?php echo $is_current_class; ?>">
                <a class="menu-item__link menu-subitem__link" href="<?php echo esc_url( $language['url'] ) ?>"><?php echo esc_html( $language['code'] ) ?></a>
            </li>
            <?php
        endforeach;
        ?>
    </ul>

</li>