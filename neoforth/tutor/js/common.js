$(function(){
    //성격 분석리스트 모두 동의
    $('#clistAll').click(function() {
        $('.clist_check').prop('checked', this.checked);
    });
    //성격 분석리스트 모두 체크되면 위에 All체크도 체크
    $('.clist_check').click(function(){
        if($('.clist_check').length == $('.clist_check:checked').length){
            $('#clistAll').prop('checked',true);
        }else{
            $('#clistAll').prop('checked',false);
        }
    });

    //************* 로컬 스토리지 부분  **************
    var ls = window.localStorage;
    ls.setItem('name', 'isme2n');
    var nextButton = $('.poll .btn-submit');
    var prevButton = $('.poll .btn-default');

    nextButton.on('click', function(){
        //라디오버튼 전부 체크여부 확인
        if($('.poll input[type="radio"]:checked').length === $('.poll tbody tr').length){
            $.each($('.poll').serializeArray(), function(key, val){
                //localStorage 추가
                ls.setItem(val['name'], val['value']);
            });
        }else{
            alert('선택안된 항목이 있습니다');
            return false;
        }
    });

    prevButton.on('click', function(){
        //라디오버튼 전부 체크여부 확인

        $.each($('.poll').serializeArray(), function(key, val){
            //localStorage 추가
            ls.setItem(val['name'], val['value']);
        });
    });

    //로컬 스토리지 데이터뽑아내기
    var dataList = new Array();

    for(var i = 1; i <= 81; i++)
    {
        //01 ~ 09 예외처리
        if(i>= 1 && i<= 9){
            i = '0'+i;
        }

        var receiveData = ls.getItem("no"+ i);

        var datas = new Object();
        datas.name = "no" + i;
        datas.value = receiveData;
        // console.log("no"+ i + " : " + receiveData);

        //라디오 체크값 유지하기
        $('input[name="'+ datas.name +'"][value="' + datas.value +'"]').prop('checked', true);
        dataList.push(datas);
    }
    var jsonData = JSON.stringify(dataList) ;
    console.log(jsonData);

    //************* // 로컬 스토리지 부분  **************

    //************* 고객데이터토탈입력  **************
    var table_id = 3;
    $('.add_wrap .btn-join').on('click', function () {
        var table =
            '<div class="customer_wrap">' +
            '<p class="tbl_tit">고객' + table_id +'<a href="javascript:void(0);" class="btn_close"><span class="ir">닫기</span></a></p>' +
            '<table class="writed">' +
            '    <caption>기재사항</caption>' +
            '    <tbody>' +
            '	<tr>' +
            '	    <th>이름</th>' +
            '	    <td>' +
            '		<input type="text" class="form-control" name="user_name' + table_id +'">' +
            '	    </td>' +
            '	    <th>나이</th>' +
            '	    <td>' +
            '		<input type="text" class="form-control" name="age' + table_id +'">' +
            '	    </td>' +
            '	    <th>관계</th>' +
            '	    <td>' +
            '		<input type="text" class="form-control" name="relation' + table_id +'">' +
            '	    </td>' +
            '	</tr>' +
            '	<tr>' +
            '	    <th>성별</th>' +
            '	    <td>' +
            '		<div class="checks">' +
            '		    <input type="radio" id="gender' + table_id +'" name="gender' + table_id +'" value="male">' +
            '		    <label for="gender' + table_id +'">남</label>' +
            '		    <input type="radio" id="gender' + table_id + '_f" name="gender' + table_id +'" value="female">' +
            '		    <label for="gender' + table_id +'_f" class="gender_female">여</label>' +
            '		</div>' +
            '	    </td>' +
            '	    <th>재방문횟수</th>' +
            '	    <td>' +
            '		<input type="text" class="form-control" name="revisit_num' + table_id +'">' +
            '	    </td>' +
            '	    <th></th>' +
            '	    <td></td>' +
            '	</tr>' +
            '    </tbody>' +
            '</table>' +
            '<table class="sum">' +
            '    <caption>설문조사 결과값</caption>' +
            '    <tbody>' +
            '	<tr>' +
            '	    <th>구분</th>' +
            '	    <td>가</td>' +
            '	    <td>나</td>' +
            '	    <td>다</td>' +
            '	    <td>라</td>' +
            '	    <td>마</td>' +
            '	    <td>바</td>' +
            '	    <td>사</td>' +
            '	    <td>아</td>' +
            '	    <td>자</td>' +
            '	</tr>' +
            '	<tr>' +
            '	    <th>합계</th>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	    <td>' +
            '		<input type="text" class="form-control">' +
            '	    </td>' +
            '	</tr>' +
            '    </tbody>' +
            '</table>' +
            '</div>';

        $('.customer').append(table);
        table_id++;
        if ($('.customer_wrap').length > 4) {
            $('.add_wrap .btn-join').hide();
        }
    });
    $(document).on('click', '.user_full_input .btn_close', function () {

        $(this).closest('.customer_wrap').remove();

        // if ($company_info2.hasClass('contra_table2')) {
        //     table_id = 2;
        // } else if ($company_info2.hasClass('contra_table3')) {
        //     table_id = 3;
        // }
        table_id--;
        if ($('.customer_wrap').length < 5) {
            $('.add_wrap .btn-join').show();
        }
    });
    //************* //고객데이터토탈입력  **************


});
