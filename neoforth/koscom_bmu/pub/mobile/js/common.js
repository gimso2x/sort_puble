$(function(){
	// header
	var hd = $('#header');
	var sec_home = $('.section.home');
	var scrollTop = $(window).scrollTop();
	var btn_close_notice = $('.popup_notice .btn_close');

	btn_close_notice.click(function(){
		$('.popup_notice').slideUp(200);
		$('#wrap').removeClass('popup_on'); 
	});

	if ($(window).scrollTop() > 0) {
		hd.addClass('fixed');
	}

	$(window).scroll(function(){
		scrollTop = $(window).scrollTop();
		var tg = $(this);
		var scroll_left = tg.scrollLeft();
		hd.css('left', - scroll_left);

		if (tg.scrollTop() > 0) {
			hd.addClass('fixed');
			// sec_home.addClass('fixed');
		}else{
			hd.removeClass('fixed');
			// sec_home.removeClass('fixed');
		}
	});

	// top button
	var speed = 500;
    $(".btn_top").css("cursor", "pointer").click(function()
    { 
        $('body, html').animate({scrollTop:0}, speed); 
        $('.wrap_popup').animate({scrollTop:0}, speed); 
    });
 
	// GNB
	$('.btn_gnb').click(function() {
		$("#header").toggleClass('menu_opend')
	});

	//GNB Click
	$('.wrap_gnb2 li:nth-child(1) a').click(function() {
		$('body, html').animate({scrollTop:0}, 500);
		$("#header").removeClass('menu_opend');
	});
	$('.wrap_gnb2 li:nth-child(2) a').click(function() {
		$('body, html').animate({scrollTop:$('.main .section.company').offset().top - 44}, 500);
		$("#header").removeClass('menu_opend');
	});
	$('.wrap_gnb2 li:nth-child(3) a').click(function() {
		$('body, html').animate({scrollTop:$('.main .section.investor').offset().top - 44}, 500);
		$("#header").removeClass('menu_opend');
	});

	//android, apple 분기처리
	var varUA = navigator.userAgent.toLowerCase();
	// console.log(varUA);

	if(varUA.match('android') != null) {
		$('.wrap_gnb2 ul li a.logo_app').removeClass('apple');
		$('.section.home .btn_download span').removeClass('apple');
	} else if(varUA.match('iphone') != null || varUA.match('ipad') != null) {
		$('.wrap_gnb2 ul li a.logo_app').addClass('apple');
		$('.section.home .btn_download span').addClass('apple');
	}




    // var wrap = $('#wrap'); 
    // var wrap_gnb = $('.wrap_gnb');
	// var gnb = wrap_gnb.find('.nav_gnb');
	// var lst_gnb = gnb.find('>li>a');
	// var sub = gnb.find('.lst_sub');

	// var btn_gnb = $('.btn_gnb');
	// var btn_close_gnb = wrap_gnb.find('.btn_close');

	// var state_gnb = false;

	// wrap_gnb.find('.inner').mouseover(function(){
	// 	state_gnb = true;  
	// });
	// wrap_gnb.find('.inner').mouseleave(function(){
	// 	state_gnb = false; 
	// });

	// function gnb_hide(){
	// 	wrap_gnb.find('.inner').stop().animate({'left': -240}, 200,function(){
	// 		wrap_gnb.stop().fadeOut(200);
	// 	});
	// 	btn_gnb.removeClass('on'); 
	// 	$('body').css('overflow', 'visible'); 
	// } 
 
	// function gnb_show(){ 
	// 	$('body').css('overflow', 'hidden');
	// 	wrap_gnb.stop().fadeIn(200).find('.inner').stop().animate({'left': 0}, 200);
	// 	btn_gnb.addClass('on');    
	// }

	// btn_close_gnb.click(function(){
	// 	gnb_hide();
	// }); 

	// wrap_gnb.click(function(){
	// 	if (state_gnb == false) {
	// 		gnb_hide();
	// 	} 
	// }); 

	// btn_gnb.click(function(){
	// 	var tg = $(this);  
	// 	if (tg.hasClass('on')) {
	// 		gnb_hide();
	// 	}else{  
	// 		gnb_show(); 
	// 	}
	// });

	// lst_gnb.each(function(i){
	// 	var tg = $(this);
	// 	tg.click(function(e){
	// 		e.preventDefault();
			
	// 		if (tg.hasClass('on')) {
	// 			tg.removeClass('on');
	// 			tg.next().stop().slideUp(200);
	// 		}else{
	// 			lst_gnb.removeClass('on');
	// 			sub.stop().slideUp(200); 

	// 			tg.addClass('on');
	// 			tg.next().stop().slideDown(200);
	// 		} 
	// 	}); 
	// });

/*=============================================
	Datepicker
	=============================================*/

	if ($('.datepicker').length > 0) { 
		$('.datepicker').datepicker({
			dateFormat: 'yy.mm.dd',
			prevText: '〈',
			nextText: '〉',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			showMonthAfterYear: true,
			showOtherMonths: true,
			yearSuffix: '년',
		});
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
		$('.wrap_file').each(function() {
			if($(this).find('.upload_name').val() !== '') { 
				$(this).append('<button type="button" class="btn_fileuploade_close"></button>');
			}
		});
	};

	$(document).on('click', '.btn_fileuploade_close', function() {
		$(this).siblings('input[type="file"]').val('');
		$(this).siblings('input.upload_name').val('');
		$(this).remove();
	});

	/*=============================================
	table accordion
	=============================================*/
	$('.lst_accodian').on('click','>dt',function(){
		var tg = $(this); 
		if (tg.hasClass('on')) {
			tg.parent().find('>dt').removeClass('on');
			tg.next().stop().slideUp(200, function(){
				tg.next().removeClass('on');
			});
		}else{
			tg.parent().find('>dt').removeClass('on');
			tg.parent().find('>dt').next().stop().slideUp(200, function(){
				tg.next().removeClass('on');
			});

			tg.addClass('on');
			tg.next().stop().slideDown(200, function(){
				tg.next().addClass('on');
			});
		}
	});

	/*=============================================
	tooltip
	=============================================*/
	var tooltip_btn = $('.tooltip_area .btn_stockorder_tooltip');
	var tooltip_close_btn = $('.tooltip_close button');
	tooltip_btn.click(function() {
		var $this_tooltip_btn = $(this);
		var tooltip_wrap = $(this).closest('.tooltip_area');
		var tooltip_area = tooltip_wrap.find('dl');

		if(tooltip_wrap.hasClass('active')){
			tooltip_wrap.removeClass('active');
			$this_tooltip_btn.removeClass('on');
			tooltip_area.fadeOut();
		} else {
			tooltip_wrap.addClass('active');
			$this_tooltip_btn.addClass('on');
			tooltip_area.fadeIn();
		}
		
	});

	tooltip_close_btn.click(function() {
		var tooltip_wrap = $(this).closest('.tooltip_area');
		tooltip_wrap.removeClass('active');
		tooltip_wrap.find('.btn_stockorder_tooltip').removeClass('on');
		tooltip_wrap.find('dl').fadeOut();
	});
});

