$(document).ready(function(){
    console.log('snake ready');
    $('#gametext').html("Press the Right arrow key (or right button) to begin!")

    //    const imgRed = "<img class='x move-img' width='80px' src='assets/c4red.png'>";
    //    const imgBlack = "<img class='o move-img' width='80px' src='assets/c4black.png'>";
    //    const bkgRed = "url('assets/c4red.png')";
    //    const bkgBlack = "url('assets/c4black.png')";
    //    const bkgValid = "url('assets/c4valid.png')";
    //    const nyan = "<img width='100px' src='assets/nyan100.gif'>";
    //    const computerwins = "<img width='100px' src='assets/computerwins.gif'>";
    //    const playerwins = "<img width='100px' src='assets/playerwins.gif'>";
    //    var status = "waiting";
    //    var state = [
    //        [0,0,0,0,0,0,0,0],
    //        [0,0,0,0,0,0,0,0],
    //        [0,0,0,0,0,0,0,0],
    //        [0,0,0,0,0,0,0,0],
    //        [0,0,0,0,0,0,0,0],
    //        [0,0,0,0,0,0,0,0],
    //        [0,0,0,0,0,0,0,0],
    //        [0,0,0,0,0,0,0,0]
    //    ];
    //    var rc = [0][0];  //this is the current move in row col array form
    //    var currId = 0;
    //    $('.move-cell').click(player1);
    //
    //$state = array_fill(0,2000,0);
    var status = "waiting";
    var gamesize = 144;
    var directions = {up:-12,down:12,left:-1,right:1};
    var tickTime = 500;
    var state = Array(gamesize).fill(0);
    var direction = "right";
    var nextDirection = "right";
    var head = 18;
    var length = 5;
    var food = 22;
    //initialize snake
    state[14] = 1;
    state[15] = 2;
    state[16] = 3;
    state[17] = 4;
    state[18] = 5;
    state[22] = -1;
    createCanvas();
    drawCanvas();
    $(document).keydown(function(e){userInput(e.which)});
    $('.control').click(function(){
        userInput($(this).attr('dir'));
    })
    function createCanvas(){
        for(let i=0;i<gamesize;i++){
            var h = "<div class='pixel' id='" + i + "'></div>";
            $('#canvas').append(h);
        }
    }    
    function drawCanvas(){
        for(let i=0;i<gamesize;i++){
            if(state[i]>0){
                $('#'+i).css('background-color',"black");
            }
            if(state[i]==-1){
                $('#'+i).css('background-color',"red");
            }
            if(state[i]==0){
                $('#'+i).css('background-color',"white");
            }
        }
    }
    function tick(){
        let over = false;
        //directions
        direction = nextDirection;
        let nextIndex = head+directions[direction];
        //CHECK FOR GAME OVER
        over = checkGameOver(nextIndex);
        //EAT FOOD
        if(state[nextIndex]==-1){
            length = length+1;
            placeFood();
        }else{
            //remove tail if not eating/growing
            //where 1, set to 0 and subtract 1 from any > 1
            for(let i=0;i<gamesize;i++){
                if(state[i]==1){state[i]=0;}
                if(state[i]>1){state[i]=state[i]-1;}
            }
        }
        //add new head
        state[nextIndex]=length;
        head = nextIndex;
        drawCanvas();




        if(over){
            gameOver();
            return;
        }
        setTimeout(tick,tickTime);
    }
    function placeFood(){
        var foundEmpty = false;
        let stop = 333;
        let i=0;
        while (!foundEmpty && i<stop){
            let i = Math.floor(Math.random()*(gamesize-1));
            if(state[i]==0){
                state[i]=-1;
                foundEmpty=true;
            }
            i++;
        }
    }
    function userInput(key){
        if (status=="playing"){
            if (key==37 && direction != "right"){
                nextDirection = "left"
            }
            if (key==38 && direction != "down"){
                nextDirection = "up"
            }
            if (key==39 && direction != "left"){
                nextDirection = "right"
            }
            if (key==40 && direction != "up"){
                nextDirection = "down"
            }
        } else if (status=="waiting"){
            if (key==39){
                status="playing";
                tick();
                $('#gametext').html("Eat the food. Don't touch yourself or the side!")
            }
        }
    }
    function checkGameOver(nextIndex){
        if(nextIndex < 0 || nextIndex > gamesize || state[nextIndex]>0){
            //hit top, bottom, or self
            return true;
        }
        if(head%directions.up==directions.down-1 && nextIndex%directions.down==0){
            //hit right side
            return true;
        }
        if(head%directions.up==0 && nextIndex%directions.down==directions.down-1){
            //hit left side
            return true;
        }

    }
    function gameOver(){
        $('#gametext').html("GAME OVER!")
    }
});