$(function () {
	
	$('input.cal_i').attr('autocomplete','off');

    // jquery tab
    var _idx = 0;
    var $tab_wrap = $('.tab_wrap');

    $tab_wrap.each(function () {
        var $tab_menu = $(this).find('ul.tab_menu>li');
        var $tab_content = $(this).children('.tab_content_wrap');

        $tab_menu.on('click', function (e) {
            e.preventDefault();
            _idx = $tab_menu.index(this);

            // tab_menu
            $(this).siblings().removeClass('current');
            $(this).addClass('current');

            //tab_content
            $tab_content.find('.tab_content').removeClass('current');
            $tab_content.find('.tab_content').eq(_idx).addClass('current');
        });
    });

    //jquery 레이어팝업
    //종합정보 - 고객번호 input이나 검색 눌렀을시 팝업
    $('.layer_csearch').click(function () {
        layer_popup("#layer_csearch");
        $('body').css({
            overflow: 'hidden',
            position: 'fixed'
        });

    });

    $('.layer_lsearch').click(function () {
        layer_popup("#layer_lsearch");
         /*$('body').css({
             overflow: 'hidden',
             position: 'fixed'
         });*/

    });
    $('.layer_asearch').click(function () {
        layer_popup("#layer_asearch");
	     /*$('body').css({
	         overflow: 'hidden',
	         position: 'fixed'
	     });*/

    });

    $('.pop_button').click(function () {
        var $href = $(this).attr('href');
        layer_popup($href);
        $('body').css({
            overflow: 'hidden'
        });

    });

    /* 종합정보리스트 클릭 */
    $(document).on({
        click: function () {
        	$(this).closest('tr').addClass('hover-bge5').siblings().removeClass('hover-bge5');
        }
    }, ".infoList tbody td");
    
    /* 상환스케쥴 tbl_grid 클릭 */
    $(document).on({
        click: function () {
        	$(this).closest('tr').addClass('click-bge5').siblings().removeClass('click-bge5');
        }
    }, ".tbl_grid.tbl_schedule tbody td, #test777 td, .tbl_intertSch td");


	/*tbl_grid hover*/
    $(document).on({
        mouseenter: function () {
        	$(this).closest('tr').addClass('hover-bge5');
        },
        mouseleave: function () {
        	$(this).closest('tr').removeClass('hover-bge5');
        }
    }, ".tbl_grid tbody td");
   
    $(document).on("click",'.comma-cost',function(){ 
    	$(this).selectRange($(this).val().length,$(this).val().length);
    });
    
    $(document).on("keyup",'.comma-cost',function(){ 
        var val = String(this.value.replace(/[^0-9]/g, ""));
        if(val.length < 1)
            return false;
        if(val.substring(0,1) == "0" && val.length != 1){
        	val = val.substring(1);
        }
        this.value = number_format(val);
    });
    
    /*종합정보 4개 레이어팝업*/
    var popupList = ["layer_loanInfo", "layer_guarInfo", "layer_rubInfo", "layer_pleInfo"];
    $.each(popupList, function(i, e){
    	//신규 버튼
    	$(document).on('click', '.' + e, function () {
            layer_popup('#' + e);
            // $('body').css({
            //     overflow: 'hidden',
            //     position: 'fixed'
            // });
        });
    	
    	//tr 더블클릭
    	$(document).on('click','.tbl_' + e + ' tbody .indata', function(){
    		layer_popup('#' + e);
    		$(this).closest('tr').addClass('click-bge5').siblings().removeClass('click-bge5');
            // $('body').css({
            //     overflow: 'hidden',
            //     position: 'fixed'
            // });
        });
    	
    	$(document).on('click','.tbl_' + e + ' tbody tr', function(){
    		$(this).closest('tr').addClass('click-bge5').siblings().removeClass('click-bge5');
            // $('body').css({
            //     overflow: 'hidden',
            //     position: 'fixed'
            // });
        });
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
    
    if($el.selector === '#layer_csearch'){
    	$el.find('#keyword').focus();
    	$el.find('#keyword').val("");
    	$el.find('#condition option[value="1"]').prop('selected', true);
    	$el.find('#cus_body').scrollTop(0);
    	cList();
    }

    $el.find('.btn_close').click(function () {
        pop_close();
    });

    $('.dim_layerpop .dimBg_layerpop').click(function () {
        pop_close();
    });
    
    $(document).on('click','.search_popup .ul_tbody a',function(){
    	pop_close();
    });
    
    /*$(document).on('click','.section-layer .cbtnwrap button',function(){
    	pop_close();
    });*/
    
    function pop_close() {
        $('.dim_layerpop').fadeOut();
        $el.fadeOut();
        $('body').css({
            overflow: 'visible',
            position: 'static'
        });
        return false;
    }
}

function pop_close2() {
    $('.dim_layerpop').fadeOut();
    $('.pop-layer').fadeOut();
    $('body').css({
        overflow: 'visible',
        position: 'static'
    });
    return false;
}

function f_today(){
    var today = new Date();
    var dd = today.getDate()+"";
    if(dd.length == 1){
    	dd = "0"+dd;
    }
    
    var mm = (today.getMonth()+1)+""; //January is 0!
    if(mm.length == 1){
        mm = "0"+mm;
    }
    var yyyy = today.getFullYear();
    today = yyyy+'-'+mm+'-'+dd;
    
    return today;
}
function f_yearMonth(){
    var yearMonth = new Date();
    var dd = yearMonth.getDate()+"";
    if(dd.length == 1){
    	dd = "0"+dd;
    }
    
    var mm = (yearMonth.getMonth()+1)+""; //January is 0!
    if(mm.length == 1){
        mm = "0"+mm;
    }
    var yyyy = yearMonth.getFullYear();
    yearMonth = yyyy+'-'+mm;
    
    return yearMonth;
}
function f_day_display(value){
	var returnValue;
	
	if(value == null){
		value = "";
	}
	
	if(value.length == 8){
		returnValue = value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,8);
	}else{
		returnValue = value;
	}
	return returnValue;
}

function f_telHyphen_display(value){
	var returnValue;
	if(value != null && value != ""){
		returnValue = value.replace(/-/gi,"");
		rereturnValue = returnValue.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	}
	return rereturnValue;
}

function number_format(data){
    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;
    var sign = data.match(/^[\+\-]/);
    if(sign) {
        data = data.replace(/^[\+\-]/, "");
    }
    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; i++)
    {
        number = number + data.charAt(i);
        if (i < data.length - 1)
        {
            k++;
            if ((k % cutlen) == 0)
            {
                number = number + comma;
                k = 0;
            }
        }
    }
    if(sign != null)
        number = sign+number;
    return number;
}
/*날짜 차이 일수 계산*/
function f_bewteenDateCal(first,second){
	var firstDate   = first;  
	var secondDate  = second;  
	var betweenDay  = "-99999";
	
	if(firstDate.length == 8){
		firstDate = firstDate.substring(0,4)+"-"+firstDate.substring(4,6)+"-"+firstDate.substring(6,8)+"";
	}  
	if(secondDate.length == 8){
		secondDate = secondDate.substring(0,4)+"-"+secondDate.substring(4,6)+"-"+secondDate.substring(6,8)+"";
	}
	//alert("firstDate"+firstDate+"\n"+"secondDate"+secondDate);  
	if(secondDate.length == 10){
		var dateArray1 = firstDate.split("-");
		var dateArray2 = secondDate.split("-");  		  
		var dateObj1 = new Date(dateArray1[0], Number(dateArray1[1])-1, dateArray1[2]);
		var dateObj2 = new Date(dateArray2[0], Number(dateArray2[1])-1, dateArray2[2]);
		betweenDay = (dateObj1.getTime()/1000/60/60/24) -(dateObj2.getTime()/1000/60/60/24)  ;
		//alert(betweenDay);
		return betweenDay;
	}  
	return betweenDay;
}

/*연체이자 계산 연체금액,연체이율,연체일수*/
function f_getOverdueIrt(loan_cost, overdue_irt, overdue_day) {
	var result = Math.floor(loan_cost * (overdue_irt/100)/ 365 * overdue_day); 
	return result;
}

/*날짜객체 date를 yyyy-mm-dd로 리턴*/
function getFormatDate(date){
	var year = date.getFullYear();                                 //yyyy
	var month = (1 + date.getMonth());                     //M
	month = month >= 10 ? month : '0' + month;     // month 두자리로 저장
	var day = date.getDate();                                        //d
	day = day >= 10 ? day : '0' + day;                            //day 두자리로 저장
	return  year + '-' + month + '-' + day;
}

function comma(num){
    var len, point, str; 
    if(num == null){
    	num ="";
    }else{
    	num = num + "";
    }   
     
    point = num.length % 3 ;
    len = num.length; 
   
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
     
    return str;
 
}

/**
 * 값이 null일 경우 대체한다.
 * @param psSrcVal 원본 문자열 (필수)
 * @param psNewVal 대체 문자열 (선택)(기본값: "")
 * @return String 결과값
 */ 
function C_nvl(psSrcVal, psNewVal) {
	var sRtnVal = psSrcVal;
	
	if (psNewVal == null) {
		psNewVal = "";
	}
	
	if (psSrcVal == null) {
		sRtnVal = psNewVal;
	}
	
	return sRtnVal;
}

$.fn.selectRange = function(start, end) {

	return this.each(function() {

		if(this.setSelectionRange) {

			this.focus();

			this.setSelectionRange(start, end);

		}

		else if(this.createTextRange) {

			var range = this.createTextRange();

			range.collapse(true);

			range.moveEnd('character', end);

			range.moveStart('character', start);

			range.select();

		}

	});

};