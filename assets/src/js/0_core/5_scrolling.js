(($) => {
    $(document).on('ready', () => {
        checkCurrentImage();
        let scrollDist = $('html').scrollTop();

        //======================
        //	Scrolling Functions
        //======================
        
        $(window).on('scroll', () => {
            scrollDist = $('html').scrollTop();
            checkCurrentImage();
            elementScrolledInView ($('.cya-footer'), 0 - ($('.cya-footer').height() + $('.cya-info-button').height()), toggleFooter);
        });

        $('.cya-imprint-container').on('scroll', () => {
            if($('.cya-imprint-container').scrollTop() > 44) {
                $('.cya-imprint-button-top-scroll').addClass('visible');
            } else {
                $('.cya-imprint-button-top-scroll').removeClass('visible');
            }
        });

        $('a[href^=\\#]').click((e) => {
            e.preventDefault();
            let targetId = e.target.href.split("#")[1];

            scrollTo('#' + targetId);
        })

        function fromBottom() {
            return $('html').height() - window.innerHeight - scrollDist;
        }

        function scrollTo(element) {
            let displacer = window.salemoche.currentBreakpoint == 'small' ? 68 : 144;
            let position = $(`${element}`).position().top;
            $("body").animate({ scrollTop: position - displacer }); 
        }

        function toggleElement(selector, method, distance) {

            if (method == 'top') {
                if (scrollDist > distance) {
                    $(selector).addClass('visible');
                } else {
                    $(selector).removeClass('visible');
                }
            } else if (method == 'bottom') {
                if (fromBottom() < distance) {
                    $(selector).addClass('visible');
                } else {
                    $(selector).removeClass('visible');
                }
            }
        }
        
        function elementScrolledInView (element = $(''), offset = 0, callback = () => {}) {

            let windowTop = scrollDist;
            let windowBottom = windowTop + window.innerHeight;
            let scrolledPastDist = windowBottom - offset - element.position().top;
            let scrolledPastPercent = scrolledPastDist / element.height() * 100;
            // console.log(scrolledPastDist, element.height())

            if (windowBottom - offset  >= element.position().top && windowTop + offset  <= element.position().top + element.height() ) {
                callback({element: element, inView: true, scrolledPastDist: scrolledPastDist, scrolledPastPercent: scrolledPastPercent });
            } else if (true) {
                callback({element: element, inView: false});
            }
        }

        function checkElementsInView(elements = null, base = 'window', triggerPosition = window.innerHeight / 2) {

            // Returns an array with all 'elements' that are in the viewport and if they are completely visible

            let baseTop;
            let baseBottom;

            if (base != 'window') {
                baseTop = scrollDist + base.offset().top;
                baseBottom = baseTop + base.height();
            } else {
                baseTop = scrollDist;
                baseBottom = scrollDist + window.innerHeight;

            }

            let elementsInView = [];

            if (!elements) {
                return;
            } else {

                elements.each( function () {
                    let element = $(this);
                    let elementTop = element.position().top;
                    let elementBottom = element.position().top + element.height();
                    let elementObject = {}
                    if (elementTop > baseTop && elementTop < baseBottom || elementTop < baseTop && elementBottom > baseTop ) {
                        elementObject.inView = true;
                        elementObject.id = element.attr('id');

                        // Returns true once the element is within bounds

                        if (elementTop > baseTop && elementBottom < baseBottom) {
                            elementObject.full = true;
                        } else {
                            elementObject.full = false;
                        }

                        // Returns true once the top is over a certain Position

                        if (elementTop < baseTop + triggerPosition) {
                            elementObject.overTrigger = true;
                        } else {
                            elementObject.overTrigger = false;
                        }

                        elementObject.fromTop = elementTop - baseTop;
                        elementObject.fromBottmom = baseBottom - elementBottom;

                        elementsInView.push(elementObject)
                    } else {
                        // elementObject.full = false;
                        return
                    }
                })
                
            }
            return elementsInView;
        }

        let nextElementHeight = 0;

        function checkCurrentImage() {

            let pImagesOverView;
            let pimagesOverTrigger;

            if(window.salemoche.imageMode == 'large') {
                if (!window.salemoche.lowHardwareMode) {
                    // get the last item that's over the trigger (in this case minus half the next element height)
                    let imagesInView = checkElementsInView($('.cya-image'), 'window', window.innerHeight / 2 - nextElementHeight / 2 - 3);
                    let imagesOverTrigger = imagesInView.filter(image => image.overTrigger == true);
                    if (imagesOverTrigger.length == 0) return
    
                    let mainImage = $(`#${imagesOverTrigger[imagesOverTrigger.length - 1].id}`);
    
                    // get the height of the next infobox
                    nextElementHeight = mainImage.next('.cya-image').find('.cya-info-box').height() ? mainImage.next('.cya-image').find('.cya-info-box').height() : 52;
    
                    if (pImagesOverView != imagesOverView && pImagesOverTrigger != imagesOverTrigger)

                    $('.cya-info-box').removeClass('fixed');
                    mainImage.find('.cya-info-box').addClass('fixed');
    
                    window.salemoche.focusElement = mainImage;
                    // console.log(window.salemoche.focusElement.data('total-index'));

                    pImagesOverView = imagesOverView;
                    pImagesOverTrigger = imagesOverTrigger;

                } else {
                    $('.cya-info-box').removeClass('fixed');
                    $('.cya-info-box').addClass('fixed-low');
                }
            } 
        }

        setTimeout(() => {
            $('.image-mode-large .cya-image__info-box')[0]?.classList.add('fixed');
        }, 1000);

        //======================
        //	Footer Info
        //======================

        function toggleFooter ({inView}) {
            if (inView) {
                $('.cya-info-button').addClass('hidden');
            } else {
                $('.cya-info-button').removeClass('hidden');
            }
        }


    })
})( jQuery )