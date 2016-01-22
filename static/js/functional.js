// Initalize functions once window loads
$(window).load(function() {

	// Initialize Sticky Sidebar
	sticky('#welcome', '#portfolio', true);

	// Re-initialize Sticky Sidebar on Resize
	$(window).resize(function() {
		$(window).unbind("scroll");
		sticky('#welcome', '#portfolio');
	});
	
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

});

// Tab Interaction under Services
// $('#tab .switch').bind( "tap", function(e) {
// 	if( !$(this).hasClass('open') ) {
// 		$('ul.tags, #tab .switch').toggleClass('open');
// 	}
// 	e.preventDefault();
// });

// Sticky Sidebar & Navigation Highlight on Scroll
function sticky(sidebar,content,nav) {

	window.scrolling = false;

	// Reset element width in case window has been resized
	$(sidebar).children('.sticky').css({'width':'auto'}).removeClass('stuck stop');

	// Variables
	var $window		= $(window),
		$sidebar	= $(sidebar).children('.sticky'),
		$nav		= $('#navigation'),
		stuck		= false,
		contact		= false,
		width		= $(sidebar).width(),
		end			= $(content).outerHeight() - $window.outerHeight() -
						( $sidebar.outerHeight() - $window.outerHeight() ),
		end2		=  ($('#about').outerHeight() + $('#testimonials').outerHeight() + $('#intro').outerHeight()); // 2nd section trigger

	// Setup Sticky on load
	if ( $window.scrollTop() > end) {
		$sidebar.removeClass('stuck').addClass('stop').css({'width':width+'px' });
		stuck = false;
		if ($window.scrollTop() > end2 ) {
			$($nav.find('.button')[2]).addClass('open');
			contact = true;
		} else {
			$($nav.find('.button')[1]).addClass('open');
		}
	} else {
		$sidebar.addClass('stuck').removeClass('stop').css({'width':width+'px'});
		stuck = true;
		$($nav.find('.button')[0]).addClass('open');
	}

	// Stick according to scroll position
	$window.scroll(function (event) {
		
		var scroll = $window.scrollTop();
		if (scroll >= end && scroll < end2 && ( stuck == true || contact == true )) { // Services
			$sidebar.removeClass('stuck').addClass('stop').css({'width':width+'px' });
			stuck = false;

			// Nav Highlighting
			if (window.scrolling == false) {
				$nav.find('.button').removeClass('open');
				$($nav.find('.button')[1]).addClass('open');
				contact = false;
			}
		} 
		else if (scroll <= end && stuck == false) { // Work
			$sidebar.addClass('stuck').removeClass('stop').css({'width':width+'px'});
			stuck = true;

			// Nav Highlighting
			if (window.scrolling == false) {
				$nav.find('.button').removeClass('open');
				$($nav.find('.button')[0]).addClass('open');
				contact = false;	
			}
		}
		else if (scroll >= end2 && contact == false && window.scrolling == false ) { // Contact
			$sidebar.removeClass('stuck').addClass('stop').css({'width':width+'px' });
			stuck = false;
			// Nav Highlighting
			$nav.find('.button').removeClass('open');
			$($nav.find('.button')[2]).addClass('open');
			contact = true;
		}
	});

}