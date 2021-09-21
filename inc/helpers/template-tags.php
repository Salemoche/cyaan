<?php

function get_the_post_custom_thumbnail( $post_id, $size = 'featured-thumbnail', $additional_attributes = [] ) {
    if ( $post_id === null ) {
        $post_id = get_the_ID();
    }

    if ( has_post_thumbnail( $post_id ) ) {
        $default_attributes = [
            'loading' => 'lazy'
        ];

        $attributes = array_merge( $additional_attributes, $default_attributes );  

        $custom_thumnail = wp_get_attachment_image(
            get_post_thumbnail_id( $post_id ),
            $size,
            false,
            $attributes
        );
    }

    return $custom_thumnail;
}

function the_post_custom_thumbnail ( $post_id, $size = 'featured-thumbnail', $additional_attributes = [] ) {
    echo  get_the_post_custom_thumbnail( $post_id, $size, $additional_attributes );
}

function cyaan_posted_on () {
    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

    if (get_the_time( 'U' ) != get_the_modified_time( 'U' ) ) {
        $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
    }

    $time_string = sprintf(
        $time_string,
        // get_the_date( DATE_RFC7231 ),
        esc_attr(get_the_date( DATE_W3C )),
        esc_attr(get_the_date( )),
        esc_attr(get_the_modified_date( DATE_W3C )),
        esc_attr(get_the_modified_date( ))
    );

    // echo $time_string;

    $posted_on = sprintf(
        esc_html_x( 'Posted on %s', 'post date', 'cyaan'),
        '<a href="' . esc_url( get_the_permalink()) . '" rel="bookmark">' . $time_string . '</a>'
    );

    echo '<span class="posted-on text-secondary">' . $posted_on . '</span>';
}

function cyaan_posted_by () {
    $byline = sprintf(
        esc_html_x( ' by %s', 'post author', 'cyaan'),
        '<span class="author vcard"><a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) )) . '">' . esc_html(get_the_author_meta( 'display_name' )) . '</a></span>'
    );

    echo '<span class="byline">' . $byline . '</span>';
}

function cyaan_the_exerpt ($trim_character_count = 0) {
    if (!has_excerpt() || $trim_character_count === 0) {
        the_excerpt();
        return;
    } 
    
    $excerpt = wp_strip_all_tags( get_the_excerpt() );
    $excerpt = substr( $excerpt, 0, $trim_character_count);
    $excerpt = substr( $excerpt, 0, strpos( $excerpt, ' ')); //ends on the end of a word

    echo $excerpt . " ..."; 
}

function cyaan_read_more ( $more = '' ) {
    if (!is_single()) {
        $more = sprintf(
            '<button class="mt-4 btn btn-info"><a href="%1$s">%2$s</a></button>',
            get_permalink( get_the_ID() ),
            __('Read more', 'cyaan')
        );
    }

    echo $more;
}

function cyaan_pagination () {

    $allowed_tags = [
        'a' => [
            'class' => [],
            'href' => []
        ],
        'span' => [
            'class' => []
        ]

    ];

    $args = [
        'before_page_number' => '<span class="btn btn-secondary border mb-2 mr-2">',
        'after_page_number' => '</span>'
    ];

    printf( '<nav class="cyaan-pagination clearfix>%s</nav>', wp_kses( paginate_links( $args ), $allowed_tags ));
}

function cyaan_get_post_meta ( $the_post_id ) {

    $author_id = get_the_author_meta( 'ID' );

    return [
        'id'                => $the_post_id,
        'excerpt'           => get_the_excerpt( $the_post_id ),
        'lead'              => get_field( 'post_lead', $the_post_id ) ?: '',
        'meta'              => get_post_meta( $the_post_id ),
        'categories'        => salemoche_get_categories( $the_post_id ),
        'category_slugs'    => wp_list_pluck( salemoche_get_categories( $the_post_id ), 'slug' ),
        'tags'              => salemoche_get_tags( $the_post_id ),
        'tag_slugs'         => wp_list_pluck( salemoche_get_tags( $the_post_id ), 'slug' ),
        'date'              => get_the_date( 'D, d.m.y', $the_post_id ),
        'author'        => [
            'first_name'        =>  get_the_author_meta('first_name', $author_id),
            'last_name'         =>  get_the_author_meta('last_name', $author_id),
            'full_name'         =>  get_the_author_meta('first_name', $author_id) . ' ' . get_the_author_meta('last_name', $author_id),
            'posts_url'         =>  get_author_posts_url( $author_id),
            'url'               =>  get_the_author_link('link', $author_id)
        ],
    ];
}