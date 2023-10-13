$(function () {
	
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 400) {
			$(".sticker").removeClass("stick");
		}
		else {
			$(".sticker").addClass("stick");
		}
		;
	});
	$('.search-btn').on("click", function (e) {

		if ($(this).hasClass("active")) {
			$(this).removeClass('active').siblings('.header-ser').removeClass('active')
		}
		else {
			$(this).addClass('active').siblings('.header-ser').addClass('active')
		}
	});
	var screen_w = jQuery(window).width();
	if (screen_w < 992) {
		var tm_shadow_tab_header = jQuery('.pages-cat .active a').text();
		jQuery('.pages-cat').addClass('pages-cat_dropdown dropdown');
		jQuery('.pages-cat ul').before('<button class="btn dropdown-toggle tm_shadow_tab_title" type="button" data-toggle="dropdown">' + tm_shadow_tab_header + '<span class="caret"></span></button>');
		jQuery(".pages-cat_dropdown ul").addClass("dropdown-menu");
		jQuery(".pages-cat_dropdown ul li").addClass("dropdown-item");
	}


	AOS.init({
		easing: 'ease-in-out-sine'
	});

	$('#frmSubscribe').submit(function (e){
		e.preventDefault();
		let fd = new FormData($('form#frmSubscribe')[0]);
		let url = $(this).attr('action');
		$('#frmSubscribe button').attr('disabled', '');

		$.ajax({
			url: url,
			data: fd,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data){
				$('#frmSubscribe button').removeAttr('disabled');
				$('#frmSubscribe .alert-content').remove();
				if (data.status == false) {
					$('#frmSubscribe .s4-btng').after('<div class="alert-content text-danger">' + data.response + '</div>')
				}
				else {
					$('#frmSubscribe .s4-btng').remove();
					$('#frmSubscribe').append('<div class="alert-content text-success">' + data.response + '</div>')
				}
			}
		});
	});

	// Accept Cookie
	let accept_cookie = getCookie("accept_cookie");
	if (accept_cookie != 'true') {
		$('.accept-cookie').removeClass('d-none');
	}
	$('.accept-cookie .close').click(function (e) {
		e.preventDefault();
		setCookie('accept_cookie', 'true', 1)
		$('.accept-cookie').fadeOut(200);
	});

	function setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

});

$(function () {
	$('.kv_slider').slick({
		dots: true, 
		infinite: true, 
		speed: 800, 
		slidesToShow: 1,
		adaptiveHeight: false, 
		autoplay: true,
		arrows: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
	});

	$('.kv_slider_mo').slick({
		dots: true, 
		infinite: true, 
		speed: 800,
		slidesToShow: 1, 
		adaptiveHeight: false,
		autoplay: true,
		arrows: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
	});
});
