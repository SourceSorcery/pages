$(document).ready(function(){
    console.log('snake ready');
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
    createCanvas();
    function createCanvas(){
        for(var i=0;i<2000;i++){
            var h = "<div class='pixel' id='i'></div>";
            $('#canvas').append(h);
        }
    }
});