
$(function(){ 
	/*=============================================
	all menu
	=============================================*/
	var btn_allmenu = $('.btn_allmenu');
	var nav_allmenu = $('.nav_allmenu');

	btn_allmenu.click(function(){
		var tg = $(this);
		
		if(tg.hasClass('on')){
			nav_allmenu.slideUp(200,function(){});
		}else{
			nav_allmenu.slideDown(200, function(){});
		}

		tg.toggleClass('on');
		
	}); 

	nav_allmenu.mouseleave(function(){
		btn_allmenu.removeClass('on');
		$(this).slideUp(200,function(){});
	});

	/*=============================================
	header
	=============================================*/
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
			sec_home.addClass('fixed');
		}else{
			hd.removeClass('fixed');
			sec_home.removeClass('fixed');
		}
	});

	/*=============================================
	top button
	=============================================*/
	var speed = 500;
    $(".btn_top").css("cursor", "pointer").click(function()
    {
        $('body, html').animate({scrollTop:0}, speed);
    });

    /*=============================================
	family site
	=============================================*/
	var selectTarget = $('.select_family select'); 
	selectTarget.on('focus',function(){ 
		$(this).parent().addClass('focus'); 
	}); 
	selectTarget.on('blur', function(){ 
		$(this).parent().removeClass('focus'); 
	}); 
	selectTarget.change(function(){ 
		var select_name = $(this).children('option:selected').text(); 
		$(this).siblings('label').text(select_name);
		$(this).siblings('label').removeClass('placeholder');
		window.open(this.options[this.selectedIndex].value,'_blank');
	});

 	
 	/*=============================================
	GNB
	=============================================*/
	var gnb = $('.nav_gnb'); 
	var lst_gnb = gnb.find('li a');
	var bar = $('.group_gnb .bar');
	var submenu_area = $('.submenu_area');
	var nav_sub = submenu_area.find('.nav_sub');

	var prev_active = null;
	var sub_state = false;

	var timer_mouseleave = null;

	function submenu_hide(){
		bar.stop().animate({'width': 0}, 300);
		nav_sub.hide().css('opacity', 0);
		submenu_area.stop().animate({
			'height': 0,
			'opacity': 0 
		}, 300, function(){
			keep_active();
		}); 
	}; 

	function keep_active(){
		lst_gnb.removeClass('active');
	  	if (prev_active !== null) {
	  		prev_active.addClass('active');
	  	}; 
		lst_gnb.each(function(){
			var tg = $(this);
			if (tg.hasClass('active')) {
				bar.stop().animate({'left': tg.position().left, 'width': tg.outerWidth()}, 300);
				submenu_area.css({'left': bar.position().left - 50});
			}
		});
	};
 
	lst_gnb.each(function(i){
		// init
		var tg = $(this);
		var bar_left = tg.position().left;
		var bar_width = tg.outerWidth() + 5; 

		tg.css({'width': bar_width});
		if (tg.hasClass('active')) {
			prev_active = tg;
			bar.stop().animate({'left': bar_left, 'width': bar_width}, 300);
			submenu_area.css({'left': bar_left - 50});
		}; 

 
		tg.mouseover(function(){
			clearTimeout(timer_mouseleave); 

			lst_gnb.removeClass('active');
			$(this).addClass('active');

			btn_allmenu.removeClass('on');
			nav_allmenu.stop().slideUp(200,function(){}); 
			nav_sub.hide().css('opacity', 0);  

			if (tg.parent().hasClass('logout_area') || tg.parent().hasClass('notice_area')) {
				submenu_hide();
			}else{
				bar.stop().animate({'left': bar_left, 'width': bar_width}, 300); 

				nav_sub.eq(i).stop().slideDown(10, function(){
					submenu_area.stop().animate({ 
						'height': nav_sub.eq(i).outerHeight(),
						'left': bar_left + bar_width/2 - 100,
						'opacity': 1 
					}, 200);  
				}).animate({ 
					'opacity': 1
				}, 300);   
			} 
		});
	});
 
	gnb.mouseleave(function(){
		timer_mouseleave = setTimeout(function() { 
		  	if (sub_state == false) {
				submenu_hide();
			}
		}, 300);  
	});  

	nav_sub.mouseover(function(){
		sub_state = true;
	}); 

	nav_sub.mouseleave(function(){  
		sub_state = false; 
		submenu_hide();
	});
 

	/*=============================================
	page navigation 
	=============================================*/
	$('.nav_page .btn_page').each(function(){
		var tg = $(this);
		tg.click(function(){
			tg.toggleClass('active');
			tg.next().slideToggle(200);
		});

		tg.parent().mouseleave(function(){
			tg.removeClass('active');
			tg.next().slideUp(200);
		});
	});
 
/*=============================================
	Datepicker
	=============================================*/
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
	if ($('.month_datepicker').length > 0) {
		$('.month_datepicker').datepicker({
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
			changeMonth: true,
			changeYear: true,
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
	$(document).on('click', '.table_accordion dt', function(event){
		var tg = $(event.target).parents('dt');
		 if (tg.hasClass('active')) {
			tg.removeClass('active');
			tg.next().stop().slideUp(200);
		}else{
			tg.closest('dl').find('dt').removeClass('active');
			tg.closest('dl').find('dd').stop().slideUp(200);
			tg.addClass('active');
			tg.next().stop().slideDown(200);
		}
	});

	/*=============================================
	tooltip
	=============================================*/
	var tooltip_btn = $('.tooltip_area .btn_stockorder_tooltip');
	var tooltip_close_btn = $('.tooltip_close button');
	$(document).on('click', '.tooltip_area .btn_stockorder_tooltip', function() {
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

	$(document).on('click', '.tooltip_close button', function() {
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
 
 