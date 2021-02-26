$(function(){
    /*=============================================
    pc / mobile 구분
    =============================================*/
    var filter = "win16|win32|win64|macintel|mac|"; // PC일 경우 가능한 값
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            console.log("모바일에서 접속하셨습니다");
            $("#wrap").addClass('mobile');
        } else {
            $("#wrap").addClass('pc');
        }
    }

    /*=============================================
    File Upload
    =============================================*/
    var fileTarget = $('.wrap_file .upload_hidden');
    fileTarget.on('change', function () { // 값이 변경되면
        if (window.FileReader) { // modern browser
            if ($(this)[0].files && $(this)[0].files[0]) {
                var filename = $(this)[0].files[0].name;
            }
        } else { // old IE
            var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
        };
        // 추출한 파일명 삽입
        $(this).siblings('.upload_name').val(filename);
        showDeleteBtn();
    });

    fileTarget.on({
        focus: function() {
            $(this).closest('.wrap_file').addClass('outline');
        }, focusout: function() {
            $(this).closest('.wrap_file').removeClass('outline');
        }
    });
    showDeleteBtn();
    function showDeleteBtn() {
        //console.log('function 작동시');
        $('.wrap_file').each(function() {
            if($(this).find('.upload_name').val() !== '') {
                if($(this).find('.btn_fileuploade_close').length < 1) {
                    $(this).append('<button type="button" class="btn_fileuploade_close"></button>');
                }

            }
        });
    };

    $(document).on('click', '.btn_fileuploade_close', function() {
        $(this).siblings('input[type="file"]').val('');
        $(this).siblings('input.upload_name').val('');
        $(this).remove();
    });


    // input 입력시 btn_del 활성화
    $(document).on("propertychange change keyup paste input", ".group_search input", function() {
		if ($(this).val() == '') {
			$(this).siblings('.btn_del').removeClass('on');
		} else {
			$(this).siblings('.btn_del').addClass('on');
		}
    });
    // btn_del 클릭시 input value 삭제
    $(document).on('click', '.group_search .btn_del', function(){
		$(this).siblings('.form_control').val('');
		$(this).removeClass('on');
	});


    // 모바일 메뉴 열기
    $(document).on('click', '.mobile_menu .menu_open', function() {
        mobileMenuOpen();
    });

    // 모바일 메뉴 닫기
    $(document).on('click', '.mobile_menu .close_button', function() {
        mobileMenuClose();
    });

    $(document).on('click', '.mobile_menu .dim_bg', function(e) {
        if($(e.target).hasClass('dim_bg')) {
            mobileMenuClose();
        }
    });

    var mobileMenuOpen = function() {
        $('body').css('overflow', 'hidden');
        $('.mobile_menu .dim_bg').show();
        setTimeout(function() {
            $('.mobile_menu .dim_bg .inner').css('transform', 'translateX(-230px)');
        },100);
    }

    var mobileMenuClose = function() {
        $('body').removeAttr('style');
        $('.mobile_menu .dim_bg .inner').css('transform', 'translateX(0)');
        setTimeout(function() {
            $('.mobile_menu .dim_bg').hide();
        },200);
    }

    // 헤더에서 프로필클릭시 로그아웃 표시
    $("#header").on('click', '.profile_wrap', function() {
        $('.btn_logout_pc').show();
    })

    // 스크롤 여부 체크
    var didScroll;
    $(window).scroll(function(event){
        if($(window).width() > 768) {
            // didScroll = true;
            //GNB Fixed 가로 스크롤 이슈 해결
            $("#header, #footer.pof").css('left', 0-$(this).scrollLeft());
        } else {
            $("#header, #footer.pof").css('left', 0);
        }
    });
    setInterval(function() {
        if (!didScroll) { hasScrolled(); /*didScroll = false;*/ }
    }, 250);
    function hasScrolled() {
        // 동작을 구현
        if($(window).scrollTop() !== 0) {
            $("#header").addClass('active');
        } else {
            $("#header").removeClass('active');
        }
    }

    /* lnb 높이 조절 */
    function getVisible() {    
        var $el = $('#footer'),
            scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;

        if(visibleBottom - visibleTop > 0) {
            var calHeight = $(window).height() - $('#header').outerHeight() - (visibleBottom - visibleTop) - 101;
            $('.nav_lnb').css({ 'maxHeight': calHeight, 'top': $('#header').outerHeight() });
        } else {
            var calHeight = $(window).height() - $('#header').outerHeight();
            if(scrollTop < $('#header').outerHeight()) {
                $('.nav_lnb').css({ 'maxHeight': calHeight - 80, 'top': $('#header').outerHeight() + 80 });
            } else {
                $('.nav_lnb').css({ 'maxHeight': calHeight, 'top': $('#header').outerHeight() });
            }
        }
    }
    
    window.onload = function() {
        getVisible();
    }
    $(window).on('scroll resize', getVisible);

    // footerControl();
    // $(window).resize(function() {
    //     footerControl();
    // })
    // if($('.blank_div').is(':visible')) {
    //     $("#footer").addClass('pof');
    // }
    // function footerControl() {
    //     if($(window).width() > 768) {
    //         if($('#wrap').height() == $('body').height()) {
    //             $("#footer").addClass('pof');
    //         } else {
    //             $("#footer").removeClass('pof');
    //         }
    //     }
    // }



    // jquery ui modal 기본 옵션 추가
    $.extend($.ui.dialog.prototype.options, {
        modal: true,
        width: $(window).width() > 768 ? 640 : '100%',
        resizable: false,
        draggable: false,
        maxHeight: $(window).height(),
        open: function( event, ui ) {
            $('body').addClass('ov_hidden');
            var thisId = this.id;
            $(".ui-widget-overlay").on('click', function () {
               $("#" + thisId).dialog('close');
            });
        },
        close: function( event, ui ) {
            $('body').removeClass('ov_hidden');
            $(".ui-widget-overlay").off('click', function () {
            });
        }
    });
    // dialog resize
    $(window).resize(function() {
        $(".pop_wrap").dialog("option", "position", {my: "center", at: "center", of: window});
        if($(window).width() >= 768){
            $(".pop_wrap").dialog({width: '640'})
        }else{
            $(".pop_wrap").dialog({width: '100%'})
        }
    });

    // jquery ui autocomplete 기본 옵션 추가
    $.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    }
    $.extend($.ui.autocomplete.prototype.options, {
        open: function( event, ui ) {
            var $input = $(event.target),
                $results = $input.autocomplete("widget"),
                top = $results.position().top + 3;

            $results.css("top", top + "px");
        },
    });

    $(document).on('click', '.group_radio .input_radio input', function() {
        var index = $(this).closest('p').index();
        if(index === 1){
            $(this).closest('li').removeClass().addClass('case1');
        }else if(index === 2){
            $(this).closest('li').removeClass().addClass('case2');
        }else if(index === 3){
            $(this).closest('li').removeClass().addClass('case3');
        }
    })

    $(document).on('click', '.lst_accordion dt', function() {
        var tg = $(this);
        if (tg.hasClass('on')) {
            tg.removeClass('on');
            tg.next().stop().slideUp(200);
        }else{
            tg.closest('dl').find('dt').removeClass('on');
            tg.closest('dl').find('dd').stop().slideUp(200);
            tg.addClass('on');
            tg.next().stop().slideDown(200);
        }
    });


    AOS.init({
        offset: 100, // offset (in px) from the original trigger point
        duration: 1500, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
        easing: 'ease-in-out', // default easing for AOS animations
    });
});
