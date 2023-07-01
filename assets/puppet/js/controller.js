import { camelCase, $ } from './utils';

class Controller {
  constructor(element, slidersContainer, modesContainer) {
    this.graphContainer;
    this.slidersContainer;
    this.modesContainer;
    this.mode;
    this.modes = [];
    this.lastPartChanged = '';
    this.sliders = {};
    this.state = true;
    this.changing = false;
    this.rotateValue = 0;
    this.translateValue = 0;
    this.listeners = [];
    this.init(element, slidersContainer, modesContainer);
  }

  init(
    element,
    slidersContainer = '.controller__sliders',
    modesContainer = '.controller__modes'
  ) {
    this.graphContainer = $(element);
    this.slidersContainer = $(slidersContainer);
    this.modesContainer = $(modesContainer);

    this.mode = new Proxy(
      { current: '', previous: '' },
      {
        get: (target, key) => {
          return target[key];
        },
        set: (target, key, value) => {
          target[key] = value;
          if (key === 'current') {
            this.graphContainer.className.baseVal = value;
          }
          return true;
        },
      }
    );
  }

  disable() {
    this.state = false;
  }

  enable() {
    this.state = true;
  }

  addEventListener(name, callback) {
    this.listeners.push({
      name,
      callback,
    });
  }

  updateSlidersArray(name) {
    this.sliders[camelCase(name)] = $(`.range-slider__input[name="${name}"]`);
  }

  newModeButton(mode, icon) {
    let button = `<a class="mode__button ${mode}">
            ${icon}
        </a>`;
    this.modesContainer.insertAdjacentHTML('beforeend', button);
    document
      .querySelector(`.mode__button.${mode}`)
      .addEventListener('click', () => this.clickModeButton(mode));
    this.modes.push(mode);
  }

  newSlider({
    part,
    origin = '50% 50%',
    rotate = 'clockwise',
    degree = 90,
    direction = 'Y',
    distance = 0,
    min = 0,
    max = 10,
  }) {
    this.slidersContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="range-slider">
        <input class="range-slider__input" type="range" name="${part}" min="${min}" max="${max}" value="0">
        <span class="range-slider__value"></span>
      </div>`
    );
    this.updateSlidersArray(part);
    // get element and its slider
    const partElement = document.getElementById(part);
    const partSlider = document.getElementsByName(part)[0];
    const partSliderValue = partSlider.parentNode.querySelector(
      '.range-slider__value'
    );

    // set element transform origin
    partElement.style.transformOrigin = origin;
    partSliderValue.innerHTML = partSlider.value;

    // add listener to the element controller
    partSlider.addEventListener('input', () => {
      // check if the controller is enabled
      if (!this.state) return;

      // set flag that the slider is changed
      this.changing = true;
      this.lastPartChanged = camelCase(part);

      // calculate transforms values
      this.rotateValue =
        ((rotate == 'clockwise' ? 1 : -1) * partSlider.value * degree) /
        partSlider.max;
      this.translateValue = (partSlider.value * distance) / partSlider.max;

      // update slider value
      partSliderValue.innerHTML = partSlider.value;

      // apply transforms to element
      partElement.style.transform = `rotate(${
        this.rotateValue
      }deg) translate${direction.toUpperCase()}(${this.translateValue}px)`;
      this.changing = false;
      this.listeners
        .filter(e => e.name === 'sliderChanged')
        .forEach(l => {
          l.callback(this.lastPartChanged);
        });
    });
  }

  morph(object, shape) {
    object = $(object);
    shape = $(shape).getAttribute('d');
    document.getElementById('mouth').setAttribute('d', shape);
  }

  changeMode(mode, reset = true) {
    if (!reset && this.mode.current != '') {
      this.mode.previous = this.mode.current;
    } else {
      this.mode.previous = mode;
    }
    this.mode.current = mode;
    this.listeners
      .filter(e => e.name === 'modeChanged')
      .forEach(l => {
        l.callback(this.mode.current, this.mode.previous);
      });
  }

  clickModeButton(mode) {
    if (this.currentMode != mode && this.state) {
      let modeButtons = Array.from(document.querySelectorAll('.mode__button'));
      modeButtons.forEach(modeButton => modeButton.classList.remove('active'));
      $(`.mode__button.${mode}`).classList.add('active');
      this.changeMode(mode);
    }
  }

  changeSlider(part, newValue) {
    part.value = newValue;
    part.dispatchEvent(new Event('input'));
    part.dispatchEvent(new Event('change'));
  }

  random() {
    Object.keys(this.sliders).forEach(key => {
      let slider = this.sliders[key];
      this.changeSlider(
        slider,
        Math.random() * slider.max + Math.random() * slider.min
      );
    });

    setTimeout(() => {
      this.changing = false;
    }, 500);
  }

  reset() {
    Object.keys(this.sliders).forEach(key => {
      let slider = this.sliders[key];
      this.changeSlider(slider, 0);
    });

    setTimeout(() => {
      this.changing = false;
    }, 500);
  }
}

export default Controller;
