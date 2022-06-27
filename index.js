console.log('testing js');

$(document).ready(readyFunction);

function readyFunction( jQuery ){
  console.log('document ready');
  $('#p1').html('I was modified by jquery!');
  animateH1();
}

function animateH1(){
 $('#h1ani').fadeTo(1000,1);
}
