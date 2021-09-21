<?php
/**
*========================================
*	
*	Index Template
*
*   @package CyaanNamespace
*
*========================================*/

?>

<div class="cya-content cya-index cya-two-column">
    <table class="cya-index-projects">

        <?php
        if( have_rows('projects') ): while( have_rows('projects') ) : the_row(); if(!empty(get_sub_field( 'project' ))) :
        $post_id = get_sub_field( 'project' )->ID;
        // echo '<hr><pre class="sm-debug">';
        // print_r(get_field(''));
        // echo '</pre><hr>';
        // wp_die();
        ?>
            <tr class="cya-index-projects__project index-project">
                <td class="cya-column cya-column-left index-project-meta">
                    <div class="cya-index-project-meta-container">
                        <div class="cya-column index-project-meta-info">
                            <?php the_field('index_information', $post_id)  ?>
                        </div>
                        <div class="cya-column index-project-meta-image">
                            <?php echo get_the_post_thumbnail( $post_id, 'medium' )  ?>
                        </div>
                    </div>
                </td>
                <td class="cya-column cya-column-right">
                    <a href="<?php the_field('project_link', $post_id) ?>" target="_blank" class="cya-index-projects__project__link">
                        <?php echo get_sub_field( 'project' )->post_title; ?>
                    </a>
                </td>
            </tr>
            <?php endif; endwhile; endif; ?>
        </div>
    </table>
</div>
