$(document).ready(function () {
	/*��� ��ġ����*/
	$(window).scroll(function(){
		var tg = $(this);
		var leftPosition = tg.scrollLeft();
		var header = $("#header");
		header.css({
			"left" : - leftPosition
		});
	});
	
    // ������ȸ�� ����
    $('.tab_wrap').tabMenu();
    
    /*
    //��� �˻�â ���ͷ���
    $("#header .form_search .input_search").focus(function () {
        $("#header .form_search").animate({
            width: "915px"
        }, 600, function () {});
    });
    $("#header .form_search .input_search").on("change paste keyup", function () {
        if ($(this).val() == "") {
            $("#header .div_header_add_ajax").fadeOut();
            $(".form_search .form_search_clear").removeClass("active");
        } else {
            $("#header .div_header_add_ajax").fadeIn();
            $(".form_search .form_search_clear").addClass("active");
        }
    });
    
    $(".form_search .form_search_clear").click(function () {
        $("#header .form_search .input_search").val("");
        $(this).removeClass("active");
        $("#header .div_header_add_ajax").fadeOut();
    });
    
    $(".form_search_back").click(function () {
    	header_close();
    	$("#block_allmenu").hide();
    });

    $("#header .btn_search").click(function () {
    	$(this).removeClass("active");
    	$(".div_header_user_menu").fadeOut();
        $('#header h2').hide();
        $('#header .form_search').addClass('search_on');
        $('#header .form_search .input_search').show().focus();
        $("#header").addClass("moiusein");
        
        //div_header_add
        $("#header .div_header_add").show();
        $("#header .div_header_add .div_search_option").fadeIn();
        
        btn_menu off
        $("#header .btn_menu").removeClass("on");
        $("#header .gnb_bgwrap").fadeOut();
        
        //block_div on
        $("#block_allmenu").show();
    });*/

    
    $("#header .btn_menu").click(function() {
    	/*header_close();*/
    	$("#header .btn_user").removeClass("active");
    	$(".div_header_user_menu").fadeOut();
    	
    	if($(this).hasClass("on")) {
    		$("#block_allmenu").hide();
    		$(this).removeClass("on");
    		$("#header .gnb_bgwrap").fadeOut();
    		$("#header").removeClass("moiusein");
    	}else {
    		 //block_div on
            $("#block_allmenu").show();
    		$(this).addClass("on");
    		$("#header .gnb_bgwrap").fadeIn();
        	$("#header").addClass("moiusein");
    	};
    	
    	
    });
    
    $("#header .gnb_bgwrap .gnb_menu_close").click(function() {
    	$("#header .btn_menu").removeClass("on");
    	$("#header .gnb_bgwrap").fadeOut();
		$("#header").removeClass("moiusein");
    });
    
    $("#header .btn_user").click(function() {
    	/*header_close();*/
    	$("#header .btn_menu").removeClass("on");
    	$("#header .gnb_bgwrap").fadeOut();
		$("#header").removeClass("moiusein");
    	
    	if($(this).hasClass("active")){
    		$(this).removeClass("active");
        	$(".div_header_user_menu").fadeOut();
        	$("#header").removeClass("moiusein");
    	}else {
    		$(this).addClass("active");
        	$(".div_header_user_menu").fadeIn();
        	$("#header").addClass("moiusein");
    	}
    	
    	var header_promo_swiper = new Swiper('.header_promo', {
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			loop: true,
			allowTouchMove: false,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			}
		});
		
		$(".header_promo").on("mouseenter", function() {
			header_promo_swiper.autoplay.stop();
		});
		$(".header_promo").on("mouseleave", function() {
			header_promo_swiper.autoplay.start();		
		});
		
		$(document).on("click", ".personal_info_btn", function() {
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				$(".personal_info_modify").fadeOut();
			}else {
				$(this).addClass("active");
				$(".personal_info_modify").fadeIn();
			}
		});
		
		 //block_div on
        $("#block_allmenu").show();
    });
    
    $("#block_allmenu").click(function() {
    	/*header_close();*/
    	$("#header").removeClass("moiusein");
    	$("#header .btn_menu").removeClass("on");
    	$("#header .gnb_bgwrap").fadeOut();
    	$("#header .btn_user").removeClass("active");
    	$(".div_header_user_menu").fadeOut();
    	
    	$(this).hide();
    });
    
    $("#header .user_menu_close").click(function() {
		$("#header .btn_user").removeClass("active");
    	$(".div_header_user_menu").fadeOut();
    	$("#header").removeClass("moiusein");
    	$("#block_allmenu").hide();
	});
	
    /*��� ���۽� ���� ��ȯ*/
    /*$("#header").on("mouseenter focusin", function() {
    	$(this).addClass("moiusein");
    }).on("mouseleave focusout", function() {
    	$(this).removeClass("moiusein");
    });*/

    $("#from_calendar").datepicker({
        dateFormat: "yy/mm/dd",
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        showMonthAfterYear: true,
        onSelect: function(dateText) {
//        	console.log(dateText)
        	$("#to_calendar").datepicker("option", "minDate", dateText);
        	$("#to_calendar").datepicker("option", "disabled", false);
        }
        // inline: true
    });
    $("#to_calendar").datepicker({
        dateFormat: "yy/mm/dd",
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        showMonthAfterYear: true,
        disabled: true,
        // inline: true
    });

    $("#pop_calendar #cal_complete").click(function () {
        var fromDate = $("#from_calendar").datepicker("getDate");
        var toDate = $("#to_calendar").datepicker("getDate");
        $("#from2").val(fromDate.getFullYear() + "." + (fromDate.getMonth() + 1) + "." + fromDate.getDate());
        $("#to2").val(toDate.getFullYear() + "." + (toDate.getMonth() + 1) + "." + toDate.getDate());
        // �˾��ݱ�
        pop_close($('#pop_calendar'));
    });
    // ������ǥ üũ�ڽ� ��� üũ�ϱ�
    $('#table_chk_all').checkAll('table_chk');

    // ������ǥ üũ�ڽ� üũ�� ���� �� ��ư ���̱�
    $(document).on("click", "#table_chk_all, .table_chk", function () {
        $("#basic_vTable.myvTable > p").addClass("check");
        $("#basic_vTable.myvTable .button_wrap").show();
        /*$("#basic_vTable.myvTable .table_chk i img").hide();*/
        if ($("#table_chk_all:checked").length == 0 && $(".table_chk:checked").length == 0) {
            $("#basic_vTable.myvTable > p").removeClass("check");
            $("#basic_vTable.myvTable .button_wrap").hide();
            /*$("#basic_vTable.myvTable .table_chk i img").show();*/
        }
    });


    //��ü������ȸ ���� ǥ�κ��� ����Ʈ Ŭ���� �߰����� ����
    $("#basic_vTable.totalvTable").on("click", ".listwrap ul.body li",function () {
    	
    	var $item = $(this).closest(".body_detail_wrap");
    	var $target = $item.find(".body_detail");
        	
	        if($item.hasClass("active")) {
	        	$item.removeClass("active");
	        	$target.stop().hide();
	        } else {
	        	$item.addClass("active");
	        	$target.stop().show();
	        }
	        
	        $item.siblings().removeClass("active");
	        $item.siblings().find(".body_detail").stop().hide();
        
    });
    
  //���IR �ڷ�� ����Ʈ Ŭ���� �߰����� ���� - ����
  /*  $("#basic_vTable.comirTable .listwrap ul.body li").click(function () {
    	var $item = $(this).closest(".body_detail_wrap");
    	var $target = $item.find(".body_detail");
        if ($(this).closest("ul").find("li").index(this) != 6) {
        	
	        if($item.hasClass("active")) {
	        	$item.removeClass("active");
	        	$target.stop().hide();
	        } else {
	        	$item.addClass("active");
	        	$target.stop().show();
	        }
	        
	        $item.siblings().removeClass("active");
	        $item.siblings().find(".body_detail").stop().hide();
        }
    });*/

    // jquery-ui select �޴� ������ ����
    $("select").selectmenu();

    // ���� - ������ǥ �ڽ�
    $(document).on("click",".voting_excute_div .voting_execute", function (e) {
    	if($(this).closest(".voting_excute_div").hasClass("endVoting")){
    		if($(this).closest(".voting_execute_box").hasClass("vote_concen")) {
    			$(".caseby_detailview").fadeOut();
    			$(".voting_execute_box").removeClass("detailview_on");
    			$(this).siblings(".caseby_detailview").fadeIn();
    			$(this).closest(".voting_execute_box").addClass("detailview_on");
    			$(".caseby_detailview").find("a").click(function() {
    				$(this).closest(".caseby_detailview").fadeOut();
    				$(this).closest(".voting_execute_box").removeClass("detailview_on");
    			});
    		}
    	} else {
	    	if(!$(this).closest('.voting_execute_box').hasClass("active")) {
	    		voting_execute_box_close();
	            var execute_box_top = $(this).closest('.voting_execute_box').offset().top;
	            $(".voting_execute_box").each(function () {
	                if ($(this).offset().top == execute_box_top) {
	                    $(this).addClass("execute_box_sameline");
	                }
	            });	
	            /*if($(this).closest(".pop-layer").length) {
	            	$(this).closest('.execute_box_sameline').addClass('active').css('width', '70%').attr('title', '���õ�').siblings('.execute_box_sameline').css('width', '29.5%');
	            } else {*/
	            	$(this).closest('.execute_box_sameline').addClass('active').css('width', '49.5%').attr('title', '���õ�').siblings('.execute_box_sameline').css('width', '24.5%');
	            /*}*/
	            
	            
	            
	    	}
    	}
    });
    
    $(document).on("click",'.voting_execute_box .voteDiv.case1 .btn_voting_execute, .voting_execute_box .voteDiv_close',function() {
        voting_execute_box_close();
    });


    // �α���, �̿������� label, text ����
    $(".logintext_change select").on("selectmenuchange", function( event, ui ) {
        var $change_label = $(this).prev("label");
        var $change_input = $(this).nextAll("input");
        var $change_validation = $(this).nextAll(".validation").find("span");
        if (ui.item.label == "����") {
            $change_label.html("�ֹι�ȣ/����ڵ�Ϲ�ȣ/�ܱ��ε�Ϲ�ȣ/���ڵ������ȣ<strong>(�ʼ�)</strong>");
            $change_input.attr("placeholder", "�ֹι�ȣ, ����ڵ�Ϲ�ȣ, �ܱ��ε�Ϲ�ȣ, ���ڵ������ȣ�� �Է����ּ���.");
            $change_validation.text("�ֹι�ȣ, ����ڵ�Ϲ�ȣ, �ܱ��ε�Ϲ�ȣ, ���ڵ�Ϲ�ȣ�� �ٽ� Ȯ���� �ּ���.");
            $('#label1').html('��������');
        	$('#label2').html("���� <strong>(�ʼ�)</strong>");
        	$('#sh_name').attr("placeholder", "������ �Է��� �ּ���.");
        	$('#label3').html("������ �Է��� �ּ���.");         
        	$('#manager, #manager2, #manager3').attr('hidden',true);
        } else if (ui.item.label == "�ڻ����") {
        	$change_label.html("����ڵ�Ϲ�ȣ/���ڵ������ȣ <strong>(�ʼ�)</strong>");
            $change_input.attr("placeholder", "����ڵ�Ϲ�ȣ�� �Է� ���ּ���.");
            $change_validation.text("����ڵ�Ϲ�ȣ, ���ڵ������ȣ�� �ٽ� Ȯ���� �ּ���.");
            $('#label1').html('ȸ�� ����');
        	$('#label2').html("ȸ��� <strong>(�ʼ�)</strong>");
        	$('#sh_name').attr("placeholder", 'ȸ����� �Է��� �ּ���.');
        	$('#label3').html("����ڵ�Ϲ�ȣ, ���ڵ������ȣ�� �ٽ� Ȯ���� �ּ���.");
        	$('#manager, #manager2, #manager3').attr('hidden',false);
        } else if (ui.item.label == "����") {
        	$change_label.html("����ڵ�Ϲ�ȣ <strong>(�ʼ�)</strong>");
            $change_input.attr("placeholder", "����ڵ�Ϲ�ȣ�� �Է��� �ּ���.");
            $change_validation.text("����ڵ�Ϲ�ȣ�� �ٽ� Ȯ���� �ּ���.");
            $('#label1').html('ȸ�� ����');
        	$('#label2').html("ȸ��� <strong>(�ʼ�)</strong>");
        	$('#sh_name').attr("placeholder", 'ȸ����� �Է��� �ּ���.');
        	$('#label3').html("����ڵ�Ϲ�ȣ�� �ٽ� Ȯ���� �ּ���.");
        	$('#manager, #manager2, #manager3').attr('hidden',false);
        }
    });

    // �̿��� ���� terms_area ���ȴ� ������
    $(".basicmenu_body .checkbox .terms_area_work").click(function() {
        if($(this).hasClass("active")){
            $(this).closest(".checkbox").next(".terms_area").hide();
            $(this).removeClass("active");
        } else {
            $(this).closest(".checkbox").next(".terms_area").show();
            $(this).addClass("active");
        }
    });

    // ȸ������ �������� ���� open close
    $(".basicmenu_body .service_termination .terms_area_work").click(function() {
        if($(this).hasClass("active")){
            $(this).next(".form_group").hide();
            $(this).removeClass("active");
        } else {
            $(this).next(".form_group").show();
            $(this).addClass("active");
        }
    });
    
    $(".basicmenu_body .service_termination .service_out").click(function() {
        if($(this).siblings('button').hasClass("active")){
            $(this).siblings('button').next(".form_group").hide();
            $(this).siblings('button').removeClass("active");
        } else {
            $(this).siblings('button').next(".form_group").show();
            $(this).siblings('button').addClass("active");
        }
    });

    // �̿��� ���� - �˸����� üũ �ϸ� ������������
   /* $(document).on("click", ".privacy_area_check input", function() {
        if($(this).is(":checked") == true){
            $(".privacy_area").slideDown();
        } else {
            $(".privacy_area").hide();
        }
    });*/
    
   
});

