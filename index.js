var leftItem = document.getElementById('coding'),
    rightItem = document.getElementById('python');

;(function(){

  var throttle = function(type, name, obj){
    var obj = obj || window;
    var running = false;
    var func = function(){
      if (running){ return; }
      running = true;
      requestAnimationFrame(function(){
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("scroll", "optimizedScroll");
})();

window.addEventListener("optimizedScroll", function(){

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  let coding = document.getElementById("coding");
  let python = document.getElementById("python");

  let codingY = getOffset(coding).top - coding.offsetHeight - 200;
  let pythonY = getOffset(python).top - python.offsetHeight;
  // let codingX = getOffset(coding).left;

  if (window.pageYOffset >= codingY && window.pageYOffset <= pythonY) {
    coding.classList.remove("slide-out-left");
    coding.classList.add("right-slide");
    coding.style.visibility = "visible";
    python.classList.remove("slide-out-right");
    python.classList.add("left-slide");
    python.style.visibility = "visible";
  }

  if(window.pageYOffset >= pythonY || window.pageYOffset <= codingY) {
    coding.classList.remove("right-slide");
    coding.classList.add("slide-out-left");
    python.classList.remove("left-slide");
    python.classList.add("slide-out-right");
  }



  // let pythonY = getOffset(python).top - 550;
  //
  // if (window.pageYOffset >= pythonY) {
  //   python.classList.add("left-slide");
  //   python.style.visibility = "visible"
  // }

  // leftItem.style.transform = "translateX(-" + window.pageYOffset / 5 + "px)";
  // rightItem.style.transform = "rotate(" + window.pageYOffset + "deg)";
})
