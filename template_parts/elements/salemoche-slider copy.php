<?php

// add_shortcode( 'sm_slider', function ($atts) {
	
// 	$a = shortcode_atts( array(
// 		'id' => '1',
// 		'orderby' => 'rand',
// 		'slide_count' => '1',
// 		'bullets' => 'true',
// 		'arrows' => 'true',
// 		'transition_time' => '1000',
// 		'display_time' => '5000',
// 		'height' => '50vh',
// 		'mobile_height' => '70vh',
// 		'method' => 'slide',
// 		'autoplay' => 'true',
// 		'slide_category' => 'testimonial',
		
// 	), $atts );
	
	$sm_slides = array();
	$sm_slider_id = '1';
    $sm_slider_order_by= 'rand';
	$sm_slider_slide_count = '1';
	$sm_slider_bullets = 'false';
	$sm_slider_arrows = 'true';
	$sm_slider_transition_time = '1000';
	$sm_slider_display_time = '5000';
	$sm_slider_height = '50vh';
	$sm_slider_mobile_height = '70vh';
	$sm_slider_method = 'slide';
	$sm_slider_autoplay = 'true';
	$sm_slide_category = 'testimonial';

// 	if ( get_field('slider') ) :
// 		$slides = get_field('slider');
// 		foreach ($slides as $slide):
		
// // Prepare Slide Layout
	
// 			$sm_slide = '<div class="sm-custom-slider__slide sm-slide sm-custom-slider__slide-' . $index . '">';
// 				$sm_slide .= '<div class="sm-slide__content">';
// 					$sm_slide .= '<div class="sm-slide__content__text">' . $slide['slider_statement'] . '</div>';
// 					if (isset($slide['slider_button']['url'])) {						
// 						$sm_slide .= '<a href="' . $slide['slider_button']['url'] . '" class="sm-slide__content__button sm-button">' . $slide['slider_button']['title'] . '</a>';
// 					}
// 				$sm_slide .= '</div>';				
// 				$sm_slide .= '<div class="sm-slide__tile">';
// 					$sm_slide .= '<div class="sm-slide__tile__image">';
// 						$sm_slide .= wp_get_attachment_image($slide['slider_image'], 'large');
// 					$sm_slide .= '</div>';
// 					$sm_slide .= '<div class="sm-slide__tile__text">';
// 						$sm_slide .= '<h5>' . $slide['slider_name'] . '</h5>';
// 						$sm_slide .= '<p>' . $slide['slider_info'] . '</p>';
// 					$sm_slide .= '</div>';
// 				$sm_slide .= '</div>';
// 			$sm_slide .= '</div>';
		
// // Add items to the sm_slides array
// 			array_push($sm_slides, $sm_slide);
// 			$index += 1;
	
// 		endforeach;
// 	endif;

// Salemoche Slider JS Code ==================================================================================	
?>
<div class="sm-custom-slider-section sm-section">
    <div class="sm-custom-slider-section__header"><h2>This is the Slider</h2></div>
    <div id="sm-custom-slider-<?php echo $sm_slider_id;?>" class="sm-custom-slider">
        <div class="sm-custom-slider__slide sm-slide sm-custom-slider__slide-0">this is a slide </div>
        <div class="sm-custom-slider__slide sm-slide sm-custom-slider__slide-1">this is also a slide </div>
        <div class="sm-custom-slider__bullets">
            <div class="sm-custom-slider__bullets__bullet sm-custom-slider__bullets__bullet-0"></div>
            <div class="sm-custom-slider__bullets__bullet sm-custom-slider__bullets__bullet-1"></div>
        </div>
    </div>;
</div>