/*��� �ݴ� ��ũ��Ʈ*/
/*var header_close = function() {
    $('#header h2').fadeIn('600');
    $('#header .form_search').removeClass('search_on').removeAttr('style');
    $('#header .form_search .input_search').removeAttr('style');
    $("#header .div_header_add").hide();
    $("#header .div_header_add .div_search_option").hide();
    $("#header .form_search .input_search").val("");
    $("#header .div_header_add_ajax").hide();

    $("#header .form_search .input_search").val("");
    $(".form_search .form_search_clear").removeClass("active");
    $("#header .div_header_add_ajax").fadeOut();
    
    $("#header").removeClass("moiusein");
};*/


/*�������˾� ��ũ��Ʈ*/
function popupOpen(popUrl) {
	var popOption = "width=813, height=800, resizable=no, status=no, scrollbars=1";
	window.open(popUrl,"",popOption);
}

// ���� - ������ǥ �ڽ� �ݱ�
var voting_execute_box_close = function () {
    $('.voting_execute_box').removeClass('active').removeClass('execute_box_sameline');
    $('.voting_execute_box').removeAttr('title').removeAttr('style');
};

// =========== jquery �� ==============
(function ($) {
    $.fn.tabMenu = function () {
        this.each(function () {
            var $tab_menu = $(this).find('ul.tab_menu>li');
            var $tab_content = $(this).find('.tab_content_wrap');

            $tab_menu.on('click', function (e) {
                e.preventDefault();
                var _idx = $tab_menu.index(this);

                // tab_menu
                $(this).addClass('current').siblings().removeClass('current');

                //tab_content
                $tab_content.find('.tab_content').eq(_idx).addClass('current').siblings().removeClass('current');

            });
        });
    };
})(jQuery);

