$(document).ready(readyFunction);

function readyFunction( jQuery ){
  console.log('document ready');
  //get menu
  $.ajax({url:"menu.html",success:loadMenu})
  //get footer
  console.log('footer')
  $.ajax({url:"footer.html",success:loadFooter})
  fadeInWord("Mark Fergason's GitHub Pages","#h1title");
  $('#linkMenu').click(function(){$('#mySidebar').show();})
}

function loadMenu(r){
  $('body').prepend(r);
  //highlight current page on menu
  var url = $(location).attr('href');
  var urlparts = url.split("/");
  var page = urlparts[urlparts.length-1];
  var pageparts = page.split(".");
  $('#'+pageparts[0]).addClass('w3-text-teal');
}

function loadFooter(r){
  console.log('footer')
  $('.w3-main').append(r);
  console.log('footer')
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