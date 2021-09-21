/**
*========================================
*	
*	Slick Slider
*	
*========================================
*/


import '../../../../../plugins/salemoche-wordpress-essentials/assets/node_modules/slick-carousel/slick/slick';
import '../../../../../plugins/salemoche-wordpress-essentials/assets/src/scss/slick.scss';

(function($) {

    $(document).on('ready', () => {

        addAllSliders('.sm-slider');
        changeSlideOnClick('.sm-slider');

        function addAllSliders(slider = '.sm-slider') {

            $(slider).each( function () {
                let id = $(this).attr('id'); 
                if (!id.split('sm-slider-')[1]) return

                let index = parseInt(id.split('sm-slider-')[1]);

                $(`#sm-slider-${index}`).slick({
                    adaptiveHeight: true
                });
            })
        }

        function changeSlideOnClick (slider = '.sm-slider', container = '.sm-slider-container') {
            $(slider).each( function () {
                $(this).on('click', function (e) {
                    if (e.offsetX > $(this).width()/2) {
                        $(this).slick('slickNext');
                    } else {
                        $(this).slick('slickPrev');
                    }
                })
            })


            $(container).each( function () {

                let thisContainer = $(this);

                $(this).find(slider).on('afterChange', function () {
                    let currentSlide = $(this).slick('slickCurrentSlide');
                    // console.log(thisContainer, thisContainer.find('.sm-slider-counter__current'))
                    thisContainer.find('.sm-slider-counter__current').text(currentSlide + 1);
                })
            })

            $(slider).on('mousemove', function (e) {
            
                if (e.offsetX > $(this).width()/2) {
                    $(slider).find('img').addClass('next');
                } else {
                    $(slider).find('img').removeClass('next');
                }
            })
        }
    })

})(jQuery)