<script> 
	document.addEventListener('DOMContentLoaded', function () {
			
	var smSlides = document.querySelectorAll('.sm-slide');
	var smSlidesArray = [];
	var smSliderId = '<?php echo $sm_slider_id;?>';
	var smSliderOptions = {
		slideCount: parseInt('<?php echo $sm_slider_slide_count;?>'),
		arrows: '<?php echo $sm_slider_arrows;?>' == 'true' ? true : false,
		bullets: '<?php echo $sm_slider_bullets;?>' == 'true' ? true : false,
		transitionTime: parseInt('<?php echo $sm_slider_transition_time;?>'),
		displayTime: parseInt('<?php echo $sm_slider_display_time;?>'),
		lazyload: false,
		autoplay: '<?php echo $sm_slider_autoplay;?>' == 'true' ? true : false,
		method: '<?php echo $sm_slider_method;?>',
		stopOnHover: true
	}

    // console.log(smSlides, smSlidesArray, smSliderId, smSliderOptions)
	var smCurrentSlide = 0;
	var smPrevSlide = 0;
	
	var smSlider = document.querySelector('#sm-custom-slider-' + smSliderId);
	var smSliderBullets = document.createElement('div');
		smSliderBullets.className = 'sm-custom-slider__bullets';
	var smSliderArrowLeft = document.createElement('div');
		smSliderArrowLeft.className = 'sm-custom-slider__arrow sm-custom-slider__arrow-left';
	var smSliderArrowRight = document.createElement('div');
		smSliderArrowRight.className = 'sm-custom-slider__arrow sm-custom-slider__arrow-right';

	smSlides.forEach((smSlide, i) => {
		smSlidesArray.push(smSlide)

		//console.log(smSlide)
		
		if (!smSliderOptions.lazyload) {
			smSlider.innerHTML += smSlide;
		}
		
		if(smSliderOptions.bullets && smSlides.length > 1) {
			smSliderBullets.innerHTML += `<div class='sm-custom-slider__bullets__bullet sm-custom-slider__bullets__bullet-` + i + `' data-id='` + i + `'></div>`;
		}
	})	
	
	if (smSliderOptions.lazyload) {
	}
		
	if(smSliderOptions.bullets && smSlides.length > 1) {
		smSlider.appendChild(smSliderBullets);
	}
	
	document.querySelectorAll('.sm-custom-slider__bullets__bullet').forEach(bullet => {
		var bulletId = bullet.dataset.id;
		bullet.addEventListener('click', function () {
			if (bulletId >= smCurrentSlide) {
				showSlide(bulletId, true);		
			} else if (bulletId < smCurrentSlide) {
				showSlide(bulletId, false);			
			}
		})
	})
	
	document.querySelector('.sm-custom-slider__bullets__bullet-0').classList.add('active');
		
	if(smSliderOptions.arrows) {
		smSliderArrowLeft.addEventListener('click', function () {
			showSlide('', false);
		})
		
		smSliderArrowRight.addEventListener('click', function () {
			showSlide('', true);
		})
		
		smSlider.appendChild(smSliderArrowLeft);
		smSlider.appendChild(smSliderArrowRight);
	}
	
	/*
	===================
	Behaviour
	===================
	*/
	
	var smSliderInterval = null;
	
	if (smSliderOptions.autoplay && smSlides.length > 1) {
		smSliderInterval = setInterval(() => {
			showSlide('', true)
		}, smSliderOptions.displayTime)
	}
	
	smSlider.addEventListener('mouseover', () => {
		if (smSliderOptions.autoplay == true) {
			clearInterval(smSliderInterval);
		}
		//console.log('enter');
	})
	
	smSlider.addEventListener('mouseout', () => {
		//smSliderOptions.autoplay = true;
		// console.log('leave');
		
		if (smSliderOptions.autoplay == true) {
			setInterval(smSliderInterval = setInterval(() => {
				showSlide('', true)
			}, smSliderOptions.displayTime));
		}
	})
	
	
	/*
	===================
	functions
	===================
	*/
	
	function showSlide(nextSlideId, next) {
		next = next == false ? false : true;
		smPrevSlide = smCurrentSlide;
		
		if (nextSlideId) {
			smCurrentSlide = nextSlideId;
		} else if (!next) {
			smCurrentSlide = smSlidesArray[smCurrentSlide - 1] ? smCurrentSlide - 1 : smSlidesArray.length - 1;
		} else {
			smCurrentSlide = smSlidesArray[smCurrentSlide + 1] ? smCurrentSlide + 1 : 0;
		}
		
		currentSlide = document.querySelector('#sm-custom-slider-' + smSliderId + ' .sm-custom-slider__slide-' + smCurrentSlide);
		prevSlide = document.querySelector('#sm-custom-slider-' + smSliderId + ' .sm-custom-slider__slide-' + smPrevSlide);

        // console.log(currentSlide, smCurrentSlide, prevSlide, smPrevSlide)
		
		if (next) {
			smSlideAppear(currentSlide, prevSlide, 'skew from right');
		} else {
			smSlideAppear(currentSlide, prevSlide, 'slide from top');
		}
	
		document.querySelectorAll('#sm-custom-slider-' + smSliderId + ' .sm-custom-slider__bullets__bullet').forEach(bullet => {
			bullet.classList.remove('active');
		})
		
		document.querySelector('#sm-custom-slider-' + smSliderId + ' .sm-custom-slider__bullets__bullet-' + smCurrentSlide).classList.add('active');
	}
	
	function smSlideAppear(currentSlide, prevSlide, method) {
	
		var slides = document.querySelectorAll('#sm-custom-slider-' + smSliderId + ' .sm-custom-slider__slide')
		var inactiveStyles = {};
		var prevActiveStyles = {}
		var activeStyles = {}
		var transitionTime = smSliderOptions.transitionTime / 1000 + 's'
		
		if (method == 'slide from right') {
			inactiveStyles = {left: '100vw'}; 
			prevActiveStyles = {left: '-100vw'}; 
			activeStyles = {left: '0'}; 
			
		} else if (method == 'slide from left') {
			inactiveStyles = {left: '-100vw'}; 
			prevActiveStyles = {left: '100vw'};
			activeStyles = {left: '0'}; 
		} else if (method == 'slide from bottom') {
			inactiveStyles = {top: '-100vh'}; 
			prevActiveStyles = {top: '100vh'};
			activeStyles = {top: '0'}; 
        } else if (method == 'slide from top') {
			inactiveStyles = {bottom: '-100vh'}; 
			prevActiveStyles = {bottom: '100vh'};
			activeStyles = {bottom: '0'}; 
        }  else if (method == 'stay') {
			inactiveStyles = {top: '0'}; 
			prevActiveStyles = {top: '0'};
			activeStyles = {top: '0'}; 
        }  else if (method == 'skew from right') {
			inactiveStyles = {right: '20vw', transform: 'translateX(0%)', }, 
			prevActiveStyles = {right: '50vw', transform: 'translateX(-50%)', background: 'green',};
			activeStyles = {right: '50vw', transform: 'translateX(0%)',}; 
        }
			
		slides.forEach( slide => {
		
			if(slide != prevSlide) {
				slide.style.transitionDuration = '0s';
				Object.assign(slide.style, inactiveStyles);
			}
		})
		
		setTimeout(function () {
			Object.assign(prevSlide.style, prevActiveStyles);
			
			currentSlide.style.transitionDuration = transitionTime;
			Object.assign(currentSlide.style, activeStyles);
		}, 10)
		
	}
	
		})
