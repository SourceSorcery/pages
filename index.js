$(document).ready(readyFunction);

function readyFunction( jQuery ){
  console.log('document ready');
  $('#p1').html('I was modified by jquery!');
  fadeInWord("Mark Fergason's GitHub Pages","#h1title");
}

function fadeInWord(word, wrapperElementSelector){
  for (let i=0;i<word.length;i++){
    let letterid = "word" + i;
    let app = "<span id='" + letterid + "' style='opacity:0;'>" + word[i] + "</span>";
    setTimeout(function(){appendLetter(app,letterid,wrapperElementSelector)},i*50);
  }
}

function appendLetter(html, idToAnimate, wrapper){
  $(wrapper).append(html);
  var thisid = "#" + idToAnimate;
  $(thisid).fadeTo(500,1);
}