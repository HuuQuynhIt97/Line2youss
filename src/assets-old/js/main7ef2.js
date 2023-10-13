/*! Thu Aug 20 2020  | Author by Tino Tseng*/
(function ($) {
	$.fn.TopClass_fixed_bottom = function (has_class) {
		var _Scroll_class = this, ps = _Scroll_class.offset();
		$(window).scroll(function () {
			if ($(this).scrollTop() > ps.top + _Scroll_class.height() && _Scroll_class.hasClass(has_class)) {
				_Scroll_class.fadeOut(0, function () {
					$(this).removeClass(has_class).addClass('fixed').fadeIn(0).addClass('animated fadeInDown');
					//                       console.log('111')
				});
			}
			else if ($(this).scrollTop() <= ps.top && _Scroll_class.hasClass('fixed')) {
				_Scroll_class.fadeOut(0, function () {
					$(this).removeClass('fixed').addClass(has_class).fadeIn(0);
					//                     console.log('222')
				});
			}

		});
	}, $.fn.main_img_bg = function () {
		function checkWidth() {
			var e = window, a = 'inner';
			if (!('innerWidth' in window)) {
				a = 'client';

				e = document.documentElement || document.body;
			}
			return e[a + 'Width']
		}

		var _this = $(this);

		function mainimg() {
			if (checkWidth() >= 768) {
				_this.each(function () {
					var $pc_img = $(this).attr('data-pc-img-url');
					$(this).css('background-image', 'url(' + $pc_img + ')');

				})
			}
			else if (checkWidth() <= 767) {
				_this.each(function () {
					var $mb_img = $(this).attr('data-mb-img-url');
					$(this).css('background-image', 'url(' + $mb_img + ')');

				})
			}

		}

		mainimg();
		$(window).on('resize', mainimg);
	}, $.fn.main_tab = function (body_class, body_item_class) {
		$(this).each(function () {
			var _this = $(this);
			var _this_body = _this.siblings(body_class).children(body_item_class);

			_this_body.each(function (index) {
				_this_body.hide();
				_this_body.eq(0).show();
				$(this).attr('data-tabs-body', index);
			});
			_this.children('ul').children('li').each(function (index) {
				var _tabs = $(this).attr('data-tabs-index', index);
				_tabs.on('click', function () {
					$(this).addClass('active').siblings('li').removeClass('active');
					$(this).parents(_this).siblings(body_class).children('[data-tabs-body]:eq(' + index + ')').fadeTo("slow", 1).siblings(body_item_class).hide();

				})
			});


		})
	}, $.fn.main_menuClass = function (title_class, list_class, ok, active_show) {
		var _this = $(this);

		var _ok = ok == undefined || ok == true ? true : false;

		if (_ok) {
			$(this).children('a,.' + title_class).on('click', function () {

				var $this = $(this).parent();
				var $siblings = $this.siblings();

				$this.siblings().removeClass('active_top');
				$this.find('.' + list_class).stop().slideToggle("slow");
				$siblings.find('.' + list_class).stop().slideUp('slow');

				if ($this.hasClass('active_top') == false) {
					$this.addClass('active_top')
				}
				else {
					$this.removeClass('active_top')
				}
			});

			if ($(this).hasClass(active_show)) {
				$('.' + active_show).each(function () {
					$(this).children('.' + title_class).click().parent().addClass('active_top');
				})
			}

			if ($(this).hasClass('active_top')) {

				$('.active_top').children('.' + list_class).css('display', 'block');

			}
		}
		else {

			$(this).children('a,.' + title_class).off();

		}
	}, $.fn.main_tabVideo = function (ul, li, body_class, body_item_class, video) {
		var _video = video || false;
		$(this).each(function () {
			var _this = $(this);
			var _this_body = _this.siblings(body_class).children(body_item_class);

			_this_body.each(function (index) {
				_this_body.hide();
				_this_body.eq(0).show();
				$(this).attr('data-tabs-body', index);
			});
			var le = _this.children(ul).children(li);
			le.each(function (index) {
				var _tabs = $(this).attr('data-tabs-index', index);
				_tabs.on('click', function () {
					var _this = $(this),
						_tab_body = _this.parents(_this).siblings(body_class).children('[data-tabs-body]:eq(' + index + ')');

					if (!_this.hasClass('no')) {
						_this.addClass('active').siblings(li).removeClass('active');
						_tab_body.fadeTo("slow", 1).siblings(body_item_class).hide();

						if ($(body_item_class).find('.viedo-body').length > 0) {

							_tab_body.siblings('[data-tabs-body]').find('.viedo-body').children("iframe").each(function () {
								var src_video = $(this).attr("src");
								if (_video) {
									$(this).attr("src", "");
									$(this).attr("src", src_video);
								}
								else {
									$(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
								}


							});
						}
					}
				});
			});
		})
	};

})(jQuery);

$(function () {
	function i() {
		var i = window, s = "inner";
		return "innerWidth" in window || (s = "client", i = document.documentElement || document.body), i[s + "Width"]
	}

	$(".index_section2-tabs-title").main_tab(".index_section2-tabs-body", ".index_section2-tabs-item"), $(document).on("click", ".navbar-toggler", function () {
		var i = $(this);
		setTimeout(function () {
			$("#navigation").hasClass("show") ? ($("html").addClass("ov-hidden"), i.addClass("yes")) : ($("html").removeClass("ov-hidden"), i.removeClass("yes"))
		}, 400)
	}), $(window).on("resize", function () {
	});

	var s;
	$(window).resize(function () {
		clearTimeout(s), s = setTimeout(function () {
			i() > 991 && $(".navbar-toggler").hasClass("yes") && $(".navbar-toggler ").click()
		}, 50)
	});

	$('.news-more01').main_menuClass('news-more-btn', 'news-more-list');
	$('.csr-more01').main_menuClass('csr-more-btn', 'csr-more-list');

	$('.kv_slider_arrow').slick({
		dots: false, //原點
		infinite: true, //無限循環滑動
		speed: 800, //滑動/淡入動畫速度
		slidesToShow: 1, //要顯示的幻燈片數量
		adaptiveHeight: false, //響應高度
		autoplay: false, arrows: true, autoplaySpeed: 5000, pauseOnFocus: false,
	});

	$('.banner_slider').slick({
		dots: true, //原點
		infinite: true, //無限循環滑動
		speed: 800, //滑動/淡入動畫速度
		slidesToShow: 1, //要顯示的幻燈片數量
		adaptiveHeight: false, //響應高度
		autoplay: false,
		arrows: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		responsive: [{
			breakpoint: 768, settings: {
				arrows: false, dots: true,
			}
		}]
	});
	$('.s3-slider').slick({
		dots: false, //原點
		infinite: true, //無限循環滑動
		speed: 800, //滑動/淡入動畫速度
		slidesToShow: 3, //要顯示的幻燈片數量
		adaptiveHeight: false, //響應高度
		autoplay: false,
		arrows: true,
		autoplaySpeed: 5000,
		pauseOnFocus: true,
		responsive: [{
			breakpoint: 768, settings: {
				centerMode: true, slidesToShow: 1,
			}
		}]
	});
	$('.s5-slider').slick({
		dots: true, //原點
		infinite: true, //無限循環滑動
		speed: 800, //滑動/淡入動畫速度
		slidesToShow: 3, //要顯示的幻燈片數量
		adaptiveHeight: false, //響應高度
		autoplay: false,
		arrows: true,
		autoplaySpeed: 5000,
		pauseOnFocus: true,
		responsive: [{
			breakpoint: 768, settings: {
				centerMode: true, slidesToShow: 1,
			}
		}]
	});


	$('.news_slider').slick({
		dots: false, //原點
		infinite: true, //無限循環滑動
		speed: 800, //滑動/淡入動畫速度
		slidesToShow: 3, //要顯示的幻燈片數量
		adaptiveHeight: false, //響應高度
		autoplay: false,
		arrows: false,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		responsive: [{
			breakpoint: 991, settings: {
				slidesToShow: 2, slidesToScroll: 1, arrows: false, dots: true,
			}, breakpoint: 768, settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				centerMode: true,
				centerPadding: '30px'
			}
		}]
	});

	$('.business_slider').slick({
		dots: false, //原點
		infinite: true, //無限循環滑動
		speed: 800, //滑動/淡入動畫速度
		slidesToShow: 3, //要顯示的幻燈片數量
		adaptiveHeight: false, //響應高度
		autoplay: false,
		arrows: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		responsive: [{
			breakpoint: 991, settings: {
				slidesToShow: 2, slidesToScroll: 1, arrows: false, dots: true,
			}, breakpoint: 768, settings: {
				slidesToShow: 1, slidesToScroll: 1, arrows: true, dots: false,
			}
		}]
	});

	$(".about-section05-slider").slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: !1,
		autoplaySpeed: 2e3,
		focusOnSelect: !0,
		accessibility: !1,
		pauseOnFocus: !0,
		pauseOnHover: !0,
		responsive: [{
			breakpoint: 991, settings: {
				slidesToShow: 2, slidesToScroll: 1
			}, breakpoint: 768, settings: {
				slidesToShow: 1, slidesToScroll: 1
			}
		}]
	});

	$(".album-slider-img").slick({
		arrows: !0,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerPadding: "0%",
		speed: 500,
		asNavFor: '.album-slider-nav,.album-slider-nav2'
	});

	$(".album-slider-nav").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		vertical: !0,
		asNavFor: ".album-slider-img",
		dots: !1,
		arrows: !1,
		centerMode: !1,
		focusOnSelect: !0,
		centerPadding: "0"
	});

	$(".album-slider-nav2").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: ".album-slider-img",
		dots: !1,
		arrows: !1,
		centerMode: !1,
		focusOnSelect: !0,
		centerPadding: "0"
	});

	$(document).ready(function () {
		$('.album-slider-img').slick();
		$('.album-slider-nav').slick();
	});

	$('.modal').on('shown.bs.modal', function (e) {
		$('.album-slider-img').slick('setPosition');
	});
	$('.modal').on('shown.bs.modal', function (e) {
		$('.album-slider-nav').slick('setPosition');
		$('.album-slider-nav').resize();
	});

	(function scroll_top() {
		var offset = 300, offset_opacity = 200, scroll_top_duration = 520,
			$back_to_top = $('.cd-top');

		$(window).scroll(function () {
			($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if ($(this).scrollTop() > offset_opacity) {
				$back_to_top.addClass('cd-fade-out');
			}
		});
		$back_to_top.on('click', function (event) {
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0,
			}, scroll_top_duration);
		});
	})();
});

