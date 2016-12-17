import React, { Component, PropTypes } from 'react'

import '../styles/Timer.css'

class Timer extends Component {
  render() {
    return (
      <div className="track-timer">
        <svg width="146" height="146" viewBox="0 0 146 146" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(1 1)" fill="none" fillRule="evenodd">
            <circle stroke="#FEFCFA" strokeWidth="2" cx="72" cy="72" r="72"/>
            <path d="M113.443 130.884C131.927 117.85 144 96.336 144 72c0-39.765-32.235-72-72-72" stroke="#D8D7F7" strokeWidth="2" strokeLinecap="round"/>
            <text fontFamily="HindMadurai-Regular, Hind Madurai" fontSize="16" letterSpacing=".444" fill="#D8D7F7">
              <tspan x="58" y="76">1:08</tspan>
            </text>
          </g>
        </svg>
      </div>
    )
  }
}

export default Timer
