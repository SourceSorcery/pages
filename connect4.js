$(document).ready(function(){
    console.log('ttt ready');
    const imgRed = "<img class='x move-img' width='80px' src='assets/c4red.png'>";
    const imgBlack = "<img class='o move-img' width='80px' src='assets/c4black.png'>";
    const bkgRed = "url('assets/c4red.png')";
    const bkgBlack = "url('assets/c4black.png')";
    const bkgValid = "url('assets/c4valid.png')";
    const nyan = "<img width='100px' src='assets/nyan100.gif'>";
    const computerwins = "<img width='100px' src='assets/computerwins.gif'>";
    const playerwins = "<img width='100px' src='assets/playerwins.gif'>";
    var status = "waiting";
    var state = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];
    var rc = [0][0];  //this is the current move in row col array form
    var currId = 0;
    $('.move-cell').click(player1);

    showValidCells();

    function getIDbyRowCol(row,col){
        let retval = parseFloat((parseFloat(row))*8) + parseFloat(col);
        return retval;
    }
    function getRowColbyId(id){
        var row = Math.floor(id/8);
        var col = id % 8;
        console.log(row + " - " + col);
        return [row,col];
    }
    function player1(){
        status = "playing";
        var id = $(this).attr('id');
        rc = getRowColbyId(id);
        currId = id;
        if(isCellEmpty(rc[0],rc[1]) && isMoveValid(rc[0],rc[1])){
            $(this).css("background-image",bkgRed);
            $('#gametext').html("Good move");
            state[rc[0]][rc[1]] = 1;
            checkWin();
            checkTie();
            if (status == "playing"){
                player2();
            }
        }else{
            $('#gametext').html("Pick a valid cell. Must be lowest free cell in column.");
        }
    }
    function player2(){
        var stop = 0;
        var foundMove = false;
        foundMove = checkBlockWin();
        while(!foundMove){
            var tryrow = Math.floor(Math.random()*8);
            var trycol = Math.floor(Math.random()*8);
            if (isCellEmpty(tryrow,trycol) && isMoveValid(tryrow,trycol)){
                move2(tryrow,trycol);
                foundMove = true;
            }
            stop++;
            if(stop>333){
                foundMove = true;
                $('#gametext').html("There was an error");
            }
        }
        $('#gametext').html("Player's turn");
        checkWin();
        checkTie();
        showValidCells();
    }
    function showValidCells(){
        
        for(let c=0;c<=7;c++){
            let colDone = false;
            for(let r=7;r>=0;r--){
                if(state[r][c] == 0 && !colDone){
                    let validcell = "#"+getIDbyRowCol(r,c);
                    $(validcell).css("background-image",bkgValid);
                    colDone = true;
                }
            }
        }
    }
    function move2(row,col){
        var cmoveid = getIDbyRowCol(row,col);
        $('#'+cmoveid).css("background-image",bkgBlack);
        state[row][col] = 2;
    }
    function isCellEmpty(row,col){
        if(state[row][col] == 0){
            return true;
        }else{
            return false;
        }
    }
    function isMoveValid(row,col){
        for(let r=row+1;r<8;r++){
            if(state[r][col] == 0){
                return false;
            }
        }
        return true;
    }
    function checkTie(){
        for(let i = 0;i<8;i++){
            for(let i2 = 0;i2<8;i2++){
                if (state[i][i2] == 0){
                    return false;
                }
            }
        }
        foundTie();
        return true;
    }
    function checkBlockWin(){
        //check row block right
        for(let r=0;r<8;r++){
            for(let c=0;c<5;c++){
                if( state[r][c] == state[r][c+1] &&
                    state[r][c+1] == state[r][c+2] &&
                    state[r][c] != 0){
                        if(isCellEmpty(r,c+3) && isMoveValid(r,c+3)){
                            move2(r,c+3);
                            return true;
                        }
                }
            }
        }
        //check row block left
        for(let r=0;r<8;r++){
            for(let c=8;c>2;c--){
                if( state[r][c] == state[r][c-1] &&
                    state[r][c-1] == state[r][c-2] &&
                    state[r][c] != 0){
                        if(isCellEmpty(r,c-3) && isMoveValid(r,c-3)){
                            move2(r,c-3);
                            return true;
                        }
                }
            }
        }
        //check col block down
        for(var c=0;c<8;c++){
            for(var r=0;r<5;r++){
                if( state[r][c] == state[r+1][c] &&
                    state[r+1][c] == state[r+2][c] &&
                    state[r][c] != 0
                    ){
                        if(isCellEmpty(r+3,c) && isMoveValid(r+3,c)){
                            move2(r+3,c);
                            return true;
                        }
                    }
            }
        }
        //check col block up
        for(var c=0;c<8;c++){
            for(var r=7;r>2;r--){
                if( state[r][c] == state[r-1][c] &&
                    state[r-1][c] == state[r-2][c] &&
                    state[r][c] != 0
                    ){
                        if(isCellEmpty(r-3,c) && isMoveValid(r-3,c)){
                            move2(r-3,c);
                            return true;
                        }
                    }
            }
        }
        //check row hole block right
        for(let r=0;r<8;r++){
            for(let c=0;c<5;c++){
                if( state[r][c] == state[r][c+1] &&
                    state[r][c] == state[r][c+3] &&
                    state[r][c] != 0){
                        if(isCellEmpty(r,c+2) && isMoveValid(r,c+2)){
                            move2(r,c+2);
                            return true;
                        }
                }
            }
        }
        //check row hole block left
        for(let r=0;r<8;r++){
            for(let c=0;c<5;c++){
                if( state[r][c] == state[r][c+2] &&
                    state[r][c] == state[r][c+3] &&
                    state[r][c] != 0){
                        if(isCellEmpty(r,c+2) && isMoveValid(r,c+2)){
                            move2(r,c+2);
                            return true;
                        }
                }
            }
        }
        
        //check diag-up-right block
        for(var r=7;r>=3;r--){
            for(var c=0;c<5;c++){
                if( state[r][c] == state[r-1][c+1] &&
                    state[r-1][c+1] == state[r-2][c+2] &&
                    state[r][c] != 0
                    ){
                        if(isCellEmpty(r-3,c+3) && isMoveValid(r-3,c+3)){
                            move2(r-3,c+3);
                            return true;
                        }
                    }
            }
        }
        //check diag-up-left block
        for(var r=7;r>=3;r--){
            for(var c=7;c>=3;c--){
                if( state[r][c] == state[r-1][c-1] &&
                    state[r-1][c-1] == state[r-2][c-2] &&
                    state[r][c] != 0
                    ){
                        if(isCellEmpty(r-3,c-3) && isMoveValid(r-3,c-3)){
                            move2(r-3,c-3);
                            return true;
                        }
                    }
            }
        }

    }
    function checkWin(){
        //check row win
        for(let r=0;r<8;r++){
            for(let c=0;c<5;c++){
                if( state[r][c] == state[r][c+1] &&
                    state[r][c+1] == state[r][c+2] &&
                    state[r][c+2] == state[r][c+3] &&
                    state[r][c] != 0
                    ){
                        foundWinner(state[r][c]);
                }
            }
        }
        //check col win
        for(var c=0;c<8;c++){
            for(var r=0;r<5;r++){
                if( state[r][c] == state[r+1][c] &&
                    state[r+1][c] == state[r+2][c] &&
                    state[r+2][c] == state[r+3][c] &&
                    state[r][c] != 0
                    ){
                        console.log(r + " - " + c)
                        console.log(state[r][c]);
                        foundWinner(state[r][c]);
                    }
            }
        }
        //check diag-down-right win
        for(var r=0;r<5;r++){
            for(var c=0;c<5;c++){
                if( state[r][c] == state[r+1][c+1] &&
                    state[r+1][c+1] == state[r+2][c+2] &&
                    state[r+2][c+2] == state[r+3][c+3] &&
                    state[r][c] != 0
                    ){
                        console.log(r + " - " + c)
                        console.log(state[r][c]);
                        foundWinner(state[r][c]);
                    }
            }
        }
        //check diag-down-left win
        for(var r=0;r<5;r++){
            for(var c=3;c<8;c++){
                if( state[r][c] == state[r+1][c-1] &&
                    state[r+1][c-1] == state[r+2][c-2] &&
                    state[r+2][c-2] == state[r+3][c-3] &&
                    state[r][c] != 0
                    ){
                        console.log(r + " - " + c)
                        console.log(state[r][c]);
                        foundWinner(state[r][c]);
                    }
            }
        }

    }
    function foundWinner(player){
        if (player == 1){
            $('#gametext').html("WINNER! Congrats!");
        }else{
            $('#gametext').html("Computer Wins!");
        }
        status = "winner";
        $('.move-cell').off();
    }
    function foundTie(){
        $('#gametext').html("CAT WINS! WOOT!");
        status = "winner";
        $('.move-cell').off();
        $('#4').html(nyan);
    }

});