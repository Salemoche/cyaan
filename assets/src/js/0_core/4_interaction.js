import { smSetCookie, smGetCookie } from '../../../../../../plugins/salemoche-wordpress-essentials/assets/src/js/helpers';

(function($) {

    $(document).on('ready', () => {

        //======================
        //	Cookie Notice
        //======================

        if (window.location.href.includes('#large') || window.location.href.includes('#medium') || window.location.href.includes('#small')) {
            enterSite();
        } else if ($('.cya-landing').length != 0) {
            $('html').css('overflow', 'hidden');
            $('.cya-navigation').addClass('invisible');
            $('.cya-landing').on('click', () => {
                enterSite();
                // handleEnter();
            })
        } else {
            setTimeout(() => {
                enterSite();
                // handleEnter();
            }, 2000);

        }

        function handleEnter() {

            // // smSetCookie('allow cyaan cookies', 'false', 10);
            // // var theCookies = document.cookie.split(';');
            // // var aString = '';
            // // for (var i = 1 ; i <= theCookies.length; i++) {
            // //     aString += i + ' ' + theCookies[i-1] + "\n";
            // // }
            // // console.log( aString);

            // // // debug
            // // showCookieNotice();

            // if (smGetCookie('allow cyaan cookies') != 'true') {
            // // if (true) {
            //     showCookieNotice();
            // } else {
            // enterSite();
            // }


        }

        function showCookieNotice () {
            $('.sm-cookie-notice').addClass('active');
            $('.primary').addClass('cookie-notice');
            $('.sm-marquee').removeClass('landing');
            $('.cya-landing__enter').css('opacity', 0);
            $('.cya-landing__enter').css('animation', 'none');

            $('.sm-cookie-notice__control__accept').on('click', () => {
                enterSite();
            })

            $('.sm-cookie-notice__control__learn-more').on('click', () => {
                showLearnMore();
            })
        }

        function showLearnMore() {
            $('.sm-cookie-text').addClass('active');
            $('.sm-cookie-notice').removeClass('active');

            $('.sm-cookie-text__accept').on('click', () => {
                enterSite();
            })
        }

        //======================
        //	Enter Site
        //======================

        function enterSite () {
            smSetCookie('allow cyaan cookies', 'true', 1);
            $('.sm-marquee').removeClass('landing');
            $('.primary').removeClass('cookie-notice');
            $('.cya-landing').removeClass('active');
            $('.sm-cookie-notice').removeClass('active');
            $('.sm-cookie-text').removeClass('active');
            $('html').attr('style', '');
            $('.cya-sizes').removeClass('invisible');
            $('.cya-navigation').removeClass('invisible');

            setTimeout(() => {
                $('.cya-landing').remove();
                $('.sm-cookie-notice').remove();
                $('.sm-cookie-text').remove();
            }, 1000);
        }

        //======================
        //	Info
        //======================

        window.salemoche.showInfo = false;

        $('.cya-info-button').on('click', function () {
            const infoBox = $('.cya-info-box, .info-box-slider');
            const sliderCounters = $('.sm-custom-slider-counter');
            window.salemoche.showInfo = !window.salemoche.showInfo;
            let showInfo = window.salemoche.showInfo;
            if (showInfo) {
                $(this).text('X');
            } else {
                $(this).text('INFO');
            }
            
            infoBox.toggleClass(['visible']);
            sliderCounters.toggleClass(['visible']);
        })

        $('.cya-image').on('mousemove', function (e) {
            if (window.salemoche.imageMode != 'small' || !window.salemoche.showInfo) return;
            const infoBox = $(this).find('.cya-info-box');
            infoBox.addClass(['visible-small']);
            infoBox.css('left', e.offsetX)
            infoBox.css('top', e.offsetY)

            // console.log(e.pageX)

            if (e.pageX > window.innerWidth / 2) {
                infoBox.addClass(['reverse']);
            } else {
                infoBox.removeClass(['reverse']);
            }
        })

        $('.cya-image').on('mouseleave', function () {
            if (window.salemoche.imageMode != 'small') return;
            const infoBox = $(this).find('.cya-info-box');
            infoBox.removeClass(['visible-small']);
            infoBox.css('left', '50%')
            infoBox.css('top', '50%')
        })

        //======================
        //	Menu
        //======================

        const menuNavigation = $('.cya-menu');
        const sizesNavigation = $('.cya-sizes');

        handleNavigation(menuNavigation);
        handleNavigation(sizesNavigation);

        // change text of controll button
        sizesNavigation.find('.cya-navigation-control-sizes').html(window.salemoche.imageMode);

        sizesNavigation.find('button').each( function() {
            const button = $(this);
            const size = button.data('size');
            if (!size) return

            button.on('click', function () {
                sizesNavigation.find('.cya-navigation-control-sizes').html(size);
                window.salemoche.pageMode(size);
            })
        })


        // Show and Hide Menu on hover
        
        function handleNavigation (navigation) {
            const control = navigation.find('.cya-navigation-control');
            const navigationItems = navigation.find('.cya-navigation-item:not(.cya-navigation-control)');
            let isHovering = false;


            control.on('mouseenter', function () {
                if (window.salemoche.currentBreakpoint == 'small') return
                navigation.addClass('active');
                isHovering = true;
                // console.log('over', window.salemoche.currentBreakpoint);
            })

            navigation.on('mouseover', function () {
                if (window.salemoche.currentBreakpoint == 'small') return
                navigation.addClass('active');
                isHovering = true;
            })

            navigation.on('mouseleave', function () {
                if (window.salemoche.currentBreakpoint == 'small') return
                isHovering = false;

                setTimeout(() => {
                    if(!isHovering) navigation.removeClass('active');
                }, 500);
            })

            control.on('click', function () {
                if (window.salemoche.currentBreakpoint != 'small') return
                navigation.toggleClass('active');
                isHovering = true;
            })
        }

        //======================
        //	Image Mode
        //======================

        $('.cya-image__image').on('click', function (e) {
            if ( window.salemoche.imageMode == 'small' ) {
                window.salemoche.focusElement = $(this).parent();
                window.salemoche.pageMode('medium');
            } else if ( window.salemoche.imageMode == 'medium' ) {

                const moveSliderThreshold = window.innerWidth / 3;
                if (e.pageX < window.innerWidth - moveSliderThreshold && e.pageX > moveSliderThreshold) {
                    window.salemoche.focusElement = $(this).parent();
                    window.salemoche.pageMode('large');
                }
            } else if ( window.salemoche.imageMode == 'large' ) {
                window.salemoche.focusElement = $(this).parent();
                window.salemoche.pageMode('small');
            }
        })


        /**
        *========================================
        *	
        *	Imprint
        *	
        *========================================
        */
        
        $('.cya-imprint-button-close').on('click', function () {
            $('.cya-imprint-container').toggleClass('active');
            $('html').toggleClass('show-imprint');
        })
        
        $('.cya-imprint-button-scroll').on('click', function () {
            // console.log('scroll')
            $(".cya-imprint-container").animate({ scrollTop: 0 }); 
        })

        /**
        *========================================
        *	
        *	Video
        *	
        *========================================
        */

        const videos = document.querySelectorAll('video');
        
        $('.cya-video').each(function () {
            const that = $(this);
            const video = that.find('video')[0];
            const videoButton = $('.cya-video__button');
            let isPlaying = false;

            if (window.innerWidth > 768) {
                isPlaying = true;
            } else {
                that.append(videoButton);
            }

            $(video).on('click', () => {
                
                videos.forEach(video => {
                    video.pause()
                });

                if (isPlaying) {
                    video.pause();
                } else {
                    video.play();
                }

                videoButton.toggleClass('hidden');

                isPlaying = !isPlaying;
            })
        })

        /**
        *========================================
        *	
        *	Page Transitions
        *	
        *========================================
        */
        
        $('a').on('click', function(e) {
            if (e.target.target == "_blank" || e.target.href.includes == "mailto") return
            
            if (window.salemoche.currentBreakpoint != 'small') {

                const link = e.target.href;
                const isWork = $(e.target).parent('#cya-menu__item-work').length;

                e.preventDefault();
                // console.log('prevented redirect!');
                $('body').addClass('inactive');

                if(window.location.href.includes('#') && isWork) {
                    $('body').removeClass('inactive');
                    window.salemoche.pageMode('large');
                } else {

                    setTimeout(() => {
                        window.location.href = link;
                        // console.log(e.target, 'redirecting to ' + link);
                    }, 300);
                }

            } else if ($(this)) {
                $('.cya-navigation-menu').toggleClass('active');
            }
        })

        // $('#cya-menu__item-work').on('click', function() {
        //     setTimeout(() => {
        //         $('body').removeClass('inactive');
        //         console.log('removing')
        //     }, 100);
        // })

        /**
        *========================================
        *	
        *	Index
        *	
        *========================================
        */
        
        indexItemSizes();

        function indexItemSizes() {
            $('.cya-index-projects__project').each(function() {
                const itemHeight = $(this).find('.cya-index-projects__project__link').height();

                $(this).on('mouseenter', function() {
                    $(this).find('.index-project-meta-info').css('opacity', 1);
                    
                    // console.log(itemHeight)
                })
                
                $(this).on('mouseleave', function() {
                    $(this).find('.index-project-meta-info').css('opacity', 0);
                    
                    // console.log(0)
                })

            })
        }

    })

})(jQuery)