console.log('testing js');

$(document).ready(readyFunction);

function readyFunction( jQuery ){
  console.log('document ready');
  $('#p1').html('I was modified by jquery!');
  //animateH1();
  fadeInWord("Hello World!","#h1title");
}

function animateH1(){
 $('#h1ani').fadeTo(1000,1);
}


function fadeInWord(word, wrapperElementSelector){
  var len = word.length;
  for (i=0;i<len;i++){
    var id = "word" + i;
    app = "<span id='" + id + "' style='opacity:0;'>" + word[i] + "</span>";
    setTimeout(function(){appendLetter(app,id)},i*100);
  }
}

function appendLetter(html, idToAnimate){
  $(wrapperElementSelector).append(html);
  var thisid = "#" + idToAnimate;
  $(thisid).fadtTo(1000,1);
}