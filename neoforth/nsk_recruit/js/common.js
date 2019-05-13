$(function () {
    // familysite
    var footFunc = function () {
        $('footer').find('.family_site > a').on('click', function (e) {
            $(this).parent().toggleClass('on');
            e.preventDefault();
        });
    };
    footFunc();

    // faq
    $('.accodion a').on('click', function () {
        var $li = $(this).parent();
        $('.accodion i').removeClass('on');
        $('.accodion a').css('font-weight', '400');
        $(this).css('font-weight', '700');
        $(this).find('i').addClass('on');
        $('.accodion li .depth2').slideUp();
        if (!$li.children('.depth2').is(":visible")) {
            $li.children('.depth2').slideDown();
        }
    });

    // gnb
    $('header nav>ul>li').on('mouseenter focusin', function () {
        $(this).children('.depth').stop().slideDown();
    }).on('mouseleave focusout', function () {
        $(this).children('.depth').stop().slideUp();
    });

    $('.all_nav').on('click', function () {
        // $(this).toggleClass('active');
        $('.all_menu').slideToggle();
    });

	$('.all_menu a').on('click',function() {
		$('.all_nav').trigger('click');
    });

	$(document).on('click','.pop_menu .ul_depth2 a',function() {
		$('.mobile_close').trigger('click');
    });

    // mobile_gnb
    $('.all_menu').clone().appendTo('.pop_menu_content');

    var winSize = $(window).width();
    $('.mobile_menu').on('click', function () {
        $('.dim-layer').css('display', 'block');
        $('.pop_menu').animate({
            opacity: '1',
            right: '0'
        }, 200, "linear");
        if (winSize < 768) {
            $('body').css({
                overflow: 'hidden'
            });
        }

    });
    $('.dimBg, .close, .mobile_close').on('click', function () {
        $('.dim-layer').css('display', 'none');
        $('.pop_menu').css({
            opacity: '0',
            right: '-320px'
        });
        if (winSize < 768) {
            $('body').css({
                overflow: 'visible'
            });
        }
    });

    $('.pop_menu_content .depth1 i').click(function () {

        var $this = $(this).parent();
        var $next = $(this).parent().next();

        $('.pop_menu_content .depth1').removeClass('active');
        $('.pop_menu_content .ul_depth2').slideUp();

        if (!$next.is(":visible")) {
            $next.slideDown();
            $this.addClass('active');
        }
    });
    //gotop
    winSizeRight();
    scrollFade();

    $(window).on('scroll resize', function () {
        winSizeRight();
        scrollFade();
    });

    $('#scroll').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    function scrollFade() {

        if ($(this).scrollTop() > 200) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    }

    function winSizeRight() {
        // if ($(window).width() > 1300) {
        //     $right = $('.container').offset().left - $('#scroll').width() - 20;
        //     $('#scroll').css('right', $right + 'px');
        // } else {
            $('#scroll').css('right', '10px');
        // }
    }

    // 애니메이션부분


    //회사소개 베어링 360도 회전
    if(!$('#area_tit').length){
        // console.log("회사소개페이지 아님");
    }else{
        // console.log("회사소개페이지");
        $(window).on('scroll',function() {
            // console.log($(this).scrollTop());
            // console.log('area_tit:' + $('#history').offset().top);

            var bottom_of_element = $('.area_img').offset().top + $('.area_img').outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_element) {
                $('.area_img').addClass('active');
            }else{
                // $('.area_img').removeClass('active');
            }
        });
        
        
    }

    // 메인스크롤 페이드
    $(window).scroll(function () {
        $('.fadein').each(function (i) {

            var bottom_of_element = $(this).offset().top + $(this).outerHeight()-200;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_element) {
                $(this).animate({ 'opacity': '1', 'margin-bottom': '0px' }, 1000);
            }

        });
        $('.fade').each(function (i) {

            var bottom_of_element = $(this).offset().top + $(this).outerHeight()-200;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_element) {
                $(this).animate({
                    'opacity': '1'
                }, 1000);
            }

        });
    });

    // 메인배경 애니메이션    
    $('#visual').animate({opacity: 0}, 'slow', function() {
        $(this).animate({opacity: 1});
    });
    $('.bg_wrap').delay(1000).animate({'opacity': '1'}, 1000);

    $('.v_bg').delay(2000).animate({'opacity':'1'},1000);
    $('.v_bg p:nth-of-type(1)').delay(2000).animate({ 'opacity': '1','margin-left':'0' }, 1000);
    $('.v_bg p:nth-of-type(2)').delay(2000).animate({ 'opacity': '1', 'margin-right': '0'  }, 1000);
    $('.scroll_area').delay(2000).fadeIn(2000);

    // 개인정보처리방침, 이용약관 레이어팝업
    $('.use_agree').popLayer();
    $('.personal_info').popLayer();
});

// 레이어팝업 플러그인
(function ($) {
    function PopLayer(selector) {
        this.init(selector);
        this.openEvent();
    }

    PopLayer.prototype.init = function (selector) {
        // 레이어 뒤 스크롤 방지
        $('body').css({
            overflow: 'hidden'
        });
        //컨텐츠 정의
        $el = $(selector).attr('href');

        // 화면 너비 높이, 컨텐츠 너비 높이
        $elWidth = $($el).outerWidth();
        $elHeight = $($el).outerHeight();
        docWidth = $(document).width();
        docHeight = $(document).height();
    };

    PopLayer.prototype.openEvent = function () {
        var objThis = this;

        // 백그라운드 fadeIn
        $('.dim_layerpop').fadeIn();
        // 컨텐츠 fadeIn
        $($el).fadeIn();

        // 화면의 중앙에 레이어를 띄운다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $($el).css({
                marginTop: -$elHeight / 2,
                marginLeft: -$elWidth / 2
            });
        } else {
            $($el).css({
                top: 0,
                left: 0
            });
        }

        $($el).find('.btn_close').click(function () {
            objThis.closeEvent();
        });

        $('.dim_layerpop>.dimBg_layerpop').click(function () {
            objThis.closeEvent();
        });
    };

    PopLayer.prototype.closeEvent = function () {
        $('.dim_layerpop').fadeOut();
        $($el).fadeOut();
        $('body').css({
            overflow: 'visible'
        });
        return false;
    };

    $.fn.popLayer = function () {

        this.click(function () {
            new PopLayer(this);
        });

    };
    // //레이어팝업 플러그인
})(jQuery);