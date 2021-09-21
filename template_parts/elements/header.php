<?php
/**
 * Creates the Navigation Menu
 * 
 * @package CyaanNamespace
 */

$menu_class = CyaanNamespace\classes\Menus::get_instance();
$header_menu_id = $menu_class->get_menu_id('cyaan-header-menu');
$header_menu = wp_get_nav_menu_items( $header_menu_id );
$the_post_id = $post ? $post->ID : 0;
$languages = [];
if (function_exists('icl_get_languages')) {
    $languages = icl_get_languages();
}
?>

<nav class="navbar cya-navigation sm-row">
    <!-- < ?php if (function_exists( 'the_custom_logo')) {
        the_custom_logo();
    } ?>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button> -->

    <?php
    if ( !empty( $header_menu ) && is_array( $header_menu) ) :
        ?>
        <div class="cya-menu cya-navigation-menu">
            <button class="cya-button cya-navigation-control cya-navigation-control-menu">MENU</button>
            <ul class="cya-navigation-menu__list" id="header-menu">
                <?php 
                foreach ( $header_menu as $menu_item ) :
                    if( !$menu_item->menu_item_parent ) :

                        $child_menu_items = $menu_class->get_child_menu_items($header_menu, $menu_item->ID);
                        $has_children = is_array($child_menu_items) && !empty( $child_menu_items );
                        $related_post_id = $menu_item->object_id;
                        $is_current_class = $related_post_id == $the_post_id ? "cya-navigation-item--current" : "";
                            ?>
                            <li class="cya-navigation-item cya-menu__item <?php echo $is_current_class; ?>" id="cya-menu__item-<?php echo strtolower($menu_item->title); ?>">
                                <a class="cya-menu__item__link cya-button" href="<?php echo esc_url( $menu_item->url ) ?> "><?php echo esc_html( $menu_item->title )?></span></a>
                            </li>
                        <?php
                    endif;
                endforeach;
                ?>
            </ul>
        </div>
        <?php
    endif;
    ?>
    <!-- <div class="cya-navigation-cookies">
        <div class="cya-navigation-cookies__content">
            < ?php the_field( 'cookie_notice', 'option' );?>
        </div>
    </div> -->
    <?php get_template_part('template_parts/elements/cookie-notice'); ?>
    <div class="cya-navigation-sizes cya-sizes invisible">
        <button class="cya-button cya-navigation-control cya-navigation-control-sizes">Control</button>
        <ul class="cya-navigation-sizes__list">
            <li class="cya-navigation-item cya-sizes__item"><button href="<?php echo untrailingslashit(get_home_url()) ?>/&large" class="cya-sizes__item__link cya-button" data-size="large"><?php the_field( 'large_button_label', 'option' )?></button></li>
            <li class="cya-navigation-item cya-sizes__item"><button href="<?php echo untrailingslashit(get_home_url()) ?>/&medium" class="cya-sizes__item__link cya-button" data-size="medium"><?php the_field( 'medium_button_label', 'option' )?></button></li>
            <li class="cya-navigation-item cya-sizes__item"><button href="<?php echo untrailingslashit(get_home_url()) ?>/&small" class="cya-sizes__item__link cya-button" data-size="small"><?php the_field( 'small_button_label', 'option' )?></button></li>
        </ul>
    </div>
</nav>