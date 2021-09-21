(function($) {


    $(document).on('ready', () => {

        let hasAdminBar = $('body').hasClass('admin-bar');
        let adminSpacer = hasAdminBar ? (window.salemoche.currentBreakpoint == 'small' ? 46 : 32) : 0;

        // console.log(hasAdminBar, adminSpacer)

        window.salemoche.focusElement = $('#cya-image-1-1');

        //======================
        //	Call Functions
        //======================

        setTimeout(() => {
            sizes();
            makeFullHeight($('.cya-about-marquee'))
        }, 0);

        $(window).on('resize', function () {
            sizes();
            makeFullHeight($('.cya-about-marquee'))
        })
        

        //======================
        //	Sizes
        //======================

        function sizes () {
            window.salemoche.headerHeight = $('header').height();
            // cookieSizing();
            contentSizing();
            twoColumn();
            sliderSizing();
            positionIndexImages()
        }

        function makeFullHeight(element, min = false) {
            if (min) {
                element.css('min-height', window.innerHeight - adminSpacer);
            } else {
                element.css('height', window.innerHeight - adminSpacer);
            }

            if (hasAdminBar) {
                element.css('top', adminSpacer);
            }
        }

        function cookieSizing () {
            $('.sm-cookie-text').css('top', $('.cya-menu').height() + adminSpacer);
            $('.sm-cookie-text').css('height', window.innerHeight - $('.cya-menu').height() + adminSpacer);
        }

        function contentSizing () {
            // $('body:not(.home, .cya-about):not(.home, .cya-about)').find('.cya-content:not(.cya-about, .cya-imprint)').css('padding-top', $('.cya-navigation-control').height() + adminSpacer + 20);
            // $('body:not(.home, .cya-about):not(.home, .cya-about)').find('.cya-content:not(.cya-about, .cya-imprint)').css('padding-bottom', $('.cya-footer-container').height() + adminSpacer);
            $('.cya-imprint .cya-imprint-button-top').css('margin-bottom', $('.cya-navigation-control').height() + adminSpacer + 20);
            $('.cya-imprint').css('padding-bottom', $('.cya-navigation-control').height() + adminSpacer);
        }

        function twoColumn () {
            $('.cya-column-left').css('width', $('.cya-menu').width());
        }

        function sliderSizing() {
            // $('.image-mode-medium .cya-home.cya-image').css('padding-top', $('.cya-navigation-sizes')[0].offsetHeight + $('.cya-navigation-sizes')[0].offsetTop)
            // $('.image-mode-medium .cya-home.cya-image').css('padding-bottom', $('.cya-home__info__button')[0].offsetHeight + 20)
        }

        /**
        *========================================
        *	
        *	Index
        *	
        *========================================
        */
        function positionIndexImages() {
            $('.cya-index-projects__project').each(function() {
                let row = $(this);
                let indexInfoHeight = row.find('.index-project-meta-info')[0] ? row.find('.index-project-meta-info')[0].scrollHeight + 5 : 10;
                let indexImage = row.find('.index-project-meta-image');

                indexImage.css('top', indexInfoHeight);

                // console.log(indexInfoHeight);
            })
        }


    })

})(jQuery)