// =========== ���̾� �˾� ==============
var zidx = 10009;
var pzidx = 10010;
var focusThis;

function layer_popup(el) {
    $('body').addClass("ov-hidden");
    var $el = $(el); //���̾��� id�� $el ������ ����
    
    
//    if($('.dimBg_layerpop').length == 0) {
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
    	        'z-index': 10009,
    	    });
    	    
    	    
    	    $('.dimBg_layerpop').fadeIn();
//    }
    
   
    zidx = Number(zidx) + 10;
    pzidx = Number(pzidx) + 10;
    $($el).next('.dimBg_layerpop').css("z-index", zidx);
    $($el).css('z-index', pzidx);

    $el.fadeIn().attr("tabindex",0).focus();
    
    var $elWidth = $el.outerWidth(),
        $elHeight = $el.outerHeight(),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    // ȭ���� �߾ӿ� ���̾ ����.
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

    // ���ȭ�� Ŭ���� ���̾��˾� ����
    /*$('.dimBg_layerpop').click(function () {
        pop_close($el);
    });*/
}

// =========== ���̾� �˾� close ==============
/*
    pop_close($('#pop_calendar'));
    $pop_calnedar ��� �˾� �ݱ�
*/
function pop_close($el) {
    $el.siblings('.dimBg_layerpop').hide().remove();
    $el.hide();
    if ($('.dimBg_layerpop').length < 1) {
        $('body').removeClass('ov-hidden');
    }

}

// =========== üũ�ڽ� ��� üũ ==============
/*
    #checkAll,#checkAll2 : ��ü üũ�ϴ� üũ�ڽ� ID
    chekcs,checks2 : �ؿ� üũ�ڽ��� Class
    $('#checkAll').checkAll('checks');
    $('#checkAll2').checkAll('checks2');
*/
$.fn.checkAll = function (checks) {
    var $checkAll = this;
    var $checks = $('.' + checks);

    // ��� ���� üũ�ڽ� Ŭ����
    this.click(function () {
        $checks.prop('checked', this.checked);
    });

    // �Ϻ� üũ�ڽ� Ŭ����
    $checks.click(function () {
        if ($checks.length == $('.' + checks + ':checked').length) {
            $checkAll.prop('checked', true);
        } else {
            $checkAll.prop('checked', false);
        }
    });
};