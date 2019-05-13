$(document).ready(function () {
    
    function init_nav(){
        var lst_1depth = $('.lst_nav>li>a');
        var lst_2depth = $('.lst_2depth');
        lst_1depth.each(function(){
            var tg = $(this);
            tg.click(function(){
                if (tg.hasClass('on')) {
                    tg.removeClass('on');
                    tg.next().slideUp(200);
                }else{
                    lst_1depth.removeClass('on');
                    lst_2depth.slideUp(200);
                    tg.addClass('on');
                    tg.next().slideDown(200);
                }
            });
        });
    };

    // nav
    init_nav();

    // input file
    var fileTarget = $('.filebox .upload-hidden'); 
    fileTarget.on('change', function(){ // 값이 변경되면 
        if(window.FileReader){ // modern browser 
            var filename = $(this)[0].files[0].name; 
        } else { // old IE 
            var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
        };
        // 추출한 파일명 삽입 
        $(this).siblings('.upload-name').val(filename); 
    });
    
 // input file
    var fileTarget2 = $('.filebox .upload-hidden2'); 
    fileTarget2.on('change', function(){ // 값이 변경되면 
        if(window.FileReader){ // modern browser 
            var filename2 = $(this)[0].files[0].name; 
        } else { // old IE 
            var filename2 = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
        };
        // 추출한 파일명 삽입 
        $(this).siblings('.upload-name2').val(filename2); 
    });
    
    // input file
    var fileTarget3 = $('.filebox .upload-hidden3'); 
    fileTarget3.on('change', function(){ // 값이 변경되면 
        if(window.FileReader){ // modern browser 
            var filename3 = $(this)[0].files[0].name; 
        } else { // old IE 
            var filename3 = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
        };
        // 추출한 파일명 삽입 
        $(this).siblings('.upload-name3').val(filename3); 
    });

    // selectbox
    var selectTarget = $('.selectbox select'); 
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
    });

    /*box 인터렉션*/
 // 주주 - 전자투표 박스
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
	            if($(this).closest(".pop-layer").length) {
	            	$(this).closest('.execute_box_sameline').addClass('active').css('width', '70%').attr('title', '선택됨').siblings('.execute_box_sameline').css('width', '29.5%');
	            } else {
	            	$(this).closest('.execute_box_sameline').addClass('active').css('width', '49.5%').attr('title', '선택됨').siblings('.execute_box_sameline').css('width', '24.5%');
	            }
	            
	            
	            
	    	}
    	}
    });
    
    $(document).on("click",'.voting_execute_box .voteDiv.case1 .btn_voting_execute, .voting_execute_box .voteDiv_close',function() {
        voting_execute_box_close();
    });
});

//주주 - 전자투표 박스 닫기
var voting_execute_box_close = function () {
    $('.voting_execute_box').removeClass('active').removeClass('execute_box_sameline');
    $('.voting_execute_box').removeAttr('title').removeAttr('style');
};
