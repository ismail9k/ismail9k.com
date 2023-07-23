import Controller from './controller';
import Draggable from './draggable';
import Timeline from './timeline';

/* eslint-disable */

export default function init() {
  const ballon = document.querySelector('#ballon');
  const body = document.querySelector('#body');
  const head = document.querySelector('#head');
  const bag = document.querySelector('#bag-body');

  const controller = new Controller(
    '#puppet',
    '.controller__sliders',
    '.controller__modes'
  );

  const draggable = new Draggable(controller, '#drag-area', {
    dragMode: '🙄',
    move: function() {
      // calculate shadow size
      let shadowSize = draggable.position.y * 0.0015;
      if (shadowSize > 0) {
        shadowSize = 0;
      } else if (shadowSize < -0.9) {
        shadowSize = -0.9;
      }

      shadow.setAttribute(
        'style',
        `transform: translate(${draggable.position.x}px, 0) scale(${shadowSize + 1})`
      );
      if (draggable.position.x >= 0) {
        ballon.classList.remove('💫');
        draggable.moveElement(ballon, draggable.position.x, 0);
      } else {
        ballon.classList.add('💫');
        draggable.moveElement(ballon, draggable.position.x + 620, 0);
      }
    },
    release: function() {
      draggable.position.y = 0;
      draggable.moveElement(shadow, draggable.position.x, 0);
    },
  });

  new Timeline(controller, '.timeline', [
    controller.sliders,
    draggable.position,
    controller.mode,
  ]);

  controller.newModeButton('😃', '<svg class="👽"><use xlink:href="#😃"/></svg>');
  controller.newModeButton('😡', '<svg class="👽"><use xlink:href="#😡"/></svg>');
  controller.newModeButton('😍', '<svg class="👽"><use xlink:href="#😍"/></svg>');
  controller.newModeButton('😴', '<svg class="👽"><use xlink:href="#😴"/></svg>');
  controller.clickModeButton('😃');

  controller.newSlider({
    part: 'head',
    origin: '512px 490px 10px',
    degree: 30,
    min: -10,
    max: 10,
  });
  controller.newSlider({
    part: 'eyebrows-r',
    origin: '506px 304px',
    rotate: 'clockwise',
    degree: 10,
    distance: -10,
  });
  controller.newSlider({
    part: 'eyebrows-l',
    origin: '517px 304px',
    rotate: 'anti-clockwise',
    degree: 10,
    distance: -10,
  });
  controller.newSlider({
    part: 'arm-r',
    origin: '457px 523px',
    rotate: 'clockwise',
  });
  controller.newSlider({
    part: 'hand-r',
    origin: '444px 612px',
    rotate: 'clockwise',
  });
  controller.newSlider({
    part: 'arm-l',
    origin: '569px 523px',
    rotate: 'anti-clockwise',
  });
  controller.newSlider({
    part: 'hand-l',
    origin: '580px 612px',
    rotate: 'anti-clockwise',
  });
  controller.newSlider({
    part: 'leg-r',
    origin: '511px 726px',
    rotate: 'clockwise',
    degree: 50,
  });
  controller.newSlider({
    part: 'leg-l',
    origin: '513px 726px',
    rotate: 'anti-clockwise',
    degree: 50,
  });

  controller.addEventListener('sliderChanged', (part) => {
    if (part === 'legL' || part === 'legR') {
      fallingAnimation(controller);
    }
    if (part === 'legL') {
      bagAnimation(controller.rotateValue);
    }
  });

  controller.addEventListener('modeChanged', (currentMode, previousMode) => {
    if (currentMode == '😴') {
      controller.changeSlider(controller.sliders.head, 10);
    } else if (previousMode == '😴') {
      controller.changeSlider(controller.sliders.head, 0);
    }
  });

  (function ballonToggle() {
    ballonSwitch.addEventListener('change', () => {
      if (ballonSwitch.checked) {
        ballon.classList.remove('❌');
      } else {
        ballon.classList.add('❌');
      }
    });
  })();

  let lastRotateValue = 0;

  function bagAnimation(rotateValue) {
    if (rotateValue < lastRotateValue) {
      bag.style.transform = `rotate(${rotateValue +
        (rotateValue - lastRotateValue) * 0.25}deg)`;
    } else {
      bag.style.transform = `rotate(${rotateValue}deg)`;
    }
    lastRotateValue = rotateValue;
    setTimeout(() => {
      bag.style.transform = `rotate(${rotateValue}deg)`;
    }, 400);
  }

  document.querySelector('.controller__toggle').addEventListener('click', function() {
    document.querySelector('.controller').classList.toggle('close');
    this.classList.toggle('close');
  });

  window.randomPosition = () => controller.random();

  let headTransformMatrix = '';
  let headMoveValue = 1;
  (function headAnimation(controller) {
    setInterval(() => {
      headTransformMatrix = head.style.transform.split(' ')[0];
      if (!controller.changing) {
        head.style.transform = `${headTransformMatrix} translateY(${headMoveValue *
          (controller.currentMode == '😡' ? 4 : 1)}px)`;
      }
      headMoveValue = -headMoveValue;
    }, 600);
  })(controller);

  let timeouteId;

  function fallingAnimation(controller) {
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
}
