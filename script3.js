(function () {
    "use strict";
 /** mycarousel*/

 window.onload = function () {
    let carouselitem = document.getElementById("carousel-item");

    let next = document.getElementById("next");

    let prev = document.getElementById("prev");

    // Initialize the width of the image and the position of the first image

    let imgWidth = document.body.clientWidth;

    let img = document.getElementsByClassName("img");

    for (let i = 0; i < img.length; i++) {
      img[i].style.width = imgWidth + "px";
    }

    carouselitem.style.left = -imgWidth + "px";

    carouselitem.style.height = img[0].height + "px";

    window.onresize = function () {
      // Listen to browser window size in real time

      imgWidth = document.body.clientWidth;

      for (let i = 0; i < img.length; i++) {
        img[i].style.width = imgWidth + "px";
      }

      carouselitem.style.left = -imgWidth + "px";

      //Set image container size in real time based on viewport

      carouselitem.style.height = img[0].height + "px";

      mycarousel.style.height = img[0].height + "px";
    };

    function animate(offset) {
      // The obtained style.left is a string

      let newLeft = parseFloat(carouselitem.style.left) + offset;

      if (newLeft < -imgWidth * 5) {
        carouselitem.style.left = -imgWidth + "px";
      } else if (newLeft > -imgWidth) {
        carouselitem.style.left = -imgWidth * 5 + "px";
      } else {
        carouselitem.style.left = newLeft + "px";
      }
    }

    // Setting the image to scroll in a loop

    let timer;

    function play() {
      timer = setInterval(function () {
        next.onclick();
      }, 2000);
    }

    play();

    // Image stops scrolling when mouse is over it

    let mycarousel = document.getElementById("mycarousel");

    mycarousel.style.height = img[0].height + "px";

    function stop() {
      clearInterval(timer);
    }

    mycarousel.onmouseover = stop;

    mycarousel.onmouseout = play;

    // Adding a row of dots to a rotating image

    let buttons = document
      .getElementById("buttons")
      .getElementsByTagName("span");

    let index = 1;

    function buttonsShow() {
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].className === "on") {
          buttons[i].className = "";
        }
      }

      buttons[index - 1].className = "on";
    }

    prev.onclick = function () {
      index -= 1;

      if (index < 1) {
        index = 5;
      }

      buttonsShow();

      animate(imgWidth);
    };

    next.onclick = function () {
      index += 1;

      if (index > 5) {
        index = 1;
      }

      buttonsShow();

      animate(-imgWidth);
    };

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].onclick = function () {
        let clickIndex = parseInt(this.getAttribute("index"));

        let offset = imgWidth * (index - clickIndex);

        animate(offset);

        index = clickIndex;

        buttonsShow();
      };
    }
  };
 
})();