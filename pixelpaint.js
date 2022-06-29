$(document).ready(function(){
    console.log('pixel paint ready');
    createCanvas();
    function createCanvas(){
        var h = "<div class='pixel'></div>";
        for(var i=0;i<2000;i++){
            $('#canvas').append(h);
        }
    }

    var selectedColor = "black";
    var painting = false;

    function paint(){
        if(painting){
            var newCSS = {"background-color": selectedColor, "border-color": selectedColor };
            $(this).css(newCSS);
        }
    }
    $('.pixel').mouseover(paint);

    function selectColor(){
            selectedColor = $(this).css("background-color");
    }
    $('.color').click(selectColor);

    function togglepainting(){
        if(painting){
            painting = false;
        }else{
            painting = true;
        }
    }
    $('.pixel').click(togglepainting);


});