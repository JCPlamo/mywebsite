//Typewriter effecting for header
var i = 0;
var speed = 100;    //The higher, the slower

function typeWriter(txt) {
    if (i < txt.length) {
      // Display text and cursor at the end
      document.getElementById("header").innerHTML = txt.substring(0, i + 1) + '<span class="cursor"></span>';
      i++;
      setTimeout(function() {
        typeWriter(txt);  // Continue typing
      }, speed);
    } else {
      // Once typing is complete, keep the cursor visible
      document.getElementById("header").innerHTML = txt + '<span class="cursor"></span>';
    }
  }


typeWriter('Justin Plamo');