<?php
/**
*========================================
*	
*	Variables
*
*   @package Scientifica
*
*========================================*/


/**
*========================================
*	
*	Create JS Variables from Post Meta
*
*========================================*/

$variables = [];

// // The Query
// $args = [
//     'post_type'		=>	'page'
// ];
// $query = new WP_Query( $args );

// $variable_index = 1;

// // The Loop
// if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();

//     $variable_name = $post->post_name;
//     $variable = [
//         'id' => get_the_ID()
//     ];

//     $variables[$variable_name] = $variable;
//     $variable_index ++;

// endwhile; endif; wp_reset_postdata();

// The Loop
if ( have_posts() ) : while ( have_posts() ) : the_post();

    // $about = explode("<br>",  get_field( 'about_sentences', 22 ), 0);
    $about = preg_split('/<br[^>]*>/i', get_field( 'about_sentences', 'option' ));
    
    $variables['about'] = $about;

endwhile; endif; wp_reset_postdata();
?>

<script>
    window.salemoche = {...window.salemoche}
    window.salemoche.pageVariables = <?php echo json_encode($variables) ?>; 
    
    // Object.keys(window.variables).forEach((variable, index) => {
    //     let id = window.variables[variable].id;
    //     let colors = window.variables[variable].colors;

    //     document.documentElement.style.setProperty(`--color-${id}-light`, colors.light);
    // });

</script>