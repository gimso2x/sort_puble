$(function() {
    //디자인 input[type="number"] 지정
    var $design_input = $('.calculate.design td input[type="number"]');
    //퍼블 input[type="number"] 지정
    var $puble_input = $('.calculate.puble td input[type="number"]');
    //디자인 input[type="number"] 지정
    var $develope_input = $('.calculate.develope td input[type="number"]');
    //단위테스트 input[type="number"] 지정
    var $sectiontest_input = $('.calculate.section_test td input[type="number"]');


    $('.calculate td input[type="number"]').on('keyup change', function() {
        //input number validation 20까지 입력
        if (this.value > 20) {
            this.value = 20;
            alert('20까지만 가능합니다.');
            // return false;
        }

        //화면 디자인 input number 가 40 초과시
        var virtul_sum = 0;
        $design_input.each(function() {
            if ($.isNumeric($(this).val())) {
                virtul_sum = virtul_sum + parseFloat($(this).val());
                if (virtul_sum > 40) {
                    $design_input.val('');
                    alert("화면디자인 총 수량이 40이 넘으면 안됩니다");
                    return false;
                }
            }
        });

        //화면 퍼블리싱 input number 가 40 초과시
        var virtul_sum1 = 0;
        $puble_input.each(function() {
            if ($.isNumeric($(this).val())) {
                virtul_sum1 = virtul_sum1 + parseFloat($(this).val());
                if (virtul_sum1 > 40) {
                    $puble_input.val('');
                    alert("화면퍼블리싱 총 수량이 40이 넘으면 안됩니다");
                    return false;
                }
            }
        });

        //개발화면 input number 가 40 초과시
        var virtul_sum2 = 0;
        $develope_input.each(function() {
            if ($.isNumeric($(this).val())) {
                virtul_sum2 = virtul_sum2 + parseFloat($(this).val());
                if (virtul_sum2 > 40) {
                    $develope_input.val('');
                    $('.calculate.section_test td input[type="number"]').val('');
                    alert("개발화면 총 수량이 40이 넘으면 안됩니다");
                    return false;
                }
            }
        });
    });

    //개발 value = 단위테스트 value_sum
    $('.calculate.develope td input[type="number"]').on('keyup change', function() {
        var $this_name = $(this).attr('name');
        var $this_val = $(this).val();
        $('#' + $this_name).val($this_val);
    });

    //토탈 합치기
    $(document).on('click', '.pop_button', function() {
        //제목 설정
        if ($('#pj_tit').val() !== '') {
            $('.pop-header').text($('#pj_tit').val());
        } else {
            $('.pop-header').text("프로젝트명 미정");
        }

        //체크박스 value 합 - 매체선택(웹, 앱, 하이브리드, 웹앱)
        var check_sum = 0.1;
        $('.calculate input[type="checkbox"]:checked').each(function() {
            check_sum += parseFloat($(this).val());
            // console.log("check_sum : " + check_sum);
        });

        //라디오박스 value 합(화면기획, 화면설계, 산출물 작성)
        var radio_big_sum = 0;
        $('.calculate.big input[type="radio"]:checked').each(function() {
            radio_big_sum += parseFloat($(this).val());
            // console.log("radio_big_sum : " + radio_big_sum);
        });

        //라디오박스 value 합(화면기획, 화면설계, 산출물 작성) 제외한 나머지 radio
        var radio_small_sum = 0;
        $('.calculate.small input[type="radio"]:checked').each(function() {
            radio_small_sum += parseFloat($(this).val());
            // console.log("radio_small_sum : " + radio_small_sum);
        });

        //input[type="number"] value 화면디자인 합
        var design_sum = 0;
        var cal_design_sum = 0;
        $design_input.each(function(index) {
            if ($.isNumeric($(this).val())) {
                design_sum = parseFloat($design_input.eq(0).val() * 5)
                + parseFloat($design_input.eq(1).val() * 3)
                + parseFloat($design_input.eq(2).val() * 1)
                + parseFloat($design_input.eq(3).val() * 0.5)
                + parseFloat($design_input.eq(4).val() * 0.2);
                // console.log("design_sum : "+ design_sum);
            }
        });
        cal_design_sum = design_sum;
        console.log("디자인 보정치 나눈 값 : " + cal_design_sum);

        //input[type="number"] value 화면퍼블리싱 합
        var puble_sum = 0;
        var cal_puble_sum = 0;
        $puble_input.each(function(index) {
            if ($.isNumeric($(this).val())) {
                puble_sum = parseFloat($puble_input.eq(0).val() * 5)
                + parseFloat($puble_input.eq(1).val() * 3)
                + parseFloat($puble_input.eq(2).val() * 1)
                + parseFloat($puble_input.eq(3).val() * 0.5)
                + parseFloat($puble_input.eq(4).val() * 0.2);
                // console.log("puble_sum : "+ puble_sum);
            }
        });
        cal_puble_sum = puble_sum;
        console.log("퍼블 보정치 나눈 값 : " + cal_puble_sum);


        //input[type="number"] value 개발화면 합
        var develope_sum = 0;
        var cal_develope_sum = 0;
        $develope_input.each(function(index) {
            if ($.isNumeric($(this).val())) {
                develope_sum = parseFloat($develope_input.eq(0).val() * 5)
                + parseFloat($develope_input.eq(1).val() * 3)
                + parseFloat($develope_input.eq(2).val() * 1)
                + parseFloat($develope_input.eq(3).val() * 0.5)
                + parseFloat($develope_input.eq(4).val() * 0.025);
                // console.log("develope_sum : "+ develope_sum);
            }
        });
        cal_develope_sum = develope_sum ;
        console.log("개발 보정치 나눈 값 : " + cal_develope_sum);

        //input[type="number"] value 단위테스트 합
        var section_sum = 0;
        $sectiontest_input.each(function(index) {
            if ($.isNumeric($(this).val())) {
                section_sum = parseFloat($sectiontest_input.eq(0).val() * 2)
                + parseFloat($sectiontest_input.eq(1).val() * 1.5)
                + parseFloat($sectiontest_input.eq(2).val() * 0.5)
                + parseFloat($sectiontest_input.eq(3).val() * 0.2)
                + parseFloat($sectiontest_input.eq(4).val() * 0.025);
                // console.log("section_sum(단위테스트 합) : "+ section_sum);
            }
        });

        //중간합계
        // 화면디자인 ~ 기능 합
        var bottom_sum = cal_design_sum + cal_puble_sum + cal_develope_sum + radio_small_sum;
        console.log("화면디자인 ~ 기능 합 - [bottom_sum] : " + bottom_sum);

        // (bottom_sum + 화면기획 + 화면설계 + 산출물작성) * 매체선택
        var next_sum = (bottom_sum + radio_big_sum) * check_sum;
        console.log("(bottom_sum + 화면기획 + 화면설계 + 산출물작성) * 매체선택 - [next_sum] : " + next_sum);

        // next_sum + 단위테스트
        var test_sum = next_sum + section_sum;
        console.log("next_sum + 단위테스트 : " + test_sum);

        //month 계산
        var month_sum = test_sum / 20.8;
        console.log("month 계산 / : " + month_sum);
		// 예상 M/M 계산 
		var value_mm = month_sum;

		// 예상 기간  6개월을 초과 해서는 않된다.  
		month_sum = month_sum / 6
		
		if (month_sum >= 6)
		{
			month_sum = 6;
		}

		// 예상 월 비용
		var value_monthmony = 0;
		if (month_sum > 1)
		{
			value_monthmony = (value_mm * 3500000) / Math.round(month_sum)
		} else {
			value_monthmony = value_mm * 3500000
		}


		// 예상 총 비용
		var value_totalmony = value_mm * 3500000;

        //value 값 합후에 레이어팝업에 삽입
        $('.value_sum').text(month_sum.toFixed(1));
		$('#value_sum').val(month_sum.toFixed(1));
		$('.value_mm').text(value_mm.toFixed(2));
		$('#value_mm').val(value_mm.toFixed(2));
		$('.value_monthmony').text(commas(priceCutting(value_monthmony.toFixed(0),'F',1000)));
		$('#value_monthmony').val(priceCutting(value_monthmony.toFixed(0),'F',1000));
		$('.value_totalmony').text(commas(priceCutting(value_totalmony.toFixed(0),'F',1000)));
		$('#value_totalmony').val(priceCutting(value_totalmony.toFixed(0),'F',1000));

    });
});

function commas(value){ 
	return value.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,'); 
}


function priceCutting(aprice, stype, n) { // 금액, 타입, 절삭금액 단위
    // 원단위처리(R:반올림, C:올림, F:버림)
    var remove_price = 0;
    stype = stype ? stype : "R";
    remove_price = aprice / n;
 
    if(stype == "F") {
        remove_price = Math.floor(remove_price);
    } else if (stype == "R") {
        remove_price = Math.round(remove_price);
    } else if (stype == "C") {
        remove_price = Math.ceil(remove_price);
    }
     
    remove_price = remove_price * n;
    return remove_price;
}