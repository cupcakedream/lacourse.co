
// Simple Smooth Scrolling
var hashTagActive = "";
$(".smooth-scroll").click(function (event) {
	event.preventDefault();
		//calculate destination place
		var dest = 0;
		if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
			dest = $(document).height() - $(window).height();
		} else {
			dest = $(this.hash).offset().top;
		}
		//go to destination
		$('html,body').animate({
			scrollTop: dest
		}, 350, 'swing');
		hashTagActive = this.hash;
});

function update_sidebar(direction,section) {
	if (section == 3 && direction == 'down') {
			//$('.sidebar').hide();
			//$('#mini-request').stop().fadeIn();
	}
	else if (section == 2) {
		if ( !$('#mini-services').is(":visible") ) { // serves as debounce
			//$('.sidebar').hide(	);
			//$('#mini-services').stop().fadeIn();
		}
	}
	else if (section == 1 && direction == 'up') {
		if ( !$('#mini-about').is(":visible") ) { // serves as debounce
			//$('.sidebar').hide();
			//$('#mini-about').stop().fadeIn();
		}
	}
}

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

// Submit Request a Quote Form

$('input, textarea').focus(function() {
	$(this).removeClass('error');
	$(this).prev().removeClass('error');
});

// Variable to hold request
var request;

// Bind to the submit event of our form
$("#make-request").submit(function(event){

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, textarea");
    
    if($inputs[0].value == '') {
    	$($inputs[0]).addClass('error');
    	$($inputs[0]).prev().addClass('error');
		dest = $('#make-request').offset().top - 100;
		$('html,body').animate({scrollTop: dest}, 350, 'swing');		
    	return false;
    }
    else if($inputs[1].value == '') {
    	$($inputs[1]).addClass('error');
    	$($inputs[1]).prev().addClass('error');
		dest = $('#make-request').offset().top - 100;
		$('html,body').animate({scrollTop: dest}, 350, 'swing');
    	return false;
    }
    else if($inputs[2].value == '') {
    	$($inputs[2]).addClass('error');
    	$($inputs[2]).prev().addClass('error');
		dest = $('#make-request').offset().top - 100;
		$('html,body').animate({scrollTop: dest}, 350, 'swing');
    	return false;
    }
    else if($inputs[4].value == '') {
    	$($inputs[4]).addClass('error');
    	$($inputs[4]).prev().addClass('error');
		dest = $('#make-request').offset().top - 100;
		$('html,body').animate({scrollTop: dest}, 350, 'swing');
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
        // Log a message to the console
        $form.append("<p style='font-size:17px;line-height:28px;font-weight:400;'>Your request has been sent, thanks! I'll review your project requirements and get back to you as soon as possible.</p>");
   		dest = $(document).height() - $(window).height();
   		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        $form.append("<p style='font-size:17px;line-height:28px;font-weight:400;'>There was a problem processing your request, please reload the page and try again or contact me directly at mike@lacourse.co</p>");
        dest = $(document).height() - $(window).height();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });

    // Prevent default posting of form
    event.preventDefault();
});

//Add waypoints for our different sections

$(document).ready(function() {

	// 1st waypoint transitions sidebar from "portfolio" to "learn more" section
	window.waypoint_1 = $('#portfolio').waypoint({
	  handler: function(direction) {
		$('#side-about .stick').toggleClass('end');
	  },
	  continuous: false,
	  offset: function() { 
	    height_offset = -1*($('#portfolio').outerHeight() - $('#side-about .stick').outerHeight());
	  	return height_offset;
	  }
	});
	
	var side_stick_1 = new Waypoint.Sticky({
	  element: $('#side-about .stick')[0]
	});

// Gallery for Adventures
	$('.adventures').magnificPopup({
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Michael Lacourse</small>';
			}
		}
	});

	// Switch tabs
	$('#tab .switch').click(function(e) {
		if( !$(this).hasClass('open') ) {
			$('ul.tags, #tab .switch').toggleClass('open');
		}
		e.preventDefault();
	});
});

