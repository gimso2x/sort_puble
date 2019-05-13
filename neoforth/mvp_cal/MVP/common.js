$(document).ready(function() {
    // 레이어 팝업
    $('.pop_button').click(function() {
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
            });
        } else {
            $el.css({
                top: 0,
                left: 0
            });
        }

        $el.find('.btn_close').click(function() {
            pop_close();
        });

        $('.dim_layerpop .dimBg_layerpop').click(function() {
            pop_close();
        });

        $('.btn_control.white').click(function() {
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

    //기능 추가 부분
    var tr_id = 1;
    $('.btn_add').on('click', function() {
        var tr = "<tr class=\"new_tr calculate small\">"
               + "<th><a href=\"javascript:void(0)\" class=\"btn_minus\"></a></th>"
               + "<th><input type=\"text\" name=\"add" + tr_id + "_name\"></th>"
               + "<td><input type=\"radio\" name=\"add" + tr_id + "\" value=\"10\"></td>"
               + "<td><input type=\"radio\" name=\"add" + tr_id + "\" value=\"5\"></td>"
               + "<td><input type=\"radio\" name=\"add" + tr_id + "\" value=\"3\"></td>"
               + "<td><input type=\"radio\" name=\"add" + tr_id + "\" value=\"2\"></td>"
               + "<td><input type=\"radio\" name=\"add" + tr_id + "\" value=\"1\"></td>"
               + "</tr>";
        $('.tr_add').before(tr);
        tr_id++;
        if($('.new_tr').length > 4){
            $('.tr_add').hide();
        }
    });
    $(document).on('click','.btn_minus', function() {
        $(this).closest('.new_tr').remove();
        if($('.new_tr').length < 5){
            $('.tr_add').show();
        }
    });

    //input text 숫자만 입력받기
    // $('.calculate td input[type="text"]').on('keyup change',function() {
    //     $(this).val( $(this).val().replace(/[^0-9]/g,"") );
    // });

    $(document).on("click", "input[type='radio']", function(){
        thisRadio = $(this);
        if (thisRadio.hasClass("imChecked")) {
            thisRadio.removeClass("imChecked");
            thisRadio.prop('checked', false);
        } else {
            thisRadio.prop('checked', true);
            thisRadio.addClass("imChecked");
        }
    });


}); // end ready
