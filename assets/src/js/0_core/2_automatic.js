import { smDevice, smSetCookie, smGetCookie } from '../../../../../../plugins/salemoche-wordpress-essentials/assets/src/js/helpers';

let topMarquee;
let bottomMarquee;

window.salemoche.device = smDevice;

console.log(window.salemoche.device);

if (window.innerWidth <= 1280 && window.innerWidth >= 414 && window.salemoche.device.client.name.toLowerCase() == 'safari' ) {
    window.salemoche.lowHardwareMode = true;
    console.log('low hardware mode');
}

(function($) {
 
    window.addEventListener("load", function() {
        // $('.sm-loading').removeClass('visible');
    });

    $(document).on('ready', () => {

        
        /**========================
        *	Basic Settings
        *========================*/
        
        window.salemoche.device = smDevice;
        $('body').removeClass('inactive');
        const isFrontPage = window.location.pathname == '/cyaan/' || window.location.pathname == '/';

        if (window.salemoche.lowHardwareMode && !isFrontPage) {
            $('.cya-landing').remove();
        }

        //======================
        // Call Functions
        //======================

        setTimeout(() => {
            calculateBreakpoint();
            aboutMarquee();
            lowHardwareMode();

            setInterval(() => {
                topMarquee.remove();
                bottomMarquee.remove();
                aboutMarquee();
            }, 60000);
        }, 0);

        $(window).on('resize', function () {
            calculateBreakpoint();
            lowHardwareMode();
        })
        

        //======================
        // Page Mode
        //======================

        
        let imageMode = window.location.href.includes('medium') ? 'medium' : (window.location.href.includes('small') ? 'small' : 'large');
        window.salemoche.imageMode = imageMode;

        // set page mode according to the url or the input size

        // Create Image Mode Event
        var imageModeEvent = document.createEvent("Event");
        imageModeEvent.initEvent("Image Mode",true,true);

        window.salemoche.pageMode = (size) => {

            size = window.salemoche.currentBreakpoint == 'small' && size == 'small' ? 'medium' : size;
            let pImageMode = window.salemoche.imageMode
            if (isFrontPage && size != 'large') window.location.href = `#${size}`;
            window.salemoche.imageMode = size;
            const { imageMode } = window.salemoche
            let images = $('.cya-gallery-image');
            $('.cya-sizes').find('.cya-navigation-control-sizes').html(size);

            if (!isFrontPage) return;

            if (imageMode == 'large' || imageMode == 'small') {

                setTimeout(() => {
                    $('html').scrollTop(window.salemoche.focusElement?.offset()?.top);
                }, 500);
            } else if (imageMode == 'medium') {
                setTimeout(() => {
                    $('html').scrollTop(0);
                }, 500);
            }

            if (imageMode == 'small') {

                $('.cya-image__info-box').removeClass('fixed')
            }


            $(".cya-home__images").animate({ opacity: 0 }, {duration: 300}); 

            setTimeout(() => {

                // Add Classes to the Image Container and the html element
                $('html, .cya-home__images').removeClass(['image-mode-small', 'image-mode-medium', 'image-mode-large']);
                $('html, .cya-home__images').addClass('image-mode-' + imageMode);
                
                // Add Classes to the current menu element
                $('.cya-sizes__item').removeClass('cya-navigation-item--current');
                $(`.cya-sizes__item button[data-size="${imageMode}"]`).parent().addClass('cya-navigation-item--current');

                $(".cya-home__images").animate({ opacity: 1 }, {duration: 300}); 
                imageModeEvent.imageMode = imageMode;
                imageModeEvent.pImageMode = pImageMode;
                imageModeEvent.currentIndex = window.salemoche?.focusElement?.data('total-index') || 0;
                document.dispatchEvent(imageModeEvent);
            }, 400);


            console.log(
                `The Image Mode is ${window.salemoche.imageMode}`,
                // `The Focus Element is ${window.salemoche.focusElement.attr('data-total-index')}`, 
                window.salemoche.focusElement
                )


        }

        // call function
        window.salemoche.pageMode(imageMode)


        //======================
        // Body Classes
        //======================

        $('body').addClass(`body-${smDevice.client.name}`);

        //======================
        // Cookies
        //======================

        // if (smGetCookie('allow cyaan cookies') != 'true') {
        //     smSetCookie('allow cyaan cookies', 'true', 10);
        //     confirm('allow cookies please');
        // } else {
        //     console.log('has allowed cyaan cookies')
        // }

        // smSetCookie('allow cyaan cookies', 'false', 10);


        //======================
        // Breakpoints
        //======================
        
        function calculateBreakpoint() {
            if (window.innerWidth >= window.salemoche.breakpoints.large) {
                window.salemoche.currentBreakpoint = 'xlarge';
            } else if (window.innerWidth <= window.salemoche.breakpoints.small) {
                window.salemoche.currentBreakpoint = 'small';
            } else if (window.innerWidth <= window.salemoche.breakpoints.medium) {
                window.salemoche.currentBreakpoint = 'medium';
            } else if (window.innerWidth <= window.salemoche.breakpoints.large) {
                window.salemoche.currentBreakpoint = 'large';
            } else {
                window.salemoche.currentBreakpoint = 'small';
            }
        }

        //======================
        // About Marquee
        //======================
        
        function aboutMarquee () {
            topMarquee = $('.cya-about-top').clone().appendTo($('.cya-about-marquee'));
            bottomMarquee = $('.cya-about-bottom').clone().appendTo($('.cya-about-marquee'));

            if (window.salemoche.lowHardwareMode) {
                topMarquee.remove();
                bottomMarquee.remove();
                return
            }

            let content = window.salemoche.pageVariables.about;
            wordMarquee(topMarquee, content);
            wordMarquee(bottomMarquee, content);
        }
        
        function wordMarquee(marquee = $('sm-word-marquee'), content = []) {
            populateMarquee(marquee, content);
        }
        
        function populateMarquee(marquee, content) {
            let randomValue = Math.floor(Math.random() * content.length);
            let index = 0;
            index = index + randomValue;
            
            for (let i = 0; i < 10; i++) {
                
                index = content[index] ? index : 0;
                let marqueeItem = `<div class="sm-marquee-item">${content[index]}</div>`;
                
                marquee.append(marqueeItem);
                index ++;
            }
            
            const margin = 10;

            $('.sm-marquee-item').each( function () {
                let that = $(this);
                let itemIndex = that.index();
                let left = 0;
                let siblings = that.siblings()
                
                siblings.each(function () {
                    let sibling = $(this);
                    
                    if (sibling.index() > itemIndex) {
                        left += sibling.width() + margin;
                    } 
                });
                
                that.css('left', left);
                endless(that, itemIndex, siblings)
            })

            function endless(element, itemIndex, siblings) {
    
                let nextElement = siblings[index - 1] ? siblings[index - 1] : siblings[siblings.length - 1];

                element.animate({
                    left: "-=5",
                }, {
                    duration: '10000',
                    easing: 'linear',
                    step: function(now, fx) {
                        // console.log(fx);
                        let position = element.position().left;
                        let width = element.width();

                        if (position + width < 0) {

                            element.stop();

                            setTimeout(() => {
                                // let newElement = element.clone().appendTo(element.parent())
                                // endless(newElement);
                                // element.remove();
                                let nextPosition = nextElement.offsetWidth + nextElement.offsetLeft + margin;
                                element.css('left', nextPosition);
                                endless(element, itemIndex, siblings);
                            }, 300);
                            
                        }
                    },
                    done: function() {
                        endless(element, itemIndex, siblings);
                    }
                });
            }
            
        }

        //======================
        // Menu Order
        //======================

        $('.cya-menu__item').each(function () {
            const idFragment = $(this).attr('id').replace('cya-menu__item-', '');
            if (window.location.href.includes(idFragment)) {
                if (window.salemoche.currentBreakpoint == 'large') {
                    $('.cya-menu__item').css('order', '0');
                    $(this).css('order', '-1');
                } else {
                    $('.cya-menu__item').css('opacity', '1');
                    // $('.cya-menu__item').css('pointer-events', 'all'); ?
                    $('.cya-menu__item').css('order', '0');
                    // $(this).css('opacity', '0');
                    $(this).css('pointer-events', 'none');
                    $(this).css('order', '-1');
                }
            }
        })

        /**
        *========================================
        *	
        *	Landing Video
        *	
        *========================================
        */
        
        const landingVideo = $('.cya-landing__video video');
        if (!landingVideo[0]) return
        landingVideo[0].onloadeddata = () => {
            landingVideo.addClass('visible');
        }

        setTimeout(() => {
            landingVideo.addClass('visible');
        }, 3000);
        
        const landingImage = $('.cya-landing__video img');
        landingImage.on('load', () => {
            landingImage.addClass('visible');
        });

        setTimeout(() => {
            landingImage.addClass('visible');
        }, 300);

        
        /**========================
        *	Small Screen Mode
        *========================*/
        function lowHardwareMode () {
            if (window.salemoche.lowHardwareMode) {
                landingVideo.remove();
            }
        };
        
    })
    
})(jQuery)