/*=============================================
		레이어팝업(neoModal)

* Basic Open
	- $('#basic_modal').neoModal();
* Basic Close
	- $('#basic_modal').neoModal('close');
* Add Option with open
	- $('#layer2').neoModal({
		dimLayer: false,
		scrollLock: false,
		dimClickClose: false,
	});
* Add Callback
	- $('#layer3').neoModal({
		callBackArray : [
			{
				className: 'popSubmitClose',
				funcName: function() {
					testAlert();
				}
			},
			{
				className: 'popSubmitClose1',
				funcName: function() {
					$('#layer3').neoModal('close');
					$('#layer4').neoModal();
				}
			}
		],
	});

	function testAlert() {
		alert('testAlert');
	}
* Add Message
	$('#layer4').neoModal({
		message: '<div><span>23123</span>tests',
	});
=============================================*/
(function ($) {
	var options = {};
	var visiblePopupsArray = [];
	var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

	var methods = {
		_init: function(el) {
			this.show(el);
		},
		show: function(el) {
			var $el = $(el);
			var childWrap = $el.children('.pop_wrap');

			 // Remember which element had focus before opening a popup
			$el.data('focusedelementbeforepopup', document.activeElement);

			if(options.scrollLock) {
				$('body').css('overflow','hidden'); 
			}

			if(options.dimLayer) {
				$el.css('background', options.dimBackColor);
			}

			// new pop, z-index ++
			if(visiblePopupsArray.length) {
				var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
				var el5 = document.getElementById(elementId);
				$el.css('z-index', parseInt($(el5).css('z-index')) + 2);
			} else {
				$el.css('z-index', options.minZindex);
			}

			if(options.message !== null) {
				childWrap.find('.messageWrap').html(options.message);
			}
			
			visiblePopupsArray.push(el.id);
			$el.attr('tabindex', -1);
			// layer fadeIn
			$el.fadeIn(options.speed).focus();

			// position center
			childWrap.css("position","absolute");
			childWrap.css("top", "50%");
			childWrap.css("left", "50%");
			if (childWrap.outerHeight() < $(window).height() || childWrap.outerWidth() < $(window).width()) {
				childWrap.css({ marginTop: -childWrap.outerHeight() / 2, marginLeft: -childWrap.outerWidth() / 2 });
			}else {
				childWrap.css({ top: 0, left: 0 });
			}

			if((childWrap.outerHeight() < $(window).height()) === false) {
				childWrap.css({ top: 0, marginTop: 140, marginBottom: 140 });
			}

			var openCallback = options.open;
			if ($.isFunction(openCallback)) {
				openCallback.call(this);
			}

		},
		close: function(el) {
			var $el = $(el);
			var popupIdIndex = $.inArray(el.id, visiblePopupsArray);

			// If popup is not opened, ignore the rest of the function
			if (popupIdIndex === -1) {
				return;
			}
			if(!popupIdIndex) {
				$('html,body').css('overflow','');
			}
			visiblePopupsArray.splice(popupIdIndex, 1);
			// layer fadeOut
			$el.fadeOut(options.speed);

			// Focus back on saved element
			setTimeout(function() {
				if ($($el.data('focusedelementbeforepopup')).is(':visible')) {
					$el.data('focusedelementbeforepopup').focus();
				}
			}, 0);

			var closeCallback = options.close;
			if ($.isFunction(closeCallback)) {
				closeCallback.call(this);
			}
		}
	};

	// Hide pop click button
	$(document).on('click' ,function(e) {
		if(visiblePopupsArray.length) {
			var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
			var el = document.getElementById(elementId);
			var $eTarget = $(e.target);

			if($eTarget.hasClass(options.closeButton)){
				methods.close(el);
			}

			if(options.dimClickClose) {
				if($eTarget.hasClass('pop_dim_wrap')){
					methods.close(el);
				}
			}
			
			if(options.callBackArray !== null) {
				options.callBackArray.forEach(function(e) {
					if($eTarget.hasClass(e.className)){
						var callback = e.funcName;
						if ($.isFunction(callback)) {
							callback.call(this);
						}
					}
				});
			}
		}
	});

	// Keep keyboard focus inside of popup
	$(document).on('keydown', function(event) {
		if(visiblePopupsArray.length && event.which == 9) {
			var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
			var el = document.getElementById(elementId);

			// Get list of all children elements in given object
			var popupItems = $(el).find('*');
			// Get list of focusable items
			var focusableItems = popupItems.filter(focusableElementsString).filter(':visible');
			// Get currently focused item
			var focusedItem = $(':focus');
			// Get the number of focusable items
			var numberOfFocusableItems = focusableItems.length;
			// Get the index of the currently focused item
			var focusedItemIndex = focusableItems.index(focusedItem);

			 // If popup doesn't contain focusable elements, focus popup itself
			if (numberOfFocusableItems === 0) {
				$(el).focus();
				event.preventDefault();
			} else {
				if (event.shiftKey) {
					// Back tab
					// If focused on first item and user preses back-tab, go to the last focusable item
					if (focusedItemIndex === 0) {
						focusableItems.get(numberOfFocusableItems - 1).focus();
						event.preventDefault();
					}
				} else {
					// Forward tab
					// If focused on the last item and user preses tab, go to the first focusable item
					if (focusedItemIndex == numberOfFocusableItems - 1) {
						focusableItems.get(0).focus();
						event.preventDefault();
					}
				}
			}

		}
	});

	$.fn.neoModal = function (customOptions) {
		return this.each(function() {
			var newDefaults = $.extend(true, {}, $.fn.neoModal.defaults);

			if (typeof customOptions === 'object') { // e.g. $('#popup').popup({'color':'blue'})
				var opt = $.extend({}, newDefaults, customOptions);
				options = opt;
				methods._init(this);

			} else if (typeof customOptions === 'string') { // e.g. $('#popup').popup('close')
				methods[customOptions](this);
				options = newDefaults;

			} else { // e.g. $('#popup').popup()
				options = newDefaults;
				methods._init(this);

			}
		});
	};

	$.fn.neoModal.defaults = {
		dimLayer: true,
		dimBackColor: 'rgba(0, 0, 0, 0.5)',
		dimClickClose: true, // dim click close
		speed: 400, // modal fadeIn speed
		scrollLock: true, // parent scroll lock
		closeButton: 'pop_btn_close', // closebutton class
		minZindex: 99999,
		callBackArray: null,
		/* callBackArray : [
			{
				className: 'popSubmitClose',
				funcName: function() {
					testAlert();
				}
			},
			{
				className: 'popSubmitClose1',
				funcName: function() {
					$('#layer3').neoModal('close');
					$('#layer4').neoModal();
				}
			}
		], */
		message: null, // message: 'Lorem ipsum dolor sit amet'
	};
})(jQuery);

 