$(function () {
	var audio = false;
	$('.taigi-words-voice-player').click(function (event) {
		event.preventDefault();
		let status = $(this).attr('status');
		$('.taigi-words-voice-player').attr('status', '');
		$('.taigi-words-voice-player i').removeClass('fa-pause');
		$('.taigi-words-voice-player i').addClass('fa-play');
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}

		if (status == 'playing') {
			$(this).attr('status', '');
			$(this).find('i').removeClass('fa-pause');
			$(this).find('i').addClass('fa-play');
		}
		else {
			let mp3_url = $(this).attr('data-content');
			let _this = $(this);
			audio = new Audio(mp3_url);
			audio.play();
			audio.onended = function () {
				_this.attr('status', '');
				_this.find('i').removeClass('fa-pause');
				_this.find('i').addClass('fa-play');
			};
			$(this).find('i').removeClass('fa-play');
			$(this).find('i').addClass('fa-pause');
			$(this).attr('status', 'playing');
		}
	});

	// audio.onended = function () {
	// 	$('.taigi-words-voice-player').attr('status', '');
	// 	$('.taigi-words-voice-player i').removeClass('fa-pause');
	// 	$('.taigi-words-voice-player i').addClass('fa-play');
	// };

	$('.taigi-words-video').click(function (event) {
		event.preventDefault();
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}
		let video_url = $(this).attr('data-content');
		let title = $(this).attr('data-title');
		$('#videoModal .modal-title').html(title);
		$('#videoModal iframe').attr('src', video_url);
		$('#videoModal').modal('show');
	});

	$('#videoModal').on('hidden.bs.modal', function (e) {
		$('#videoModal iframe').attr('src', '');
	})
	$('.fancybox-item').fancybox({
		beforeClose: function () {
			if (audio) {
				audio.pause();
				audio.currentTime = 0;
			}
			$('.taigi-words-voice-player').attr('status', '');
			$('.taigi-words-voice-player i').removeClass('fa-pause');
			$('.taigi-words-voice-player i').addClass('fa-play');
		},
		beforeLoad: function () {
			if (audio) {
				audio.pause();
				audio.currentTime = 0;
			}
			$('.taigi-words-voice-player').attr('status', '');
			$('.taigi-words-voice-player i').removeClass('fa-pause');
			$('.taigi-words-voice-player i').addClass('fa-play');
		}
	});
});
