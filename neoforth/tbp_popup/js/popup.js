    $(document).ready(function() {
        //창 close 버튼
        $('.close, #button_close').click(function() {
            window.close();
        });


        //초기화 버튼
        $('.use_clear').click(function() {
            // $('.popup-form').each(function(){
            //   this.reset();
            // })
            $('.table tbody input').val("");
        });

        //숫자만 입력받기
        $(document).on("keyup", "input:text[numberonly]", function() {
                $(this).number(true);
        });

        //layer 불러오는 버튼
        $('.btn-layer').click(function() {
            var $href = $(this).attr('href');
            $(this).addClass('on');
            layer_popup($href);

            //layer scroll 여부에 따라 width 조정
            var layer_href = $href + " .layer-conts tbody tr";
            var layer_href_td = layer_href + " td:nth-child(2)";
            if($(layer_href).length <= 5){
                $(layer_href_td).addClass('layer_tw');
            }
        });

        function layer_popup(el) {

            var $el = $(el); //레이어의 id를 $el 변수에 저장

            $('.dim-layer').fadeIn();
            $el.fadeIn();

            var docWidth = $(document).width(),
                docHeight = $(document).height(),
                btn_left = $('.btn-layer.on').offset().left,
                btn_top = $('.btn-layer.on').offset().top;

            if (btn_top < docHeight / 2) {
                $el.css({
                    top: btn_top - 47,
                    left: btn_left - 277
                });
            } else {
                $el.css({
                    top: btn_top - 250,
                    left: btn_left - 277
                });
            }
            $el.find('a.btn-layerClose').click(function() {
                $('.btn-layer.on').removeClass('on');
                $('.dim-layer').fadeOut();
                $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
                return false;
            });

            // $('.dimBg').click(function() {
            //     $('.btn-layer.on').removeClass('on');
            //     $('.dim-layer').fadeOut();
            //     $el.fadeOut();
            //     return false;
            // });
        }


    });
