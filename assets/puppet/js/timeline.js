import timelineButtons from './templates/timelineButtons';
import timelineFrame from './templates/timelineFrame';

class Timeline {
  constructor(controller, container, trackers) {
    this.controller;
    this.draggable;
    this.timelineValues = [];
    this.time = 0;
    this.trackers = [];
    this.timelineAnimation = '';
    this.init(controller, container, trackers);
  }

  init(controller, container, trackers) {
    this.controller = controller;
    this.trackers = trackers;

    document
      .querySelector(container)
      .insertAdjacentHTML('beforeend', timelineButtons);
    document
      .querySelector('.timeline__play')
      .addEventListener('click', () =>
        this.playPause(document.querySelector('.timeline__play'))
      );
    document
      .querySelector('.timeline__record')
      .addEventListener('click', () => this.recordFrame());
    document
      .querySelector('.timeline__keyframe')
      .addEventListener('click', () => this.addFrame());
  }

  updateTime(t) {
    this.time = t;
  }

  updateFrames() {
    this.frames = Array.from(document.querySelectorAll('.timeline__frame'));
    this.frames.forEach((frame, index) => {
      frame.addEventListener('click', () => this.cursorPositioning(index));
    });
  }

  recordFrame() {
    let keyFrame = {};

    this.trackers.forEach(tracker => {
      Object.keys(tracker).forEach(key => {
        if (tracker[key].value === undefined) {
          keyFrame[key] = tracker[key];
        } else {
          keyFrame[key] = tracker[key].value;
        }
      });
    });

    this.timelineValues[this.time] = keyFrame;
  }

  playFrame() {
    if (this.timelineValues[this.time] != undefined) {
      this.trackers.forEach(tracker => {
        Object.keys(tracker).forEach(key => {
          if (tracker[key].value === undefined) {
            tracker[key] = this.timelineValues[this.time][key];
          } else {
            tracker[key].value = this.timelineValues[this.time][key];
            tracker[key].dispatchEvent(new Event('input'));
            tracker[key].dispatchEvent(new Event('change'));
          }
        });
      });
    }
  }

  playTimeline() {
    this.timelineAnimation = setInterval(() => {
      if (this.time == this.frames.length - 1) {
        this.cursorPositioning(0);
      } else {
        this.cursorPositioning(this.time + 1);
      }
    }, 1000);
  }

  pauseTimeline() {
    clearInterval(this.timelineAnimation);
  }

  playPause(button) {
    if (button.classList.contains('play')) {
      button.classList.remove('play');
      button.classList.add('pause');
      this.playTimeline();
    } else if (button.classList.contains('pause')) {
      button.classList.remove('pause');
      button.classList.add('play');
      this.pauseTimeline();
    }
  }

  addFrame() {
    document
      .querySelector('.timeline__track')
      .insertAdjacentHTML('beforeend', timelineFrame);
    this.updateFrames();
    this.cursorPositioning(this.frames.length - 1);
    this.recordFrame();
  }

  cursorPositioning(index) {
    this.updateTime(index);
    this.frames.forEach(frame => frame.classList.remove('active'));
    this.frames[this.time].classList.add('active');
    this.playFrame();
  }
}

export default Timeline;
