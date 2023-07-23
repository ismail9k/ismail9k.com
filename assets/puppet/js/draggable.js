import { call, $ } from './utils';

class Draggable {
  constructor(controller, element, settings) {
    this.controller;
    this.graphContainer;
    this.element;
    this.setting;
    this.position;
    this.currentX = 0;
    this.currentY = 0;
    this.moveFunction;
    this.init(controller, element, settings);
  }

  init(
    controller,
    element,
    { dragMode = 'dragging', select, move, release } = {}
  ) {
    this.controller = controller;
    this.graphContainer = controller.graphContainer;
    this.element = $(element);
    this.element.setAttribute('style', 'transform: translate(0, 0)');
    this.settings = {
      dragMode: dragMode,
      select: select,
      move: move,
      release: release,
    };
    this.element.addEventListener('mousedown', event => this.select(event));
    this.element.addEventListener('touchstart', event => this.touch(event));
    this.position = new Proxy(
      { x: 0, y: 0 },
      {
        get: (target, key) => {
          return target[key];
        },
        set: (target, key, value) => {
          target[key] = value;
          this.moveElement(this.element, this.position.x, this.position.y);
          call(this.settings.move);

          return true;
        },
      }
    );
  }

  release() {
    this.graphContainer.removeEventListener('mousemove', this.moveFunction);
    this.graphContainer.removeEventListener('touchmove', this.moveFunction);
    this.controller.changeMode(this.controller.mode.previous, true);
    call(this.settings.release);
  }

  moveElement(element, x, y) {
    element.setAttribute('style', `transform: translate(${x}px, ${y}px)`);
  }

  move(event) {
    let xRatio = 0;
    let yRatio = 0;
    const graphContainer = this.graphContainer;
    const viewBoxVal = this.graphContainer.viewBox.baseVal;

    if (graphContainer.clientWidth > graphContainer.clientHeight) {
      yRatio = viewBoxVal.height / graphContainer.clientHeight;
      xRatio = viewBoxVal.width / graphContainer.clientHeight;
    } else {
      yRatio = viewBoxVal.height / graphContainer.clientWidth;
      xRatio = viewBoxVal.width / graphContainer.clientWidth;
    }

    if (event.type == 'touchmove') {
      let dx = event.touches[0].clientX - this.currentX;
      let dy = event.touches[0].clientY - this.currentY;

      this.position.x += dx * xRatio;
      this.position.y += dy * yRatio;

      this.currentX = event.touches[0].clientX;
      this.currentY = event.touches[0].clientY;
      return;
    }

    // mouse event
    let dx = event.clientX - this.currentX;
    let dy = event.clientY - this.currentY;

    this.position.x += dx * xRatio;
    this.position.y += dy * yRatio;

    // update the new mouse position
    this.currentX = event.clientX;
    this.currentY = event.clientY;
  }

  select(event) {
    // stop browser default function
    event.preventDefault();

    // make sure it's left mouse button
    if (event.buttons == 1) {
      // change to drag mode
      this.controller.changeMode(this.settings.dragMode, false);

      // calculate variables
      this.currentX = event.clientX;
      this.currentY = event.clientY;

      this.currentPosition();

      this.graphContainer.addEventListener(
        'mousemove',
        (this.moveFunction = event => this.move(event))
      );
      this.graphContainer.addEventListener('mouseup', () => {
        this.release();
      });
      document.addEventListener('mouseout', event => {
        if (event.toElement == null && event.relatedTarget == null) {
          this.release();
        }
      });

      call(this.settings.select);
    }
  }

  touch(event) {
    // change to drag mode
    this.controller.changeMode(this.settings.dragMode, false);

    // calculate variables
    this.currentX = event.touches[0].clientX;
    this.currentY = event.touches[0].clientY;

    this.currentPosition();

    // change character position
    this.graphContainer.addEventListener(
      'touchmove',
      (this.moveFunction = event => this.move(event))
    );
    this.graphContainer.addEventListener('touchend', () => {
      this.release();
    });

    call(this.settings.select);
  }

  currentPosition() {
    const tempPosition = this.element.style.transform.slice(10, -1).split(', ');
    this.position.x = parseFloat(tempPosition[0]);
    this.position.y = parseFloat(tempPosition[1]);
  }
}

export default Draggable;
