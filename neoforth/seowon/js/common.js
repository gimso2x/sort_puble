$(function(){
    $('nav ul a').on('hover',function(){
        $(this).next('.sub_menu').show();
    })

    // menu open
            //모바일gnb메뉴
            $('.menu_a').click(function() {
                $('.dim-layer').css('display', 'block');
                $('.pop_menu').animate({
                    opacity: '1',
                    right: '0'
                }, 200, "linear");
                // if (winSize < 768){
                //     $('body').css({overflow:'hidden'});
                // }

            })
            $('.dimBg, .close').click(function() {
                $('.dim-layer').css('display', 'none');
                $('.pop_menu').css({
                    opacity: '0',
                    right: '-320px'
                });
                // if (winSize < 768){
                //     $('body').css({overflow:'visible'});
                // }
            })
})
