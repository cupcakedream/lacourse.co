
// Load inverted color scheme if user set
// var inverted = document.cookie.split('=');
// if (inverted[1] == 'true') {
// 	document.body.className == 'inverted';
// 	document.getElementById("switch").innerHTML="Off";
// 	//$('body').toggleClass('inverted');
// 	//$('#switch').text('Off');
// }

// Initalize functions once window loads
$(window).load(function() {

	// Initialize Sticky Sidebar
	sticky('#welcome', '#portfolio');

	// Re-initialize Sticky Sidebar on Resize
	$(window).resize(function() {
		$(window).unbind("scroll");
		sticky('#welcome', '#portfolio');
	});

// 	Initialize Testimonial Slider	
// 	var testimonials = $("#testimonials #slider");
// 	testimonials.owlCarousel({
// 		autoPlay: false, //Set AutoPlay to 3 seconds
// 		items : 2,
// 		itemsCustom : [[1024,2],[800,1]],
// 		stopOnHover: true,
// 		pagination: false
// 	});

// 	Testimonial Slider Navigation
// 	$("#testimonials .next").click(function(e){
// 		testimonials.trigger('owl.next');
// 		e.preventDefault();		
// 	});
// 	$("#testimonials .prev").click(function(){
// 		testimonials.trigger('owl.prev');
// 		e.preventDefault();
// 	});
	
});

// Switch for Inverted Colors
// $('.light-switch').click(function(e) {
$( ".light-switch" ).bind( "tap", function( e ){ 

	$('body').toggleClass('inverted');
	
	if ($(this).text() == 'On') {
		$('.light-switch').text('Off');
		var expire = Date.now() + 1000000000;
		document.cookie = "invert=true;expires="+expire+";path=/";
	}
	else {
		$('.light-switch').text('On');		
		var expire = Date.now() + 1000000000;
		document.cookie = "invert=false;expires="+expire+";path=/";
	}
	
	e.preventDefault();
	
});

// Simple Smooth Scrolling using Tap Library
var hashTagActive = "";
$( ".smooth-scroll" ).bind( "tap", function( e ){ 

	event.preventDefault();

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
	$('html,body').animate({
		scrollTop: dest
	}, 325, 'swing');
	hashTagActive = this.hash;
	
	// Highlighting
	$('.button.open').removeClass('open');
	$(this).addClass('open');

}); 

// var hashTagActive = "";
// $(".smooth-scroll").click(function (event) {
// 
// 	event.preventDefault();
// 
// 	// Add margin to top of scroll position, use section margin
// 	var offset = $('.section').css("marginBottom").replace('px', '') - 28;
// 
// 	//calculate destination place
// 	var dest = 0;
// 	if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
// 		dest = $(document).height() - $(window).height();
// 	} else {
// 		dest = $(this.hash).offset().top - offset;
// 	}
// 	//go to destination
// 	$('html,body').animate({
// 		scrollTop: dest
// 	}, 325, 'swing');
// 	hashTagActive = this.hash;
// 	
// 	// Highlighting
// 	$('.button.open').removeClass('open');
// 	$(this).addClass('open');
// });

// Form Handling
var request;
$("#make-request").submit(function(event){

	$('.request-loading').addClass('active');

    // Abort any pending request
    if (request) {
        request.abort();
        $('.request-loading').removeClass('active');
    }
    
	$(this).removeClass('error');
	$(this).prev().removeClass('error');
	
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, textarea");
    
    if($inputs[0].value == '') {
    	$($inputs[0]).addClass('error');
    	$($inputs[0]).prev().addClass('error');
		dest = $('#make-request').offset().top - 100;
		$('html,body').animate({scrollTop: dest}, 350, 'swing');	
		$('.request-loading').removeClass('active');
		$inputs[0].focus();	
    	return false;
    }
    else if($inputs[1].value == '') {
    	$($inputs[1]).addClass('error');
    	$($inputs[1]).prev().addClass('error');
		dest = $('#make-request').offset().top - 100;
		$('html,body').animate({scrollTop: dest}, 350, 'swing');
		$('.request-loading').removeClass('active');
    	return false;
    }
    else if($inputs[2].value == '') {
    	$($inputs[2]).addClass('error');
    	$($inputs[2]).prev().addClass('error');
		dest = $('#make-request').offset().top - 100;
		$('html,body').animate({scrollTop: dest}, 350, 'swing');
		$('.request-loading').removeClass('active');
    	return false;
    }
    else if($inputs[4].value == '') {
    	$($inputs[4]).addClass('error');
    	$($inputs[4]).prev().addClass('error');
		dest = $('#make-request').offset().top - 100;
		$('html,body').animate({scrollTop: dest}, 350, 'swing');
		$('.request-loading').removeClass('active');
    	return false;
    }

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbyLB1RX74Gi5gb2sCd5xH6_O_kRGU56jiNxVCv75XD8o6rQb1c/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        //$form.append("<p style='font-size:17px;line-height:28px;font-weight:400;'>Your request has been sent, thanks! I'll review your project requirements and get back to you as soon as possible.</p>");
   		//dest = $(document).height() - $(window).height();
   		//$("html, body").animate({ scrollTop: $(document).height() }, "slow");
   		
   		$('.request-loading').removeClass('active');
   	   	$form.addClass('sent');   		
   		$('.sent .submit-button').val('Request Sent');
   		
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        $('.request-loading').removeClass('active');
        $form.append("<p style='font-size:17px;line-height:28px;font-weight:400;'>There was a problem processing your request, please reload the page and try again or contact me directly at mike@lacourse.co</p>");
        dest = $(document).height() - $(window).height();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });

    // Prevent default posting of form
    event.preventDefault();
});

// Tab Interaction under Services
$('#tab .switch').click(function(e) {
	if( !$(this).hasClass('open') ) {
		$('ul.tags, #tab .switch').toggleClass('open');
	}
	e.preventDefault();
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

// Sticky Sidebar
function sticky(sidebar,content) {

	// Reset element width in case window has been resized
	$(sidebar).children('.sticky').css({'width':'auto'}).removeClass('stuck stop');

	// Variables
	var $window		= $(window),
		$sidebar	= $(sidebar).children('.sticky'),
		stuck		= false,
		width		= $(sidebar).width(),
		end			= $(content).height() - $window.height() -
						( $sidebar.outerHeight() - $window.height() );

	// Setup Sticky on load
	if ( $window.scrollTop() > end) {
		$sidebar.removeClass('stuck').addClass('stop').css({'width':width+'px' });
		stuck = false;
	} else {
		$sidebar.addClass('stuck').removeClass('stop').css({'width':width+'px'});
		stuck = true;
	}

	// Stick according to scroll position
	$window.scroll(function (event) {
		var scroll = $window.scrollTop();
		if (scroll >= end && stuck == true) {
			$sidebar.removeClass('stuck').addClass('stop').css({'width':width+'px' });
			stuck = false;
		} else if (scroll <= end && stuck == false ) {
			$sidebar.addClass('stuck').removeClass('stop').css({'width':width+'px'});
			stuck = true;
		} 
	});

}