</script>

<style>
			
	.sm-custom-slider {
		width: 100%;
		height: <?php echo $sm_slider_height;?>;
		position: relative;
		overflow: hidden;
		padding-bottom: 10px;
	}
	
	.sm-custom-slider__slide {
		width: calc(100% / <?php echo $sm_slider_slide_count; ?>);
		height: 100%;
		position: absolute;
		background: white;
		// left: 100vw;
		transition: <?php echo $sm_slider_transition_time;?>ms;
        border: 2px solid black;
	}
	
	.sm-custom-slider__slide:first-of-type {
		left: 0;
	}
	
	.sm-custom-slider__header {
		margin-bottom: 48px;
	}
	
	/*
	===================
	Control Elements 
	===================
	*/
	
	.sm-custom-slider__bullets {
		position: absolute;
		left: 50%;
		bottom: 0px;
		transform: translateX(-50%);
    	display: flex;
    	z-index: 10;
	}
	
	.sm-custom-slider__bullets__bullet {
		width: 10px;
		height: 10px;
		background: gray;
		border-radius: 50%;
		margin: 2.5px;
		cursor: pointer;
	}
	
	.sm-custom-slider__bullets__bullet.active {
		background: black;
	}
	
	.sm-custom-slider__arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 50px;
		height: 50px;
		cursor: pointer;
    	z-index: 10;
		background-color: #ffffff77;
		border-radius: 8px;
		background-size: 30%;
		transition: .3s;
	}
	
	.sm-custom-slider__arrow:hover {
		transform: translateY(-50%) scale(1.05);
	}
	
	.sm-custom-slider__arrow-left {
		left: 0px;
	}
	
	.sm-custom-slider__arrow-right {
		right: 0px;
	}
	
	@media screen and (max-width: 1080px) {
	
		.sm-custom-slider {
			height: <?php echo $sm_slider_mobile_height;?>;
			/*overflow: visible;*/
			margin-bottom: 48px;
		}
		
		.sm-custom-slider__bullets {
			bottom: -48px;
		}
	
		.sm-custom-slider__bullets__bullet {
			width: 20px;
			height: 20px;
			margin: 5px;
		}
		
		/*.sm-custom-slider__arrow {
			display: none;
		}*/
	}

	</style>