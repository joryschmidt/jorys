function getColor() {
  function rNum() {
    return Math.round(Math.random() * 255);
  }
  
  var str = "rgb(";
  for (var i=0; i<3; i++) {
    if (i == 2) {
      str = str + rNum() + ')';
    }
    else str = str + rNum() + ', ';
  }
  
  return str;
}


setTimeout(function() {
  $('.heading-letter').each(function(index, element) {
    this.style.color = getColor();
  });
}, 1000);
