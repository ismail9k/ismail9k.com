let timelineButtons = `
  <div class="timeline__container">
    <div class="timeline__track">
    </div>
  </div>
  <div class="timeline__buttons">
    <a class="timeline__play play timeline__button">
      <svg class="timeline__icon" viewBox="0 0 50 50">
        <title>timeline play</title>
        <polygon id="play" points="5,1.9 45,25 5,48.1 "/>
        <g id="pause">
          <rect x="10.4" y="4" width="11.2" height="41.9"/>
          <rect x="28.4" y="4" width="11.2" height="41.9"/>
        </g>
      </svg>
      <a class="timeline__record timeline__button">
        <svg class="timeline__icon" viewBox="0 0 50 50">
          <title>timeline record</title>
          <circle cx="25" cy="25" r="20"/>
        </svg>
      </a>
      <a class="timeline__keyframe timeline__button">
        <svg class="timeline__icon" viewBox="0 0 50 50">
          <title>timeline keyframe</title>
          <rect y="21.5" width="50" height="7"/>
          <rect x="21.5" y="0" width="7" height="50"/>
        </svg>
      </a>
    </a>
  </div>`;

export default timelineButtons;
