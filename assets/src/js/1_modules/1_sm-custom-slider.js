(function($) {

    document.addEventListener('DOMContentLoaded', () => {

        //======================
        //	Cookie Notice
        //======================

        let customSliders = $('.sm-custom-slider');

        // setupSliders({sliders: $('.cya-home__images'), name: 'cyaan'});

        

        class SalemocheCustomSlider {
            constructor(options) {
                this.options = {
                    sliders: $('.sm-custom-slider'), 
                    slideClass: '.sm-custom-slide',
                    transitionTime: 1000, // in ms
                    carousel: false,
                    onSlide: null, // start on slide number
                    prewarm: true,
                    name: '',
                    cursor: 'resize-arrows',
                    moveSliderThreshold: window.innerWidth / 3,
                    ...options
                }

            }

            mountSliders (receivedCurrentIndex) {
                const { sliders, slideClass, carousel, onSlide, prewarm, transitionTime, name, controlElements, cursor, moveSliderThreshold } = this.options;

                sliders.each( function () {
                    const slider = $(this);
                    const slides = slider.children();
                    let currentIndex = receivedCurrentIndex || onSlide || 0;
                    let prevIndex = slides[currentIndex - 1] ? currentIndex - 1 : slides.length - 1;
                    let nextIndex = slides[currentIndex + 1] ? currentIndex + 1 : 0;
                    let prev2Index = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1;
                    let next2Index = slides[nextIndex + 1] ? nextIndex + 1 : 0;
                    let totalCount = slides.length;
                    let isMoving;
                    console.log(prevIndex, currentIndex, nextIndex)
    
                    slider.addClass('sm-custom-slider')
    
                    // console.log(currentIndex, prevIndex, nextIndex, prev2Index, next2Index)
    
                    if (name == 'cyaan' && slides.length < 5) {
                        alert('To few elements in the slider, please add at least 5 slides');
                        return
                    }
    
                    // create slider container
                    const slideContainer = $('<div class="sm-custom-slide-container"></div>');
                    slider.prepend(slideContainer)
    
                    // create slider counter
                    const slideCounter = $(`
                        <div class="sm-custom-slider-counter total-counter ${window.salemoche.showInfo && 'visible'}">
                            <span class="sm-custom-slider-counter-current">${currentIndex + 1}</span>/<span class="sm-custom-slider-counter-total">${totalCount}</span>
                        </div>
                    `);
                    slider.prepend(slideCounter);
    
                    // create cyaan project counter ------------------------------------------
                    let projectIndex = slides.eq(currentIndex).data('project-index');
                    let totalCountProject = slider.find(`[data-project-index=${projectIndex}]`).length;
                    let inProjectIndex = slides.eq(currentIndex).data('in-project-index');
                    
                    const slideCounterCyaan = $(`
                        <div class="sm-custom-slider-counter project-counter ${window.salemoche.showInfo && 'visible'}">
                            <span class="sm-custom-slider-counter-current">${inProjectIndex}</span>/<span class="sm-custom-slider-counter-total">${totalCountProject}</span>
                        </div>
                    `);
                    slider.prepend(slideCounterCyaan);
                    // end create cyaan project counter ------------------------------------------
    
                    // create cyaan info box ------------------------------------------
                    
                    const infoBoxCyaan = $(`<div class="info-box-slider ${window.salemoche.showInfo && 'visible'}">${slides.eq(currentIndex).find('.cya-image__info-box').text()}</div>`);
                    slider.prepend(infoBoxCyaan);
                    // end create cyaan info box ------------------------------------------
    
                    // add classes and styles to slides and add the slides to the container

                    // normalize
                    slides.addClass('sm-custom-slide');
                    slides.addClass('sm-inactive-slide');
                    slides.removeClass('unmounted');
                    slides.css('transition', transitionTime + 'ms');
                    
                    // current slide
                    slides.eq(currentIndex).addClass('sm-current-slide');
                    slides.eq(currentIndex).removeClass('sm-inactive-slide');
                    
                    // Previous
                    slides.eq(prevIndex).addClass('sm-prev-slide');
                    slides.eq(prevIndex).removeClass('sm-inactive-slide');
                    slides.eq(prev2Index).addClass('sm-prev-2-slide');
                    slides.eq(prev2Index).removeClass('sm-inactive-slide');
                    
                    // Next
                    slides.eq(nextIndex).addClass('sm-next-slide');
                    slides.eq(nextIndex).removeClass('sm-inactive-slide');
                    slides.eq(next2Index).addClass('sm-next-2-slide');
                    slides.eq(next2Index).removeClass('sm-inactive-slide');


                    slides.each( function (i) {
                        slide = $(this);
    
                        // add necessary classes to the slides
                        // slide.addClass('sm-custom-slide');
                        slide.attr('id', `sm-custom-slide-${i}`);
                        slide.attr('data-slide-index', i);
                        // slide.css('transition', transitionTime + 'ms');
    
                        // if ( !carousel ) {
                        //     // set current and next slide
    
                        //     // switch (i) {
                        //     //     case currentIndex:
                        //     //         slide.addClass('sm-current-slide') 
                        //     //         break;
                        //     //     case currentIndex + 1:
                        //     //         slide.addClass('sm-next-slide')
                        //     //         break;
                        //     //     case currentIndex + 1:
                        //     //         slide.addClass('sm-next-slide')
                        //     //         break;
                        //     //     default:
                        //     //         break;
                        //     // }
                        //     if (i == currentIndex) {
                        //         slide.addClass('sm-current-slide')
                        //     } else if (i == nextIndex) {
                        //         slide.addClass('sm-next-slide');
                        //     } else if (i == next2Index) {
                        //         slide.addClass('sm-next-2-slide');
                        //     } else {
    
                        //         // set the 'prewarm' slide on the left side
    
                        //         if (currentIndex != 0) {
                        //             prevSlide = slide.eq(prevIndex);
                        //             prevSlide.addClass('sm-prev-slide');
    
                        //             if (currentIndex >= 2) {
                        //                 prev2Slide = slide.eq(prevIndex - 1);
                        //                 prev2Slide.addClass('sm-prev-2-slide');
                        //             }
                        //         } else if (prewarm && i == slides.length - 1) {
                        //             prevSlide = slide;
                        //             prevSlide.addClass('sm-prev-slide');
                        //         } else {
                        //             slide.addClass('sm-inactive-slide');
                        //         }
    
                        //     }
    
                        //     // if (i != currentIndex && i != currentIndex + 1) slide.addClass('sm-inactive-slide');
                        // }
                    })
    
                    slideContainer.append(slides);
    
    
                    // assign the slide variables
    
                    let currentSlide = $(slideClass).eq(currentIndex);
                    let prevSlide = $(slideClass).eq(prevIndex);
                    let nextSlide = $(slideClass).eq(nextIndex);
                    let prev2Slide = $(slideClass).eq(prev2Index);
                    let next2Slide = $(slideClass).eq(next2Index);
    
                    function moveSlider(forward = true, toSlide = null) {

                        if (toSlide != null) {
                            // an index is already set to set the slider to
    
                            currentIndex = toSlide;
                            prevIndex = slides[currentIndex - 1] ? currentIndex - 1 : slides.length - 1;
                            nextIndex = slides[currentIndex + 1] ? currentIndex + 1 : 0;
                            prev2Index = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1;
                            next2Index = slides[nextIndex + 1] ? nextIndex + 1 : 0;
                            // console.log(prevIndex, currentIndex, nextIndex)
                        } else if (forward) {
                            currentIndex = slides[currentIndex + 1] ? currentIndex + 1 : 0; 
                            prevIndex = slides[currentIndex - 1] ? currentIndex - 1 : slides.length - 1;
                            nextIndex = slides[currentIndex + 1] ? currentIndex + 1 : 0;
                            prev2Index = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1;
                            next2Index = slides[nextIndex + 1] ? nextIndex + 1 : 0;
    
                        } else if (!forward) {
                            // currentIndex = slides[currentIndex - 1] ? currentIndex - 1 : slides.length; 
                            // console.log(prevIndex, currentIndex, nextIndex)
                            nextIndex = currentIndex;
                            currentIndex = prevIndex; 
                            prevIndex = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1;
                            prev2Index = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1; // ! attention
                        }
    
    
                        if (forward) {
                            stepUp(nextSlide, true, 'appear');
                            enter(next2Slide, true, 'appear')
                            leave(prevSlide, true, 'appear');
                        } else {
                            stepUp(prevSlide, false, 'appear');
                            leave(nextSlide, false, 'appear');
                            enter(prev2Slide, false, 'appear')
                        }
                        stepDown(currentSlide, forward, 'appear');
                        // console.log(currentIndex + 1 + '/' + totalCount);

                        updateCounter();
                        updateCyaan();

                        setTimeout(() => {
    
                            currentSlide = slides.eq(currentIndex);
                            prevSlide = slides.eq(prevIndex);
                            nextSlide = slides.eq(nextIndex);
                            prev2Slide = slides.eq(prev2Index);
                            next2Slide = slides.eq(next2Index);
    
                            slides.removeClass(['sm-prev-slide', 'sm-next-slide', 'sm-current-slide'])
                            slides.addClass(['sm-inactive-slide'])
        
                            prevSlide.addClass(['sm-prev-slide']);
                            prevSlide.removeClass(['sm-inactive-slide']);
        
                            currentSlide.addClass(['sm-current-slide']);
                            currentSlide.removeClass(['sm-inactive-slide']);
        
                            nextSlide.addClass(['sm-next-slide']);
                            nextSlide.removeClass(['sm-inactive-slide']);
                            
                        }, transitionTime);
    
                        // add Classes to new slides
    
                    }
    
                    // special function for the cyaan slider
    
                    function stepDown(element, forward = true, method = 'slide') {
    
                        // console.log('step down', element)
    
                        element.css('opacity', 1)
    
                        if (method == 'skew') {
                            let percent = forward ? '0' : '100%';
                            let transform = forward ? 'translate(-50%, -50%) scale(0.5) rotateY(45deg)' : 'translate(-50%, -50%) scale(0.5) rotateY(-45deg)';
                            element.css('left', percent);
                            element.css('transform', transform);
                        } else if (method == 'appear') {
                            element.css('opacity', 0);
                            element.css('pointer-events', 'none');
                        }
    
                        setTimeout(() => {
    
                            // element.css('opacity', 1)
                            
                        }, transitionTime);
                    }
    
                    function stepUp(element, forward = true, method = 'slide') {
    
                        // console.log('step up', element)
    
                        element.css('opacity', 1)
    
                        if (method == 'skew') {
                            element.css('left', '50%');
                            element.css('transform', 'translate(-50%, -50%) scale(1)')
                        } else if (method == 'appear') {
                            element.css('opacity', 1);
                            element.css('pointer-events', 'all');
                        }
    
                        setTimeout(() => {
    
                            // element.css('opacity', 1)
                            
                        }, transitionTime);
                    }
    
                    function enter(element, forward = true, method = 'slide') {
    
                        // console.log('enter', element)
    
                        // ready element to be moved in
                        element.css('opacity', 1)
    
                        if (method == 'skew') {
    
                            // ready element to be moved in
                            element.css('transition', 'none');
                            let percent = forward ? '100%' : '0';
                            let transform = forward ? 'translate(100%, -50%) scale(0.25) rotateY(90deg)' : 'translate(-100%, -50%) scale(0.25)  rotateY(-90deg)';
                            element.css('left', percent)
                            element.css('transform', transform)
    
                            // move element in
    
                            setTimeout(() => {
    
                                element.css('transition', transitionTime + 'ms');
                                percent = forward ? '100%' : '0';
                                transform = forward ? 'translate(-50%, -50%) scale(0.5) rotateY(-45deg)' : 'translate(-50%, -50%) scale(0.5) rotateY(45deg)';
                                element.css('left', percent);
                                element.css('transform', transform)
                            }, 0);
                        } else if (method == 'appear') {
                            element.css('opacity', 0);
                            element.css('pointer-events', 'none');
                        }
                    }
    
                    function leave(element, forward = true, method = 'slide') {
    
                        // console.log('leave', element)
    
                        element.css('opacity', 1)
    
                        if (method == 'skew') {
                            let transform = forward ? 'translate(-100%, -50%) scale(0.25) rotateY(90deg)' : 'translate(100%, -50%) scale(0.25)  rotateY(-90deg)';
                            element.css('transform', transform)
                        } else if (method == 'appear') {
                            element.css('opacity', 0);
                            element.css('pointer-events', 'none');
                        }
    
                        setTimeout(() => {
    
                            element.css('opacity', 0)
                            element.css('transition', 'unset');
                            
                        }, transitionTime);
                    }

                    function updateCounter () {
                        $('.sm-custom-slider-counter .sm-custom-slider-counter-current').text(currentIndex + 1);
                    }

                    function updateCyaan() {
                        updateCounterCyaan();
                        updateInfoBoxCyaan();

                        window.salemoche.focusElement = slides.eq(currentIndex) ;
                        // console.log(window.salemoche.focusElement.data('total-index'));
                    }

                    function updateCounterCyaan () {
                        projectIndex = slides.eq(currentIndex).data('project-index');
                        totalCountProject = slider.find(`[data-project-index=${projectIndex}]`).length;
                        inProjectIndex = slides.eq(currentIndex).data('in-project-index');

                        $('.sm-custom-slider-counter.project-counter .sm-custom-slider-counter-current').text(inProjectIndex);
                        $('.sm-custom-slider-counter.project-counter .sm-custom-slider-counter-total').text(totalCountProject);
                    }

                    function updateInfoBoxCyaan () {
                        infoBoxText = slides.eq(currentIndex).find('.cya-image__info-box').text();
                        // console.log(infoBoxText)
                        $('.info-box-slider').text(infoBoxText);
                    }
    
                    /**
                    *========================================
                    *	
                    *	Controls
                    *	
                    *========================================
                    */

                    if (cursor) {

                        let cursorName = {}

                        if (cursor == 'resize-arrows') {
                            cursorName = {
                                left: 'w-resize',
                                right: 'e-resize',
                            }
                        }

                        $('.sm-custom-slide-container').on('mousemove', (e) => {
                            // if (e.target.tagName != 'IMG') {
                                if (e.pageX > window.innerWidth - moveSliderThreshold) {
                                    $('.sm-custom-slide-container').css('cursor', cursorName.right);
                                } else if (e.pageX < moveSliderThreshold) {
                                    $('.sm-custom-slide-container').css('cursor', cursorName.left);
                                } else {
                                    $('.sm-custom-slide-container').css('cursor', 'pointer');
                                }
                            // } else {
                            // }
                        });
                    }
    
                    if (!controlElements) {

                        
                        $('.sm-custom-slide-container').on('click', (e) => {
                            // if (isMoving || (name == 'cyaan' && (e.target.tagName == 'IMG' || e.target.classList.value.includes('cya-image')))) return
                            // console.log(e.pageX < window.innerWidth - moveSliderThreshold, e.pageX > moveSliderThreshold)
                            if (isMoving || (name == 'cyaan' && (e.pageX < window.innerWidth - moveSliderThreshold && e.pageX > moveSliderThreshold))) return
                            if (e.pageX < window.innerWidth - moveSliderThreshold) {
                                moveSlider(false);
                            } else if (e.pageX > moveSliderThreshold) {
                                moveSlider();
                            }
    
                            isMoving = true;
                            setTimeout(() => {
                                isMoving = false;
                            }, transitionTime);
                        });
    
                    } else if (controlElements.forward && controlElements.backwards) {
                        controlElements.forward.on('click', (e) => {
                            if (isMoving) return
    
                            moveSlider();
                            isMoving = true;
                            setTimeout(() => {
                                isMoving = false;
                            }, transitionTime);
                        });
    
                        controlElements.backwards.on('click', (e) => {
                            if (isMoving) return
    
                            moveSlider(false);
                            isMoving = true;
                            setTimeout(() => {
                                isMoving = false;
                            }, transitionTime);
                        });
    
                    }
                    
                });
            }

            unmountSliders () {                
                const { sliders, controlElements } = this.options;

                sliders.each( function () {
                    const slider = $(this);
                    const slideContainer = $(this).find('.sm-custom-slide-container');
                    const infoBoxSlider = $(this).find('.info-box-slider');
                    const sliderCounter = $(this).find('.sm-custom-slider-counter');
                    const slides = slideContainer.children();
                    slides.removeClass([
                        'sm-custom-slide', 
                        'sm-prev-slide', 
                        'sm-next-slide', 
                        'sm-prev-2-slide', 
                        'sm-next-2-slide', 
                        'sm-current-slide',
                        'sm-inactive-slide'
                    ]);
                    
                    slides.attr('style', '');
                    slides.addClass('unmounted');
                    // slides.css({
                    //     'transition': 'none',
                    //     'transform': 'none',
                    //     // 'left': 'unset',
                    //     // 'top': 'unset',
                    // })

                    slides.appendTo(slider);
                    slideContainer.remove();
                    infoBoxSlider.remove();
                    sliderCounter.remove();
    
                    slider.removeClass('sm-custom-slider');
                    
                    
                });
            }
        }

        const smCustomSlider = new SalemocheCustomSlider({sliders: $('.cya-home__images'), name: 'cyaan'});

        if (window.salemoche.imageMode == 'medium' || window.location.href.includes('medium')) {
            smCustomSlider.mountSliders();
        }

        document.addEventListener('Image Mode', (e) => {
            if (e.imageMode == 'medium') {
                // console.log(window.salemoche.focusElement)
                // const index = window.salemoche.focusElement.
                if (e.pImageMode != 'medium') {
                    // console.log(e.currentIndex)
                    smCustomSlider.mountSliders(e.currentIndex - 1);
                }
            } else {
                smCustomSlider.unmountSliders();
            }
        })

        // function setupSliders (options) {

        //     options = {
        //         sliders: $('.sm-custom-slider'), 
        //         slideClass: '.sm-custom-slide',
        //         transitionTime: 1000, // in ms
        //         carousel: false,
        //         onSlide: null, // start on slide number
        //         prewarm: true,
        //         name: '',
        //         ...options
        //     }

        //     const { sliders, slideClass, carousel, onSlide, prewarm, transitionTime, name, controlElements } = options;

        //     sliders.each( function () {
        //         const slider = $(this);
        //         const slides = slider.children();
        //         let currentIndex = onSlide || 0;
        //         let prevIndex = slides[currentIndex - 1] ? currentIndex - 1 : slides.length - 1;
        //         let nextIndex = slides[currentIndex + 1] ? currentIndex + 1 : 0;
        //         let prev2Index = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1;
        //         let next2Index = slides[nextIndex + 1] ? nextIndex + 1 : 0;
        //         let totalCount = slides.length;
        //         let isMoving;

        //         slider.addClass('sm-custom-slider')

        //         // console.log(currentIndex, prevIndex, nextIndex, prev2Index, next2Index)

        //         if (name == 'cyaan' && slides.length < 5) {
        //             alert('To few elements in the slider, please add at least 5 slides');
        //             return
        //         }

        //         // create slider container
        //         const slideContainer = $('<div class="sm-custom-slide-container"></div>');
        //         slider.prepend(slideContainer)

        //         // add classes and styles to slides and add the slides to the container
        //         slides.each( function (i) {
        //             slide = $(this);

        //             // add necessary classes to the slides
        //             slide.addClass('sm-custom-slide');
        //             slide.attr('id', `sm-custom-slide-${i}`);
        //             slide.attr('data-slide-index', i);
        //             slide.css('transition', transitionTime + 'ms');

        //             if ( !carousel ) {
        //                 // set current and next slide

        //                 // switch (i) {
        //                 //     case currentIndex:
        //                 //         slide.addClass('sm-current-slide') 
        //                 //         break;
        //                 //     case currentIndex + 1:
        //                 //         slide.addClass('sm-next-slide')
        //                 //         break;
        //                 //     case currentIndex + 1:
        //                 //         slide.addClass('sm-next-slide')
        //                 //         break;
        //                 //     default:
        //                 //         break;
        //                 // }
        //                 if (i == currentIndex) {
        //                     slide.addClass('sm-current-slide')
        //                 } else if (i == currentIndex + 1) {
        //                     slide.addClass('sm-next-slide');
        //                 } else if (i == currentIndex + 2) {
        //                     slide.addClass('sm-next-2-slide');
        //                 } else {

        //                     // set the 'prewarm' slide on the left side

        //                     if (currentIndex != 0) {
        //                         prevSlide = slide.eq(currentIndex - 1);
        //                         prevSlide.addClass('sm-prev-slide');

        //                         if (currentIndex >= 2) {
        //                             prev2Slide = slide.eq(currentIndex - 1);
        //                             prev2Slide.addClass('sm-prev-2-slide');
        //                         }
        //                     } else if (prewarm && i == slides.length - 1) {
        //                         prevSlide = slide;
        //                         prevSlide.addClass('sm-prev-slide');
        //                     } else {
        //                         slide.addClass('sm-inactive-slide');
        //                     }

        //                 }

        //                 // if (i != currentIndex && i != currentIndex + 1) slide.addClass('sm-inactive-slide');
        //             }
        //         })

        //         slideContainer.append(slides);


        //         // assign the slide variables

        //         let currentSlide = $(slideClass).eq(currentIndex);
        //         let prevSlide = $(slideClass).eq(prevIndex);
        //         let nextSlide = $(slideClass).eq(nextIndex);
        //         let prev2Slide = $(slideClass).eq(prev2Index);
        //         let next2Slide = $(slideClass).eq(next2Index);

        //         function moveSlider(forward = true, toSlide = null) {
                    
        //             if (toSlide != null) {
        //                 // an index is already set to set the slider to

        //                 currentIndex = toSlide;
        //                 prevIndex = slides[currentIndex - 1] ? currentIndex - 1 : slides.length - 1;
        //                 nextIndex = slides[currentIndex + 1] ? currentIndex + 1 : 0;
        //                 prev2Index = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1;
        //                 next2Index = slides[nextIndex + 1] ? nextIndex + 1 : 0;
        //                 // console.log(prevIndex, currentIndex, nextIndex)
        //             } else if (forward) {
        //                 currentIndex = slides[currentIndex + 1] ? currentIndex + 1 : 0; 
        //                 prevIndex = slides[currentIndex - 1] ? currentIndex - 1 : slides.length - 1;
        //                 nextIndex = slides[currentIndex + 1] ? currentIndex + 1 : 0;
        //                 prev2Index = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1;
        //                 next2Index = slides[nextIndex + 1] ? nextIndex + 1 : 0;

        //             } else if (!forward) {
        //                 // currentIndex = slides[currentIndex - 1] ? currentIndex - 1 : slides.length; 
        //                 console.log(prevIndex, currentIndex, nextIndex)
        //                 nextIndex = currentIndex;
        //                 currentIndex = prevIndex; 
        //                 prevIndex = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1;
        //                 prev2Index = slides[prevIndex - 1] ? prevIndex - 1 : slides.length - 1; // ! attention
        //             }


        //             if (forward) {
        //                 stepUp(nextSlide, true, 'skew');
        //                 enter(next2Slide, true, 'skew')
        //                 leave(prevSlide, true, 'skew');
        //             } else {
        //                 stepUp(prevSlide, false, 'skew');
        //                 leave(nextSlide, false, 'skew');
        //                 enter(prev2Slide, false, 'skew')
        //             }
        //             stepDown(currentSlide, forward, 'skew');
        //             console.log(currentIndex + 1 + '/' + totalCount);

        //             setTimeout(() => {

        //                 currentSlide = slides.eq(currentIndex);
        //                 prevSlide = slides.eq(prevIndex);
        //                 nextSlide = slides.eq(nextIndex);
        //                 prev2Slide = slides.eq(prev2Index);
        //                 next2Slide = slides.eq(next2Index);

        //                 slides.removeClass(['sm-prev-slide', 'sm-next-slide', 'sm-current-slide'])
        //                 slides.addClass(['sm-inactive-slide'])
    
        //                 prevSlide.addClass(['sm-prev-slide']);
        //                 prevSlide.removeClass(['sm-inactive-slide']);
    
        //                 currentSlide.addClass(['sm-current-slide']);
        //                 currentSlide.removeClass(['sm-inactive-slide']);
    
        //                 nextSlide.addClass(['sm-next-slide']);
        //                 nextSlide.removeClass(['sm-inactive-slide']);
                        
        //             }, transitionTime);

        //             // add Classes to new slides

        //         }

        //         // special function for the cyaan slider

        //         function stepDown(element, forward = true, method = 'slide') {

        //             // console.log('step down', element)

        //             element.css('opacity', 1)

        //             if (method == 'skew') {
        //                 let percent = forward ? '0' : '100%';
        //                 let transform = forward ? 'translate(-50%, -50%) scale(0.5) rotateY(45deg)' : 'translate(-50%, -50%) scale(0.5) rotateY(-45deg)';
        //                 element.css('left', percent);
        //                 element.css('transform', transform);
        //             }

        //             setTimeout(() => {

        //                 // element.css('opacity', 1)
                        
        //             }, transitionTime);
        //         }

        //         function stepUp(element, forward = true, method = 'slide') {

        //             // console.log('step up', element)

        //             element.css('opacity', 1)

        //             if (method == 'skew') {
        //                 element.css('left', '50%');
        //                 element.css('transform', 'translate(-50%, -50%) scale(1)')
        //             }

        //             setTimeout(() => {

        //                 // element.css('opacity', 1)
                        
        //             }, transitionTime);
        //         }

        //         function enter(element, forward = true, method = 'slide') {

        //             // console.log('enter', element)

        //             // ready element to be moved in
        //             element.css('opacity', 1)

        //             if (method == 'skew') {

        //                 // ready element to be moved in
        //                 element.css('transition', 'none');
        //                 let percent = forward ? '100%' : '0';
        //                 let transform = forward ? 'translate(100%, -50%) scale(0.25) rotateY(90deg)' : 'translate(-100%, -50%) scale(0.25)  rotateY(-90deg)';
        //                 element.css('left', percent)
        //                 element.css('transform', transform)

        //                 // move element in

        //                 setTimeout(() => {

        //                     element.css('transition', transitionTime + 'ms');
        //                     percent = forward ? '100%' : '0';
        //                     transform = forward ? 'translate(-50%, -50%) scale(0.5) rotateY(-45deg)' : 'translate(-50%, -50%) scale(0.5) rotateY(45deg)';
        //                     element.css('left', percent);
        //                     element.css('transform', transform)
        //                 }, 0);
        //             }
        //         }

        //         function leave(element, forward = true, method = 'slide') {

        //             // console.log('leave', element)

        //             element.css('opacity', 1)

        //             if (method == 'skew') {
        //                 let transform = forward ? 'translate(-100%, -50%) scale(0.25) rotateY(90deg)' : 'translate(100%, -50%) scale(0.25)  rotateY(-90deg)';
        //                 element.css('transform', transform)
        //             }

        //             setTimeout(() => {

        //                 element.css('opacity', 0)
        //                 element.css('transition', 'unset');
                        
        //             }, transitionTime);
        //         }

        //         /**
        //         *========================================
        //         *	
        //         *	Controls
        //         *	
        //         *========================================
        //         */

        //         if (!controlElements) {

        //             slider.on('click', (e) => {
        //                 if (isMoving) return

        //                 if (e.pageX > window.innerWidth / 2) {
        //                     moveSlider();
        //                 } else {
        //                     moveSlider(false);
        //                 }

        //                 isMoving = true;
        //                 setTimeout(() => {
        //                     isMoving = false;
        //                 }, transitionTime);
        //             });

        //         } else if (controlElements.forward && controlElements.backwards) {
        //             controlElements.forward.on('click', (e) => {
        //                 if (isMoving) return

        //                 moveSlider();
        //                 isMoving = true;
        //                 setTimeout(() => {
        //                     isMoving = false;
        //                 }, transitionTime);
        //             });

        //             controlElements.backwards.on('click', (e) => {
        //                 if (isMoving) return

        //                 moveSlider(false);
        //                 isMoving = true;
        //                 setTimeout(() => {
        //                     isMoving = false;
        //                 }, transitionTime);
        //             });

        //         }
                
        //     });
        // }

    })

})(jQuery)
