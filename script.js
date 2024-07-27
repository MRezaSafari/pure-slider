document.addEventListener("DOMContentLoaded", function () {
  Slider.init({
    index: 0,
    slides: document.querySelectorAll(".slide"),
    container: document.querySelector(".slider__container"),
    dotsContainer: document.querySelector(".dots__container"),
    prevButton: document.querySelector(".arrow--prev"),
    nextButton: document.querySelector(".arrow--next"),
    infiniteLoop: true, 
    autoSlide: true,    
    autoSlideInterval: 4000, 
  });
});
