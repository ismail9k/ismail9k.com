import Controller from './controller';
import Draggable from './draggable';
import Timeline from './timeline';

/* eslint-disable */

let timeouteId;
let lastRotateValue = 0;

export default function init() {
  const body = document.querySelector('#body');
  const head = document.querySelector('#head');
  const bag = document.querySelector('#bag-body');

  const controller = new Controller(
    '#puppet',
    '.controller__sliders',
    '.controller__modes'
  );

  addControllers(controller, body, bag);
  startHeadAnimation(controller, head);

  const draggable = new Draggable(controller, '#drag-area', {
    dragMode: '🙄',
    move() {
      // calculate shadow size
      let shadowSize = draggable.position.y * 0.0015;
      if (shadowSize > 0) {
        shadowSize = 0;
      } else if (shadowSize < -0.9) {
        shadowSize = -0.9;
      }

      shadow.setAttribute(
        'style',
        `transform: translate(${draggable.position.x}px, 0) scale(${
          shadowSize + 1
        })`
      );
    },
    release() {
      draggable.position.y = 0;
      draggable.moveElement(shadow, draggable.position.x, 0);
    },
  });

  document
    .querySelector('.controller__toggle')
    .addEventListener('click', function () {
      document.querySelector('.controller').classList.toggle('close');
      this.classList.toggle('close');
    });

  window.randomPosition = () => controller.random();
}

function startHeadAnimation(controller, head) {
  let headTransformMatrix = '';
  let headMoveValue = 1;
  setInterval(() => {
    headTransformMatrix = head.style.transform.split(' ')[0];
    if (!controller.changing) {
      head.style.transform = `${headTransformMatrix} translateY(${
        headMoveValue * (controller.currentMode == '😡' ? 4 : 1)
      }px)`;
    }
    headMoveValue = -headMoveValue;
  }, 600);
}

function addControllers(controller, body, bag) {
  ['😃', '😡', '😍', '😴'].forEach((emoji) =>
    controller.newModeButton(
      emoji,
      `<svg class="👽"><use xlink:href="#${emoji}"/></svg>`
    )
  );
  controller.clickModeButton('😃');

  const sliderConfigurations = [
    {
      part: 'head',
      origin: '512px 490px 10px',
      degree: 30,
      min: -10,
      max: 10,
    },
    {
      part: 'eyebrows-r',
      origin: '506px 304px',
      rotate: 'clockwise',
      degree: 10,
      distance: -10,
    },
    {
      part: 'eyebrows-l',
      origin: '517px 304px',
      rotate: 'anti-clockwise',
      degree: 10,
      distance: -10,
    },
    {
      part: 'arm-r',
      origin: '457px 523px',
      rotate: 'clockwise',
    },
    {
      part: 'hand-r',
      origin: '444px 612px',
      rotate: 'clockwise',
    },
    {
      part: 'arm-l',
      origin: '569px 523px',
      rotate: 'anti-clockwise',
    },
    {
      part: 'hand-l',
      origin: '580px 612px',
      rotate: 'anti-clockwise',
    },
    {
      part: 'leg-r',
      origin: '511px 726px',
      rotate: 'clockwise',
      degree: 50,
    },
    {
      part: 'leg-l',
      origin: '513px 726px',
      rotate: 'anti-clockwise',
      degree: 50,
    },
  ];
  sliderConfigurations.forEach((config) => controller.newSlider(config));

  controller.addEventListener('sliderChanged', (part) => {
    if (part === 'legL' || part === 'legR') {
      fallingAnimation(controller, body);
    }
    if (part === 'legL') {
      bagAnimation(controller.rotateValue, bag);
    }
  });

  controller.addEventListener('modeChanged', (currentMode, previousMode) => {
    if (currentMode == '😴') {
      controller.changeSlider(controller.sliders.head, 10);
    } else if (previousMode == '😴') {
      controller.changeSlider(controller.sliders.head, 0);
    }
  });
}

function fallingAnimation(controller, body) {
  let mode;
  clearTimeout(timeouteId);
  timeouteId = setTimeout(() => {
    if (
      parseInt(controller.sliders.legR.value) +
        parseInt(controller.sliders.legL.value) >=
      15
    ) {
      mode = controller.mode.current;
      controller.disable();
      controller.mode.current = '😭';
      body.addEventListener('animationend', () => {
        setTimeout(() => {
          controller.changeMode(mode, true);
          controller.enable();
          controller.reset();
        }, 1000);
      });
    }
  }, 1000);
}

function bagAnimation(rotateValue, bag) {
  if (rotateValue < lastRotateValue) {
    bag.style.transform = `rotate(${
      rotateValue + (rotateValue - lastRotateValue) * 0.25
    }deg)`;
  } else {
    bag.style.transform = `rotate(${rotateValue}deg)`;
  }
  lastRotateValue = rotateValue;
  setTimeout(() => {
    bag.style.transform = `rotate(${rotateValue}deg)`;
  }, 400);
}
