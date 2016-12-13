import React, { PropTypes } from 'react';

const Play = ({ isPlayed, ...props }) => (
  <div {...props}>
    <svg id="play_button" width="46px" height="47px" viewBox="0 0 47 46" version="1.1">
      <g stroke="none" strokeWidth="1" fillRule="evenodd" fill="#625FE2">
        <polygon id="left_play" points={isPlayed ? "8 0 8 46.0027173 16 46.0027161 16 0" : "0 0 3.1918912e-15 46.0027173 23 35 23 11"}>
          <animate
            xlinkHref="#left_play"
            attributeName="points"
            from={isPlayed ? "0 0 3.1918912e-15 46.0027173 23 35 23 11" : "8 0 8 46.0027173 16 46.0027161 16 0"}
            to={isPlayed ? "8 0 8 46.0027173 16 46.0027161 16 0" : "0 0 3.1918912e-15 46.0027173 23 35 23 11"}
            dur=".3s"
            begin="play_button.click"
            fill="freeze" />
          </polygon>
          <polygon id="right_play" points={isPlayed ? "31 0 31 46.0027173 39 46.0027161 39 0" : "23 11 23 35 47 23 47 23"}>
          <animate
            xlinkHref="#right_play"
            attributeName="points"
            from={isPlayed ? "23 11 23 35 47 23 47 23" : "31 0 31 46.0027173 39 46.0027161 39 0"}
            to={isPlayed ? "31 0 31 46.0027173 39 46.0027161 39 0" : "23 11 23 35 47 23 47 23"}
            dur=".3s"
            begin="play_button.click"
            fill="freeze" />
        </polygon>
      </g>
    </svg>
  </div>
);

Play.propTypes = {
  isPlayed: PropTypes.bool.isRequired,
};

const Mute = ({ isMuted, reference, ...props }) => (
  <div {...props} ref={reference}>
    <svg id="mute_icon" width="52" height="48" viewBox="0 0 54 48" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path d="M11.524 31.304l19.13 16.312c.84.716 1.52.41 1.52-.704V1.084c0-1.104-.68-1.42-1.52-.704L11.52 16.696H2.01c-1.122 0-2.01.895-2.01 2v10.608c0 1.108.9 2 2.01 2h9.514z" fill="#625FE2"/>
        <g stroke="#625FE2" strokeWidth="2">
          <path id="cross" d="M39 19l9.8 9.798M48.8 19L39 28.797">
          </path>
          <path id="sound" d="M45.932 34.05C49.007 31.775 51 28.12 51 24c0-4.12-1.993-7.776-5.068-10.053M40.932 30.084C42.792 28.706 44 26.494 44 24s-1.207-4.708-3.068-6.086" style={{transform: "translateX(-30px)"}}>
          </path>
        </g>
      </g>
    </svg>
  </div>
);

Mute.propTypes = {
  isMuted: PropTypes.bool.isRequired,
};

export {
  Play,
  Mute,
};
