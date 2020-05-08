/**
 * ===================================================================
 * Main js
 *
 * -------------------------------------------------------------------
 */

function mainScript($) {

	'use strict';

	/* --------------------------------------------------- */
	/*  Vegas Slideshow
	------------------------------------------------------ */
	$('.home-slides').vegas({
		transition: 'fade',
		transitionDuration: 2500,
		delay: 5000,
		slides: [
			{src: 'images/slides/03.jpg'},
			{src: 'images/slides/02.jpg'},
			{src: 'images/slides/01.jpg'},
			{src: 'images/slides/04.jpg'}
		]
	});

	/* --------------------------------------------------- */
	/*  Particle JS
	------------------------------------------------------ */
	$('.home-particles').particleground({
		dotColor: '#fff',
		lineColor: '#ccc',
		particleRadius: 10,
		curveLines: true,
		density: 10000,
		proximity: 110
	});
}

// IIFE
(function ($) {

	'use strict';

	/* --------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(function () {
		//colors();
		// will first fade out the loading animation
		$('#preloader').delay(1000).animate({
			opacity: 0,
			display: 'none'
		}, 500, function () {

			// will fade out the whole DIV that covers the website.
			$('#loader').fadeOut('fast');

		}).fadeOut('fast');
	})

	function colors() {
		$('.object:nth-child(5)').css({'background-color': 'red'});
	}

	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */
	$('.fluid-video-wrapper').fitVids();

	/*-----------------------------------------------------*/
	/* tabs
  	-------------------------------------------------------*/
	const $tab = $('.tab-content')
		.hide();
	$tab.first().show();

	$('ul.tabs li').click(function () {
		$('ul.tabs li').removeClass('active');
		$(this).addClass('active');
		$tab.hide();
		var activeTab = $(this).attr('data-id');
		$('#' + activeTab).fadeIn(700);
	});

	/* --------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input, textarea, select').placeholder()
	/*----------------------------------------------------*/
	/* Smooth Scrolling
	------------------------------------------------------*/
	$('.smoothscroll').on('click', function (e) {
		e.preventDefault();
		const target = this.hash, $target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});
	});

	/*----------------------------------------------------*/
	/* Final Countdown Settings
	------------------------------------------------------ */
	var finalDate = '2017/05/05';

	$('div#counter').countdown(finalDate)
		.on('update.countdown', function (event) {

			$(this).html(event.strftime('<div class=\"half\">' +
				'<span>%D <sup>days</sup></span>' +
				'<span>%H <sup>hours</sup></span>' +
				'</div>' +
				'<div class=\"half\">' +
				'<span>%M <sup>mins</sup></span>' +
				'<span>%S <sup>secs</sup></span>' +
				'</div>'));

		});
})(jQuery)

function ToggleHomeClass($) {
	/*---------------------------------------------------- */
	/*Toggle Home Class
	------------------------------------------------------ */
	const $homeWrapper = $('#home-background')
	const $particleScreen = $('#particleScreen')
	const $slideScreen = $('#slideScreen')
	$particleScreen.click(function () {
		$homeWrapper.html('<div class="home-particles"></div>')
		mainScript(jQuery);

	})
	$slideScreen.click(function () {
		$homeWrapper.html('<div class="home-slides"></div>')
		mainScript(jQuery);

	})
}

mainScript(jQuery);
ToggleHomeClass(jQuery);