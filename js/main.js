'use strict';

var SCROLL_SPEED = 500;

$(document).ready(function() {
	
	window.onresize = function() {
		unbindDesktop();
    	unbindMobile();
    	mediaFunctions();
	};

	mediaFunctions();

	$('.js-email-response-dialog__button, .js-icon--close').on('click', function() {
		$('.js-email-overlay').removeClass("show-email-overlay");
		$('.js-email-response-dialog').css({'opacity': '0'});
	});

	$('.js-contact-form').on('submit', function(event) {
		event.preventDefault();

		$.ajax({
			type: "POST",
			url: $(this).attr('action'),
			data: {
				'Name': $('.js-enquire-name').val(),
				'Email': $('.js-enquire-email').val(),
				'Subject': $('.js-enquire-subject').val(),
				'Message': $('.js-enquire-message').val()
			},
			dataType: 'json',
			success: function(data) {

				$('.js-contact-form')[0].reset();
				$('.js-email-overlay').addClass("show-email-overlay");

				var title = "";
				var message = "";

				if(data.error) {
					showEmailMessage();
					title = "Error";
					message = data.error.message;
				} else {
					animateEmailMessage();
					title = "Success";
					message = "Email sent, you should receive a response within 48 hours.";
				}

				$('.js-email-dialog__header-title').text(title);
				$('.js-email-response-dialog__message').text(message);
			}, 
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$('.js-email-dialog__header-title').text("Error");
				$('.js-email-response-dialog__message').text(textStatus);
			}
		});
	});

	function animateEmailMessage() {
		$('.js-email-response-dialog').delay(1800).animate({'opacity': '1'}, 0);
	}

	function showEmailMessage() {
		$('.js-email-response-dialog').animate({'opacity': '1'}, 0);
	}

	function mediaFunctions() {

		if($(window).width() <= 600) {

			unbindDesktop();

			$('.js-hamburger-icon').on('click', function() {
				if(!$('.js-hamburger-icon').hasClass('is-active')) {
					$(this).addClass('is-active');
					addHamburgerMenuStyling();
				} else {
					$(this).removeClass('is-active');
					removeHamburgerMenuStyling();
				}
			});

			$(".js-personal-link, .js-portfolio-link, .js-contact-link").on('click', function() {
			    $('.js-hamburger-icon').trigger('click');
			    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 1000);
			});
		} else {
			$('.js-hamburger-icon').removeClass('is-active');
			removeHamburgerMenuStyling();
			// offload event listeners on resize to desktop
			unbindMobile();

			$(".js-home-link, .js-personal-link, .js-portfolio-link, .js-contact-link").on('click', function() {
			    $('html, body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top}, 1000);
			});
		}
	}

	function unbindDesktop() {
		$(".js-personal-link, .js-portfolio-link, .js-contact-link").off('click');
	}

	function unbindMobile() {
		$(".js-personal-link, .js-portfolio-link, .js-contact-link").off('click');
		$('.js-hamburger-icon').off('click');
	}

	function addHamburgerMenuStyling() {
		$('.js-menu-list').addClass("js-show-menu");
		$('.overlay').addClass('js-zindex-4');
		$('.js-hamburger-icon').addClass('left');
		$('.logo-square').addClass('opacity-0');
		$('body').addClass('overflow-hidden');
		$('nav.main').addClass('height-100');
	}

	function removeHamburgerMenuStyling() {
		$('.js-menu-list').removeClass("js-show-menu");
		$('.overlay').removeClass('js-zindex-4');
		$('.js-hamburger-icon').removeClass('left');
		$('.logo-square').removeClass('opacity-0');
		$('body').removeClass('overflow-hidden');
		$('nav.main').removeClass('height-100');
	}

});
