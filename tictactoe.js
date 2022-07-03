$(document).ready(function(){
    console.log('ttt ready');
    const imgX = "<img class='x move-img' width='80vw' src='assets/x.png'>";
    const imgO = "<img class='o move-img' width='80vw' src='assets/o.png'>";
    const nyan = "<img width='80vw' src='assets/nyan100.gif'>";
    const computerwins = "<img  width='80vw' src='assets/computerwins.gif'>";
    const playerwins = "<img  width='80vw' src='assets/playerwins.gif'>";
    var status = "waiting";
    var state = [0,0,0,0,0,0,0,0,0];

    $('.move-cell').click(player1)

    function resetGame(){    
        console.log('resetting game')
        status = "waiting";
        state = [0,0,0,0,0,0,0,0,0];
        $('.move-cell').html('');
        $('.move-cell').click(player1)
        $('#gametext').html("Click on a square to begin");

    }

    function player1(){
        status = "playing";
        var id = $(this).attr('id');
        if(isCellEmpty(id)){
            $(this).html(imgX);
            state[id] = 1;
            checkWin();
            checkTie();
            if (status == "playing"){
                player2();
            }
        }else{
            $('#gametext').html("Pick an empty cell");
        }
    }
    function player2(){
        var stop = 0;
        var foundMove = false;
        sumState = 0;
        for(var i in state){sumState += state[i];}
        //take a corner square if player starts in center
        if(sumState == 1 && state[4] == 1){
            var corners = [0,2,6,8];
            var cornermove = corners[Math.floor(Math.random()*4)];
            move2(cornermove);
            foundMove = true;
        }
        //take middle cell
        if(foundMove == false && isCellEmpty(4)){
            move2(4);
            foundMove = true;
        }
        //top row check        
        if(foundMove == false && state[0] == state[1] && state[0] == 1 && isCellEmpty(2)){
            move2(2);
            foundMove = true;
        }
        if(foundMove == false && state[1] == state[2] && state[1] == 1 && isCellEmpty(0)){
            move2(0);
            foundMove = true;
        }
        if(foundMove == false && state[0] == state[2] && state[0] == 1 && isCellEmpty(1)){
            move2(1);
            foundMove = true;
        }
        //middle row check        
        if(foundMove == false && state[3] == state[4] && state[3] == 1 && isCellEmpty(5)){
            move2(5);
            foundMove = true;
        }
        if(foundMove == false && state[4] == state[5] && state[4] == 1 && isCellEmpty(3)){
            move2(3);
            foundMove = true;
        }
        if(foundMove == false && state[3] == state[5] && state[3] == 1 && isCellEmpty(4)){
            move2(4);
            foundMove = true;
        }
        //bottom row check        
        if(foundMove == false && state[6] == state[7] && state[6] == 1 && isCellEmpty(8)){
            move2(8);
            foundMove = true;
        }
        if(foundMove == false && state[7] == state[8] && state[7] == 1 && isCellEmpty(6)){
            move2(6);
            foundMove = true;
        }
        if(foundMove == false && state[6] == state[8] && state[6] == 1 && isCellEmpty(7)){
            move2(7);
            foundMove = true;
        }
        //left column check        
        if(foundMove == false && state[0] == state[3] && state[0] == 1 && isCellEmpty(6)){
            move2(6);
            foundMove = true;
        }
        if(foundMove == false && state[0] == state[6] && state[0] == 1 && isCellEmpty(3)){
            move2(3);
            foundMove = true;
        }
        if(foundMove == false && state[3] == state[6] && state[3] == 1 && isCellEmpty(0)){
            move2(0);
            foundMove = true;
        }
        //center column check        
        if(foundMove == false && state[1] == state[4] && state[1] == 1 && isCellEmpty(7)){
            move2(7);
            foundMove = true;
        }
        if(foundMove == false && state[1] == state[7] && state[1] == 1 && isCellEmpty(4)){
            move2(4);
            foundMove = true;
        }
        if(foundMove == false && state[4] == state[7] && state[4] == 1 && isCellEmpty(1)){
            move2(1);
            foundMove = true;
        }
        //right column check        
        if(foundMove == false && state[2] == state[5] && state[2] == 1 && isCellEmpty(8)){
            move2(8);
            foundMove = true;
        }
        if(foundMove == false && state[2] == state[8] && state[2] == 1 && isCellEmpty(5)){
            move2(5);
            foundMove = true;
        }
        if(foundMove == false && state[5] == state[8] && state[5] == 1 && isCellEmpty(2)){
            move2(2);
            foundMove = true;
        }
        //top-left to bottom-right check        
        if(foundMove == false && state[0] == state[4] && state[0] == 1 && isCellEmpty(8)){
            move2(8);
            foundMove = true;
        }
        if(foundMove == false && state[0] == state[8] && state[0] == 1 && isCellEmpty(4)){
            move2(4);
            foundMove = true;
        }
        if(foundMove == false && state[8] == state[4] && state[8] == 1 && isCellEmpty(0)){
            move2(0);
            foundMove = true;
        }
        //take a corner square if player starts in center and then takes a corner square
        if(sumState == 4 && state[4] == 1 && (state[0] == 1 || state[2] == 1 || state[6] == 1 || state[8] == 1)){
            var corners = [0,2,6,8];
            while(!foundMove){
                var cornermove = corners[Math.floor(Math.random()*4)];
                if (isCellEmpty(cornermove)){
                    move2(cornermove);
                    foundMove = true;
                }
                stop++;
                if(stop>333){
                    foundMove = true;
                    $('#gametext').html("There was an error. &nbsp;&nbsp; <div class='link' id='linkReset'>Reset Game</div>");
                    $('#linkReset').click(resetGame);
                }
            }
            foundMove = true;
        }
        //take a side square if player starts in opposing corners
        if(!foundMove && sumState == 4 && state[4] == 2 && (state[0] == 1 && state[8] == 1)){
            move2(2);
            foundMove = true;
        }        
        if(!foundMove && sumState == 4 && state[4] == 2 && (state[2] == 1 || state[6] == 1)){
            move2(8);
            foundMove = true;
        }
        while(!foundMove){
            var tryid = Math.round(Math.random()*8);
            if (isCellEmpty(tryid)){
                move2(tryid);
                foundMove = true;
            }
            stop++;
            if(stop>333){
                foundMove = true;
                $('#gametext').html("There was an error. &nbsp;&nbsp; <div class='link' id='linkReset'>Reset Game</div>");
                $('#linkReset').click(resetGame);
            }
        }
        $('#gametext').html("Player's turn");
        checkWin();
        checkTie();
    }
    function move2(id){
        $('#'+id).html(imgO);
        state[id] = 2;
    }
    function isCellEmpty(id){
        if(state[id] == 0){
            return true;
        }else{
            return false;
        }
    }
    function checkTie(){
        for(let i = 0;i<9;i++){
            if (state[i] == 0){
                return false;
            }
        }
        foundTie();
        return true;
    }
    function checkWin(){
        if(state[0] == state[1] && state[1] == state[2] && state[0] != 0){
            foundWinner(state[0]);
        }
        if(state[3] == state[4] && state[4] == state[5] && state[3] != 0){
            foundWinner(state[3]);
        }
        if(state[6] == state[7] && state[7] == state[8] && state[6] != 0){
            foundWinner(state[6]);
        }
        if(state[0] == state[3] && state[3] == state[6] && state[0] != 0){
            foundWinner(state[0]);
        }
        if(state[1] == state[4] && state[4] == state[7] && state[1] != 0){
            foundWinner(state[1]);
        }
        if(state[2] == state[5] && state[5] == state[8] && state[2] != 0){
            foundWinner(state[2]);
        }
        if(state[0] == state[4] && state[4] == state[8] && state[0] != 0){
            foundWinner(state[0]);
        }
        if(state[2] == state[4] && state[4] == state[6] && state[2] != 0){
            foundWinner(state[2]);
        }
        
    }
    function foundWinner(player){
        if (player == 1){
            $('#gametext').html("WINNER! Congrats! &nbsp;&nbsp; <div class='link' id='linkReset'>Reset Game</div>");
            $('#linkReset').click(resetGame);
            $('#4').html(playerwins);
        }else{
            $('#gametext').html("Computer Wins! &nbsp;&nbsp; <div class='link' id='linkReset'>Reset Game</div>");
            $('#linkReset').click(resetGame);
            $('#4').html(computerwins);
        }
        status = "winner";
        $('.move-cell').off();
    }
    function foundTie(){
        $('#gametext').html("CAT WINS! WOOT! &nbsp;&nbsp; <div class='link' id='linkReset'>Reset Game</div>");
        $('#linkReset').click(resetGame);
        status = "winner";
        $('.move-cell').off();
        $('#4').html(nyan);
    }

});