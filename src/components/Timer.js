import React, { Component, PropTypes } from 'react'

import '../styles/Timer.css'

class Timer extends Component {
  static PropTypes = {
    totalTime: PropTypes.func.isRequired,
    isPlayed: PropTypes.bool.isRequired,
  }


  componentDidMount() {
  }

  tick = () => {
    console.log('ok');
  }

  render() {
    return (
      <div className="track-timer">
        <svg className="timer-container" viewBox="0 0 146 146" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(1 1)" fill="none" fillRule="evenodd">
            <circle className="timer-wholetime" />
            <circle className="timer-elapsedtime" />
            <text className="timer-text" x="58" y="76">1:08</text>
          </g>
        </svg>
      </div>
    )
  }
}

export default Timer
