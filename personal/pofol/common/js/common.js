// topnav 이동 스크립트
// var $ = jQuery.noConflict();
$(document).ready(function() {
    $(window).on('scroll', function() {
        var scTop = $(window).scrollTop(),
            mh = $('header').height(),
            sec1 = $('#main').offset().top,
            sec2 = $('#portfolio').offset().top,
            sec3 = $('#about').offset().top,
            sec4 = $('#contact').offset().top;
        if (scTop >= 0) {
            $('.gnb li').removeClass('active')
        }
        if (scTop >= sec1 - mh) {
            $('header').removeClass('active');
            $('.gnb li').eq(0).addClass('active').siblings().removeClass('active');
        }
        if (scTop >= sec2 - mh) {
            $('header').addClass('active');
            $('.gnb li').eq(1).addClass('active').siblings().removeClass('active');
        }
        if (scTop >= sec3 - mh) {
            $('header').addClass('active');
            $('.gnb li').eq(2).addClass('active').siblings().removeClass('active');
        }
        if (scTop >= sec4 - mh) {
            $('header').removeClass('active');
            $('.gnb li').eq(3).addClass('active').siblings().removeClass('active');
        }
    });
    $('.logo').on('click', function() {
        $('html, body').stop().animate({
            'scrollTop': 0
        }, 300);
        return false;
    });
    $('.gnb li a').on('click', function() {
        var scrollPosition = $($(this).attr("href")).offset().top;
        $('html,body').stop().animate({
            scrollTop: scrollPosition
        }, 1000);
        return false;
    });

    // 스크롤 위로 버튼
    scrollFade();

    $(window).on('scroll resize', function() {
        scrollFade();
    });

    $('#scroll').on('click', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    function scrollFade() {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    }
	
	//	레이어팝업
	$(document).on('click', '.pop_button', function () {
		$.popLayer.open($(this).attr('href'));
	});
});

$(window).on('load',function() {
    var $container = $('.pofol_contents');
    $container.isotope({itemSelector: '.pofol_contents>div'});

    $('.pofol_menu a').on('click', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({filter: filterValue});
        $(this).addClass('current').siblings().removeClass();
        return false;
    });
});

(function ($) {
// fade속도 조절
var _fadeSpeed = 400;

$.popLayer = {
	/* popLayer open */
	open: function (e) {
		// 1. 레이어팝업 뛰울 ID _e에 저장
		var _e = $(e);

		// 2. dimLayer 로딩
		$('body').append('<div class="dimBg-layerpop"></div>');
		var dimLayer = $('.dimBg-layerpop');
		dimLayer.css({ 'display': 'none', 'position': 'fixed', 'left': 0, 'right': 0, 'top': 0, 'bottom': 0, 'background': '#000', 'z-index': 9999, 'opacity': '0.5' });
		dimLayer.fadeIn(_fadeSpeed);

		// 3. 레이어팝업 로딩
		_e.fadeIn(_fadeSpeed);

		// 4. 상위요소 스크롤 막기
		$('body').addClass('ov-hidden');

		// 5. 화면의 중앙에 레이어를 띄운다.
		var _eWidth = _e.outerWidth();
		var _eHeight = _e.outerHeight();
		var docWidth = $(document).width();
		var docHeight = $(document).height();
		if (_eHeight < docHeight || _eWidth < docWidth) {
			_e.css({ marginTop: -_eHeight / 2, marginLeft: -_eWidth / 2 })
		} else {
			_e.css({ top: 0, left: 0 });
		}

		// 6. close버튼, dimplayer 버튼 클릭시 close
		_e.find('.btn-close').click(function () {
			$.popLayer.close();
		});
		dimLayer.click(function () {
			$.popLayer.close();
		});
	},
	/* popLayer close */
	close: function () {
		// 1. dimLayer fadeout 후 remove
		var dimLayer = $('.dimBg-layerpop');
		dimLayer.fadeOut(_fadeSpeed);
		setTimeout(function () {
			dimLayer.remove();
		}, _fadeSpeed);

		// 2. popLayer fadeout
		$('.pop-layer').fadeOut(_fadeSpeed);

		// 3. 상위요소 스크롤 막은것 풀기
		$('body').removeClass('ov-hidden');
		return false;
	}
}
})(jQuery);