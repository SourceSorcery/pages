$(document).ready(function(){
    console.log('reflex game ready');

    var stateStatus = "off";
    var startTime, finishTime, reflexTime, clickTimer;

    $('#gamebutton').click(game);

    function game(event){
        if (stateStatus == "off"){
            $('#gamebutton').css({"background-color":"red"});
            $('#gametext').text("WAIT FOR IT...")
            stateStatus = "waiting";
            var waittime = Math.random()*(4200 - 1200)+1200;
            clickTimer = setTimeout(start,waittime);
        }else if(stateStatus == "waiting"){
            clearTimeout(clickTimer);
            $('#gamebutton').css({"background-color":"darkgray"});
            $('#gametext').html("CLICKED TOO SOON<br /><br /><button id='reset'>Reset Game</button><br /><br />")
            
            $('#reset').click(reset);
        }else if(stateStatus == "running"){
            $('#gamebutton').css({"background-color":"darkgray"});
            stateStatus = "done";
            finishTime = + new Date();
            reflexTime = finishTime - startTime;
            var results = "TIME: " + reflexTime + "ms<br />";
            if (reflexTime < 200){
                results += "AMAZING JOB!";
            } else if (reflexTime < 300){
                results += "GREAT JOB!";
            } else if (reflexTime < 400){
                results += "Not too shabby!";
            } else {
                results += "Try again.";
            }
            results += "<br /><br /><button id='reset'>Reset Game</button><br /><br />"
            $('#gametext').html(results);
            $('#reset').click(reset);

        }
    }
    
    function start(event){
        console.log("starting");
        stateStatus = "running";
        startTime = + new Date();
        $('#gamebutton').css({"background-color":"green"});
        $('#gametext').text("CLICK NOW!")
    }


    function reset(){
        stateStatus = "off";
        $('#gamebutton').css({"background-color":"blue"});
        $('#gametext').text("CLICK TO BEGIN");
        startTime = 0;
        finishTime = 0;
        reflexTime = 0;

    }
});