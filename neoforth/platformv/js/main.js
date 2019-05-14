$(document).ready(function () {
	
	var withV = "";
	//console.log("MAIN DATA CALL");
//	$.ajax({
//		url		: "/maindata/vcnt.js",
//		data	: "",
//		contentType:"application/json; charset=utf-8",
//		type	: "GET",
//		dataType: "json",
//		success: function(data){
//			withV = data.withVCnt;
//			$("#withV").html(withV);

			// section1 ���� �����̴�
			var section1_text_swiper = new Swiper('.section1_text_swiper', {
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
		    	autoplay: {
		    		delay: 6000,
		    		disableOnInteraction: false,
		    	},
		    	allowTouchMove: false,
		    	loop: true,
		    	pagination: {
		    		el: '.swiper-pagination',
		        	clickable: true,
		    	},
		    	
		    });
			
			section1_text_swiper.on("slideChange", function() {
				$("#section1 .section_bg").removeClass("slide2").removeClass("slide3");
				/*$("#withV").html(withV);*/
				if(section1_text_swiper.realIndex == 1) {
					$("#section1 .section_bg").addClass("slide2");
				} else if (section1_text_swiper.realIndex == 2) {
					$("#section1 .section_bg").addClass("slide3");
				} 
			});
			
			$(".section1_text_swiper .swiper-pagination").append("<span class='text_swiper_gostop'>�����̴� �����÷��� ���/�Ͻ�����</span>");
			$(document).on("click", ".section1_text_swiper .text_swiper_gostop", function() {
				
				if($(this).hasClass("go")) {
					$(this).removeClass("go");
					section1_text_swiper.autoplay.start();
				} else {
					$(this).addClass("go");
					section1_text_swiper.autoplay.stop();
				}
			});
//		},
//		error	: function(data, status, err){
//		}
//	});
	
	/*sectionR_btnarea top, sectionR_btnarea bottom*/
	// ������ ��
	if($("#header").hasClass("bg_shareholder") === true) {
		// �ʱ�ȭ
		$(".sectionR_bg").removeClass("step2");
		$(".sectionR_bg").removeClass("step3");
		
		/*console.log("����");*/
		$(".sectionR_bg").addClass("step2");
		$(".sectionR_btnarea.top").show();
		$(".sectionR_btnarea.bottom").hide();

		$(".shareholder_animation").show();
		
		$(".section3juju_li").css("display","block");
		$(".section3company_li").css("display","none");
	}
	
	// ȸ���� ��
	if($("#header").hasClass("bg_company") === true) {
		// �ʱ�ȭ
		$(".sectionR_bg").removeClass("step2");
		$(".sectionR_bg").removeClass("step3");
		
		/*console.log("ȸ��");*/
		$(".sectionR_bg").addClass("step3");
		$(".sectionR_btnarea.top").hide();
		$(".sectionR_btnarea.bottom").show();
		var docWidth = $(window).width();
		var docHeight = $(window).height();

		var ratio = docWidth / docHeight;
		var rightPer;
		if(ratio > 2) {
			rightPer = "19%";
		} else if (ratio> 1.5) {
			rightPer = "15%";
		} else if (ratio > 1 ) {
			rightPer = "5%";
		} else {
			rightPer = "0";
		}
		/*console.log(ratio);
		console.log(rightPer);*/
		$(".company_animation").css({'right':rightPer,'opacity':1});
		
		
	}
	

	
	
	
	var ab = $('.btn_menu').offset().left + 19;
	$("#fp-nav").css("left",ab+ "px");
	$(window).resize(function() {
		var abc = $('.btn_menu').offset().left + 19;
		$("#fp-nav").css("left",abc+ "px");
	});
	
	var abc = $(window).width() - $('.btn_menu').offset().left + 10;
	$(".shareholder_animation").css("right",abc+ "px");
	$(window).resize(function() {
		var abc = $(window).width() - $('.btn_menu').offset().left + 10;
		$(".shareholder_animation").css("right",abc+ "px");
	});
	
	
	
	/* section4_div_swiper */
	var section4_div_swiper = new Swiper('.section4_div_swiper', {
    	navigation: {
    		nextEl: '.swiper-button-next',
    		prevEl: '.swiper-button-prev',
    	},
    	loop: true,
    	autoplay: {
    		delay: 6000,
    		disableOnInteraction: false,
    	},
    	pagination: {
    		el: '.swiper-pagination',
        	clickable: true,
    	},
    });
	
	$(".section4_div_swiper .swiper-pagination").append("<span class='text_swiper_gostop'>�����̴� �����÷��� ���/�Ͻ�����</span>");
	$(document).on("click", ".section4_div_swiper .text_swiper_gostop", function() {
		
		if($(this).hasClass("go")) {
			$(this).removeClass("go");
			section4_div_swiper.autoplay.start();
		} else {
			$(this).addClass("go");
			section4_div_swiper.autoplay.stop();
		}
	});
	
});
