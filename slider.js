let Slider = (function () {
  let _config = {
    index: 0,
    slides: [],
    container: null,
    dotsContainer: null,
    prevButton: null,
    nextButton: null,
    infiniteLoop: false,
    autoSlide: false,
    autoSlideInterval: 5000,
  };

  let autoSlideIntervalId;

  function _generateDots() {
    const length = _config.slides.length;
    _config.dotsContainer.innerHTML = "";
    for (let i = 0; i < length; i++) {
      const li = document.createElement("li");
      li.dataset.index = i;
      li.addEventListener("click", () => moveTo(i));
      _config.dotsContainer.appendChild(li);
    }
  }

  function getCurrentIndex() {
    return _config.index;
  }

  function init(config) {
    if (config) {
      _config = Object.assign(_config, config);
    }

    _generateDots();
    _updateDots();
    _updateSlidesPosition();
    _attachEvents();

    if (_config.autoSlide) {
      _startAutoSlide();
    }
  }

  function moveTo(index) {
    if (_config.infiniteLoop) {
      if (index < 0) {
        index = _config.slides.length - 1;
      } else if (index >= _config.slides.length) {
        index = 0;
      }
    } else {
      if (index < 0 || index >= _config.slides.length) {
        return;
      }
    }

    _config.index = index;
    _updateSlidesPosition();
    _updateDots();
  }

  function _updateDots() {
    const dots = _config.dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("active", i === _config.index);
    }
  }

  function _updateSlidesPosition() {
    const offset = -_config.index * 100;
    _config.container.querySelector(
      ".slides"
    ).style.transform = `translateX(${offset}%)`;
  }

  function _attachEvents() {
    const prevButton = _config.prevButton;
    const nextButton = _config.nextButton;
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      moveTo(_config.index - 1);
      if (_config.autoSlide) {
        _resetAutoSlide();
      }
    });
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      moveTo(_config.index + 1);
      if (_config.autoSlide) {
        _resetAutoSlide();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        if (_config.index > 0 || _config.infiniteLoop) {
          moveTo(_config.index - 1);
        }
        if (_config.autoSlide) {
          _resetAutoSlide();
        }
      } else if (e.key === "ArrowRight") {
        if (_config.index < _config.slides.length - 1 || _config.infiniteLoop) {
          moveTo(_config.index + 1);
        }
        if (_config.autoSlide) {
          _resetAutoSlide();
        }
      }
    });
  }

  function _startAutoSlide() {
    autoSlideIntervalId = setInterval(() => {
      moveTo(_config.index + 1);
    }, _config.autoSlideInterval);
  }

  function _stopAutoSlide() {
    clearInterval(autoSlideIntervalId);
  }

  function _resetAutoSlide() {
    _stopAutoSlide();
    _startAutoSlide();
  }

  return {
    init: init,
    moveTo: moveTo,
    getCurrentIndex: getCurrentIndex,
    config: _config,
  };
})();

window.Slider = Slider;
