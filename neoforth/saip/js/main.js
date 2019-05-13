$(document).ready(function() {
    //main 슬라이드 사이즈 모바일, PC 구분
    var winSize = $(window).width() + 17;

    if (winSize < 768) { //모바일 경우 실행
        $(".banner_web").hide();
        $(".banner_mobile").show();
    };

    $(window).resize(function(e) {
        e.preventDefault();
        winSize = $(window).width() + 17;
        if (winSize > 767) { //모바일 이상
            $(".banner_web").show();
            $(".banner_mobile").hide();
        } else { //모바일
            $(".banner_web").hide();
            $(".banner_mobile").show();
        };
    });

    //회원가입 모두동의
    $('#total_agree').click(function() {
        $('.agree2').prop('checked', this.checked);
    });
    //회원가입 2개다 체크되면 위항목도 체크
    $('.agree2').click(function(){
        if($('.agree2').length == $('.agree2:checked').length){
            $('#total_agree').prop('checked',true);
        }else{
            $('#total_agree').prop('checked',false);
        }
    });

    // 주문하기 모두동의
    $('#total_order').click(function() {
        $('.order_checkbind').prop('checked', this.checked);
    });
    //주문하기 체크박스 모두체크되면 맨위항목도 체크
    $('.order_checkbind').click(function(){
        if($('.order_checkbind').length == $('.order_checkbind:checked').length){
            $('#total_order').prop('checked',true);
        }else{
            $('#total_order').prop('checked',false);
        }
    });

    //회원가입 레이어 팝업
    $(document).on("click",".domae_pop",function(){
        var $href = $(this).attr('href');
        layer_popup($href);
        $('body').css({overflow:'hidden'});

    });

    function layer_popup(el){
        var $el = $(el);        //레이어의 id를 $el 변수에 저장
        $('.dim-layer-join').fadeIn();
         $el.fadeIn();

        var $elWidth = ~~($el.outerWidth()),
            $elHeight = ~~($el.outerHeight()),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        // 화면의 중앙에 레이어를 띄운다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight /2,
                marginLeft: -$elWidth/2
            })
        } else {
            $el.css({top: 0, left: 0});
        }

        $('a.btn-layerClose, .btn_close').click(function(){
            $('.dim-layer-join').fadeOut();
            $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다
            $('body').css({overflow:'visible'});
            return false;
        });

        $('.dim-layer-join .dimBg-join').click(function(){
            $('.dim-layer-join').fadeOut();
            $('body').css({overflow:'visible'});
            return false;
        });
    }

    //메모 레이어 팝업
    $('.memo_pop').click(function(){
        var $href = $(this).attr('href');
        layer_popup1($href);
    });

    function layer_popup1(el){
        var $el = $(el);        //레이어의 id를 $el 변수에 저장
        $('.dim-layer-memo').fadeIn();
         $el.fadeIn();

        var $elWidth = ~~($el.outerWidth()),
            $elHeight = ~~($el.outerHeight()),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        // 화면의 중앙에 레이어를 띄운다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight /2,
                marginLeft: -$elWidth/2
            })
        } else {
            $el.css({top: 0, left: 0});
        }

        $el.find('a.btn-layerClose, .btn_close').click(function(){
            $('.dim-layer-memo').fadeOut();
            $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
            return false;
        });

        $('.dim-layer-memo .dimBg-memo').click(function(){
            $('.dim-layer-memo').fadeOut();
            return false;
        });
    }
    // menu open
    //모바일gnb메뉴
    $('.menu_a').click(function() {
      $('.dim-layer').css('display', 'block');
      $('.pop_menu').animate({
        opacity: '1',
        left: '0'
      }, 200, "linear");
      // if (winSize < 768){
      //     $('body').css({overflow:'hidden'});
      // }

    })
    $('.dimBg, .close').click(function() {
      $('.dim-layer').css('display', 'none');
      $('.pop_menu').css({opacity: '0', left    : '-320px'});
      // if (winSize < 768){
      //     $('body').css({overflow:'visible'});
      // }
    })

    // 탭
    $(function() {
            // 탭
            $('.tab_wrap ul.tab li').click(function() {
                var activeTab = $(this).attr('data-tab');
                $('.tab_wrap ul.tab li').removeClass('current');
                $('.tabcontent').removeClass('current');
                $(this).addClass('current');
                $('#' + activeTab).addClass('current');
            })
        });


    // select box class
    /* Custom select design */
    $('.drop-down').each(function(idx) {

        var dropDown = $(this);

        /*	드롭다운 디자인 부분	*/
        dropDown.append('<div class="button"></div>');
        dropDown.append('<ul class="select-list"></ul>');
        dropDown.find('select option').each(function(i) {
            var bg = $(this).css('background-image');
            dropDown.find('.select-list').append('<li class="clsAnchor"><span value="' + $(this).val() + '" class="' + $(this).attr('class') + '" style=background-image:' + bg + '>' + $(this).text() + '</span></li>');
        });

        /*	드롭다운 option	*/
        dropDown.find('.button').html('<span style=background-image:' + dropDown.find('select').find(':selected').css('background-image') + '>' + dropDown.find('select').find(':selected').text() + '</span>' + '<a href="javascript:void(0);" class="select-list-link"></a>');
        dropDown.find('ul li').each(function() {
            if ($(this).find('span').text() == dropDown.find('select').find(':selected').text()) {
                $(this).addClass('active');
            }
        });

        /*	드룹다운 onclick	*/
        dropDown.find('.select-list span').on('click', function() {
            var dd_text = $(this).text();
            var dd_img = $(this).css('background-image');
            var dd_val = $(this).attr('value');
            dropDown.find('.button').html('<span style=background-image:' + dd_img + '>' + dd_text + '</span>' + '<a href="javascript:void(0);" class="select-list-link"></a>');
            $('.drop-down .select-list span').parent().removeClass('active');
            $(this).parent().addClass('active');
            dropDown.find('select[name=options]').val(dd_val);
            dropDown.find('.select-list li').slideUp();
        });

        dropDown.find('.button').on('click', function() {
            dropDown.find('ul li').slideToggle();
        });

    });
            /* End */

});
