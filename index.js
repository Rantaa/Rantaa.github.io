var leftItem = document.getElementById('coding'),
  rightItem = document.getElementById('python'),
  tableDiv = document.getElementById("inner-table-slide");

;
(function() {

  var throttle = function(type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function() {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("scroll", "optimizedScroll");

})();

window.addEventListener("optimizedScroll", function() {

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

  if (window.pageYOffset >= codingY && window.pageYOffset <= pythonY) {
    coding.classList.remove("slide-out-left");
    coding.classList.add("right-slide");
    python.classList.remove("slide-out-right");
    python.classList.add("left-slide");
  }

  if (window.pageYOffset >= pythonY || window.pageYOffset <= codingY) {
    coding.classList.remove("right-slide");
    coding.classList.add("slide-out-left");
    python.classList.remove("left-slide");
    python.classList.add("slide-out-right");
  }

  let tableDiv = document.getElementById("inner-table-slide");
  let outerContainer = document.querySelector(".table-slide-container");
  let topBound = getOffset(outerContainer).top - outerContainer.offsetHeight - 200;
  let bottomBound = getOffset(outerContainer).top + 100;


  if ((window.pageYOffset > topBound) && (window.pageYOffset < bottomBound)) {
    tableDiv.classList.remove("up-slide");
    tableDiv.classList.add("down-slide");
  }

  if ((window.pageYOffset > bottomBound) || window.pageYOffset < topBound) {
    tableDiv.classList.remove("down-slide");
    tableDiv.classList.add("up-slide");
  }

})

const content = document.querySelector("body");

const portraitContent = content.outerHTML;

const landscapeContent = "<body><div class='top-container'><h2>Please rotate your device to portrait mode</h2></div></body>";

window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
  const portrait = e.matches;

  if (portrait) {
    content.innerHTML = portraitContent;
  } else if (screen.width < 1028){
    content.innerHTML = landscapeContent;
  }
});
