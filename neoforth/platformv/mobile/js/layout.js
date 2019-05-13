
$(document).ready(function () {
	// ====== lnb menu open ====== 
	$('.header_btn_menu').lnbMenu();
	// ====== lnb menu open ====== 
	
	// ====== lnb menu accordion ====== 
	$(document).on('click', '.menu_accodion a', function(){		
        var li = $(this).parent();
        $('.menu_accodion li .depth2').slideUp();
        if(!li.children('.depth2').is(":visible")){
            li.children('.depth2').slideDown();
        }
        
        var top_li = $(this).closest(".depth1_li");
        $(".depth1_li").removeClass("active");
		if(!top_li.hasClass("active")) {
			top_li.addClass("active");
		}
    });
	
	$('.menu_accodion .depth1_li').each(function() {
		if ($(this).find(".depth2").length === 0) {
			$(this).find(".areamove").remove();
		};
	});
	// ======  lnb menu accordion ====== 
	
	/* ====== 검색부분 캘린더 ======*/
	$("#to_calendar").datepicker({
		
        dateFormat: "yy/mm/dd",
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        showMonthAfterYear: true,
        onSelect: function(dateText) {
        	console.log(dateText);
        	$("#from_calendar").datepicker("option", "minDate", dateText);
        	$("#from_calendar").datepicker("option", "disabled", false);
        }
        // inline: true
    });
	
	$("#from_calendar").datepicker({
        dateFormat: "yy/mm/dd",
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        showMonthAfterYear: true,
        disabled: true,
        // inline: true
    });
	
	$("#pop_calendar #cal_complete").click(function () {
        var toDate = $("#to_calendar").datepicker("getDate");
        $(".fromCal").text(toDate.getFullYear() + "." + (toDate.getMonth() + 1) + "." + toDate.getDate()).css("color", "#2f313a");
        // 팝업닫기
        pop_close($('#pop_calendar'));
    });
	
	$("#pop_calendar2 #cal_complete").click(function () {
        var fromDate = $("#from_calendar").datepicker("getDate");
        $(".toCal").text(fromDate.getFullYear() + "." + (fromDate.getMonth() + 1) + "." + fromDate.getDate()).css("color", "#2f313a");
        // 팝업닫기
        pop_close($('#pop_calendar2'));
    });
	/*// ====== 검색부분 캘린더 ======*/
	
});

//lnb menu open
(function ($) {
    $.fn.lnbMenu = function (opt) {
        var _href;
        var fadeSpeed = 400;

        if (opt === "close") {
            pop_close2();
        }

        this.click(function () {
            _href = $('#menu_wrap');
            layer_popup2(_href);
            $(".personal_v").hide();
        });

        function layer_popup2(el) {
            var _el = $(el); //레이어의 id를 _el 변수에 저장
            _el.show().animate({ right: '0' }, fadeSpeed);

            $('html,body').addClass("ov-hidden");

            _el.find('.menu_btn_back').click(function () { pop_close2(); });
        }

        function pop_close2() {
            $(_href).animate({ right: '-100%' }, fadeSpeed);
            setTimeout(function () { $(_href).hide(); }, fadeSpeed);

            $('html,body').removeClass("ov-hidden");
            return false;
        }
    };
})(jQuery);

//=========== 레이어 팝업 ==============
var zidx = 10009;
var pzidx = 10010;
var focusThis;

function layer_popup(el) {
    $('body').addClass("ov-hidden");
    var $el = $(el); //레이어의 id를 $el 변수에 저장
    
    
    /*if($('.dimBg_layerpop').length == 0) {*/
    	$($el).closest('.layer_wrap').append('<div class="dimBg_layerpop"></div>');
    	 var dimLayer = $('.dimBg_layerpop');
    	    dimLayer.css({
    	        'display': 'none',
    	        'position': 'fixed',
    	        'left': 0,
    	        'right': 0,
    	        'top': 0,
    	        'bottom': 0,
    	        'background': 'rgba(0,0,0,0.5)',
    	        /*'z-index': 10009,*/
    	    });
    	    
    	    
    	    $('.dimBg_layerpop').fadeIn();
    /*}*/
    
   
    zidx = Number(zidx) + 10;
    pzidx = Number(pzidx) + 10;
    $($el).next('.dimBg_layerpop').css("z-index", zidx);
    $($el).css('z-index', pzidx);

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

    $el.find('.btn_close').click(function (e) {
        e.preventDefault();
        pop_close($el);
    });

    // 배경화면 클릭시 레이어팝업 삭제
    /*$('.dimBg_layerpop').click(function () {
        pop_close($el);
    });*/
}

// =========== 레이어 팝업 close ==============
/*
    pop_close($('#pop_calendar'));
    $pop_calnedar 라는 팝업 닫기
*/
function pop_close($el) {
    $el.next('.dimBg_layerpop').hide().remove();
    $el.hide();
    if ($('.dimBg_layerpop').length < 1) {
        $('body').removeClass('ov-hidden');
    }

}

var orSign = 0;
$(window).bind('orientationchange',function(e){
	orSign = window.orientation;
	/*orSign = screen.orientation.angle;*/
	
	var body = $("body");
	var width = body.width();
	var height = body.height();
	//setTimeout()
	if(orSign == 90 || -90 == orSign){
		orientstyle(width,height);
	}else{
		$(".no_modal").remove();
		$("body").unbind("touchmove");
	}
});
$(window).resize(function(){
	var body = $("body");
	var width = body.width();
	var height = body.height();
	
	if(orSign == 90 || -90 == orSign){
		orientstyle(width,height);
	}else{
		$(".no_modal").remove();
		$("body").unbind("touchmove");
	}
	//alert(width+"//"+height)
});
function orientstyle(width,height){
	$("body").append("<div class='no_modal'><div><img src='/resources/mobile/img/img_orientation.png' alt='가로모드는 지원되지 않습니다.'></div></div>");
	$("body").bind("touchmove", function(e){e.preventDefault();});

	var orientation = $(".no_modal  div");
	orientation.css("left", ((width / 2) - (orientation.innerWidth() / 2)));
	//alert(width+"//"+height)
}