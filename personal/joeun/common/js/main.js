$(function() {
// 메인 배너 스크립트
    var quotes = $(".quotes");
    var quoteIndex = -1;
    var line = $(".line");

    function linefade() {
      line.animate({'width':'40%'},2000).delay(2000).animate({'width':'0'},2000,linefade);
    }

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000).delay(2000).fadeOut(2000, showNextQuote);
    }



    linefade();
    showNextQuote();

    });
