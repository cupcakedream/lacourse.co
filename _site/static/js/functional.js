
// Initalize functions once window loads
$(window).load(function() {

	// Initialize Sticky Sidebar
	lco_sticky('#welcome', '#portfolio', false);

	// Re-initialize Sticky Sidebar on Resize
	$(window).resize(function() {
		$(window).unbind("scroll");
		lco_sticky('#welcome', '#portfolio', false);
	});
<<<<<<< HEAD
	
	// Switch for Inverted Colors
	$( ".light-switch" ).bind( "tap", function( e ){ 

		$('body').toggleClass('inverted');
	
		if (!$('body').hasClass('inverted')) {
			$('ul li').hide().fadeIn('fast');
			var expire = Date.now() + 1000000000;
			document.cookie = "invert=true;expires="+expire+";path=/";
		}
		else {
			$('ul li').hide().fadeIn('fast');
			var expire = Date.now() + 1000000000;
			document.cookie = "invert=false;expires="+expire+";path=/";
		}
	
		e.preventDefault();
	
	});

	// Simple Smooth Scrolling using Tap Library
	var hashTagActive = "";
	var event;
	$( ".smooth-scroll" ).bind( "tap", function(event){ 

		// Tell our scroll event to not do anything right now
		window.scrolling = true;
	
		// Highlight our nav
		$('#navigation').find('.button').removeClass('open');
		$(this).addClass('open');
	
		// Add margin to top of scroll position, use section margin
		var offset = $('.section').css("marginBottom").replace('px', '');

		//calculate destination place
		var dest = 0;
		if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
			dest = $(document).height() - $(window).height();
		} else {
			dest = $(this.hash).offset().top - offset;
		}
	
		//go to destination
		$('html,body').animate(
			{ scrollTop: dest }, 
			250,
			function() {
				window.scrolling = false;
			});
		
		hashTagActive = this.hash;

		event.preventDefault();

	}); 
	
	// Request Form
	var request;
	$("#make-request").submit(function(event){
	
		event.preventDefault();

		// Abort any pending request
		if (request) {
			request.abort();
			$('.request-loading').removeClass('active');
		}
	
		// Remove any errors
		// 	$(this).removeClass('error');
		// 	$(this).prev().removeClass('error');
	
		// Setup variables
		var $form 	= $(this);
		var $inputs = $form.find("input, select, textarea");

		// Simple Validation (if any input entered)   
		for (index = 0; index < $inputs.length; ++index) {
		
			// Setup our jquery object
			$input = $($inputs[index]);
		
			if ($inputs[index].value == '' && index !== 3) {

				// Throw error if no value is entered
				$input.addClass('error');
				$input.prev().addClass('error');

				$('.request-loading').removeClass('active');
				$input.focus();
				return false;
			}
			
		}
		
		// Compile Data
		data = {
			name: $('#make-request #name').val(), 
			email:  $('#make-request #email').val(),		
			phone:  $('#make-request #phone').val(),
			website:  $('#make-request #website').val(),
			about:  $('#make-request #project').val(),
			sendto: 'mike@lacourse.co',
		};

		// Disable inputs and add processing classes
		$('.request-loading').addClass('active');
		$inputs.prop("disabled", true);

		// Send Request via AJAX
		request = $.ajax({
			type: "POST",
			url: "http://api.lacourse.co",
			data: data,
			dataType: "json",
		});

		// Success
		request.done(function (response){
			$('.request-loading').removeClass('active');
			$form.addClass('sent');   		
			$('.sent .submit-button').slideUp();
			$('.sent .success-bar').slideDown();
			console.log(response.message, ' Sent project request');
		});

		// Failure
		request.fail(function (response){
			$('.request-loading').removeClass('active');
			$form.append("<p style='clear:both;padding-top:21px;'>I'm sorry, we're having an issue with our server at the moment. For an estimate, please call me at (978) 308-9285 or email me at mike@lacourse.co</p>");
			$form.append(response);
			console.log(response.message, ' Request could not be sent');
		});

	});
	
	// Photo Gallery for Adventures in Footer
	$('.adventures').magnificPopup({
		type: 'image',
		tLoading: 'Loading image...',
		mainClass: 'my-mfp-zoom-in',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			arrowMarkup: '<div title="%title%" type="button" class="adventure-nav %dir%"></div>',
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});
	
	// Form Error Handling (Interaction)
	$('input, textarea').click(function() {
		$(this).removeClass('error');
		$(this).prev().removeClass('error');
	});
	$('input, textarea').on('input',function() {
		$(this).removeClass('error');
		$(this).prev().removeClass('error');
	});
=======

});
>>>>>>> master

});

<<<<<<< HEAD
// Tab Interaction under Services
// $('#tab .switch').bind( "tap", function(e) {
// 	if( !$(this).hasClass('open') ) {
// 		$('ul.tags, #tab .switch').toggleClass('open');
// 	}
// 	e.preventDefault();
// });
=======
$('.lco-logo').magnificPopup({
	type: 'inline',
	mainClass: 'lco-black',
	//closeBtnInside: false,
});

$('.lco-button').magnificPopup({
	type: 'inline',
	mainClass: 'lco-green',
	//closeBtnInside: false,
});
>>>>>>> master

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