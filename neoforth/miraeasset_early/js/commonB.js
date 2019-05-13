$(document).ready(function () {
    // 레이어 팝업
    $('.pop_button').click(function () {
        var $href = $(this).attr('href');
        layer_popup($href);
        $('body').css({
            overflow: 'hidden'
        });

    });

    function layer_popup(el) {
        var $el = $(el); //레이어의 id를 $el 변수에 저장
        $('.dim_layerpop').fadeIn();
        $el.fadeIn();

        var $elWidth = $el.outerWidth(),
            $elHeight = $el.outerHeight(),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        // 화면의 중앙에 레이어를 띄운다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight / 2,
                marginLeft: -$elWidth / 2
            })
        } else {
            $el.css({
                top: 0,
                left: 0
            });
        }

        $el.find('.btn_close, .cancle').click(function () {
            pop_close();
        });

        $('.dim_layerpop .dimBg_layerpop').click(function () {
            pop_close();
        });

        function pop_close() {
            $('.dim_layerpop').fadeOut();
            $el.fadeOut();
            $('body').css({
                overflow: 'visible'
            });
            return false;
        }
    }
}); // end ready