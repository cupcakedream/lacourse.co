
// Initalize functions once window loads
// $(window).load(function() {
// 
// 	// Initialize Sticky Sidebar
// 	lco_sticky('#welcome', '#portfolio', false);
// 
// 	// Re-initialize Sticky Sidebar on Resize
// 	$(window).resize(function() {
// 		$(window).unbind("scroll");
// 		lco_sticky('#welcome', '#portfolio', false);
// 	});
// 
// });

// Photo Gallery for Adventures in Footer
// $('.adventures').magnificPopup({
// 	type: 'image',
// 	tLoading: 'Loading image...',
// 	mainClass: 'my-mfp-zoom-in',
// 	gallery: {
// 		enabled: true,
// 		navigateByImgClick: true,
// 		arrowMarkup: '<div title="%title%" type="button" class="adventure-nav %dir%"></div>',
// 		preload: [0,1] // Will preload 0 - before current, and 1 after the current image
// 	},
// 	image: {
// 		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
// 	}
// });

$('.lco-logo').bind( "tap", function( e ){ 
	$.magnificPopup.open({
		items: {  src: '#lco-about' },
		type: 'inline',
		mainClass: 'lco-black',
		//closeBtnInside: false,
	});
});

$('.lco-button').bind( "tap", function( e ){ 
	$.magnificPopup.open({
		items: {  src: '#lco-contact' },
		type: 'inline',
		mainClass: 'lco-green',
		//closeBtnInside: false,
	});
});

// Sticky Sidebar & Navigation Highlight on Scroll
function lco_sticky(sidebar,content,guides) {

	window.scrolling = false;

	// Reset element width in case window has been resized
	$(sidebar).children('.sticky').css({'width':'auto'}).removeClass('stuck stop start');

		

	// Variables
	var stuck		= false,
		$window		= $(window),
		$sidebar	= $(sidebar).children('.sticky'),
		width		= $(sidebar).outerWidth(),
		start		= $sidebar.offset().top - 140, // adding top margin here
		end			= ( $(content).offset().top + $(content).outerHeight() ) 
						- $window.outerHeight() + $sidebar.outerHeight() - 70;
	
	// Show Scroll Guides					
	if(guides) {
		$('.page').prepend('<div style="position:absolute;background:red;height:5px;width:100%;z-index:2000;top:'+start+'px;"></div>');
		$('.page').prepend('<div style="position:absolute;background:red;height:5px;width:100%;z-index:2000;top:'+end+'px;"></div>');
	}

	// Setup Sticky on load
	lco_detect_scroll_position()
	
	// Stick according to scroll position
	$window.scroll(function (event) {
		
		var scroll = $window.scrollTop();
		lco_detect_scroll_position();

		if (guides) {
			console.log(' | start: ' + start,' | scroll: ' + scroll,' | end: ' + end + ' |');
		}

	});
	
	function lco_detect_scroll_position() {
		if ( $window.scrollTop() < start ) {
			$sidebar.removeClass('stuck').removeClass('stop').addClass('start').css({'width':width+'px' });
			stuck = false;
		} else if ( ( start < $window.scrollTop() ) && ( $window.scrollTop() < end ) ) {
			$sidebar.addClass('stuck').removeClass('stop').removeClass('start').css({'width':width+'px'});
			stuck = true;
		} else {
			$sidebar.removeClass('stuck').removeClass('start').addClass('stop').css({'width':width+'px' });
			stuck = false;
		}	
	}

}