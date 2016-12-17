import React, { Component, PropTypes } from 'react'

import '../styles/Timer.css'

const TICK_DURATION = 250 //ms
const msTs = (ms) => (
  Math.floor(ms/1000)
)

class Timer extends Component {
  static PropTypes = {
    duration: PropTypes.number.isRequired,
    isPlayed: PropTypes.bool.isRequired,
    isSwitchingTrack: PropTypes.bool.isRequired,
  }

  length = 0
  timerRef = 0
  state = {
    elapsed: 0,
  }

  /**
   * Set up the timer
   */
  constructor(props) {
    super(props)
    this.updateTimer(props)
  }

  /**
   * After mounting get the length of the circle
   */
  componentDidMount() {
    this.length = this.getCircleLength()
  }

  /**
   * When receiving new props update the timer
   */
  componentWillReceiveProps(nextProps) {
    this.updateTimer(nextProps)
  }

  /**
   * Launch the timer if playing, pause timer if paused, reset timer if a new track is played
   * @param  {object} props [description]
   */
  updateTimer = (props) => {
    if(props.duration && this.props.duration !== msTs(props.duration)) {
      clearInterval(this.timerRef)
    }
    if(props.isPlayed) {
      this.timerRef = setInterval(this.tick, TICK_DURATION)
    } else {
      clearInterval(this.timerRef)
    }
    if(props.isSwitchingTrack) {
      this.resetTimer()
    }
  }

  /**
   * Reset the timer, launch it if still playing
   */
  resetTimer = () => {
    clearInterval(this.timerRef)
    this.setState({ elapsed: 0 })
    if(this.props.isPlayed) {
      this.timerRef = setInterval(this.tick, TICK_DURATION)
    }
  }

  /**
   * Get the circle stroke length
   * @return {number}
   */
  getCircleLength = () => (
    Math.ceil(this.refs.circleRef.r.baseVal.value * 2 * Math.PI)
  )

  /**
   * Update the timer of a tick depending on the
   */
  tick = () => {
    if(Math.floor(this.state.elapsed) >= this.props.duration) {
      this.setState({ elapsed: 0 })
    } else {
      this.setState({ elapsed: this.state.elapsed + TICK_DURATION })
    }
  }

  /**
   * translate the elapsed time for the timer text
   * @param  {number} elapsed the elapsed time of the timer in ms
   * @return {string}         the elapsed time 'm:ss'
   */
  elapsedToString = (elapsed) => {
    const m = msTs(elapsed) >= 60 ? Math.floor(msTs(elapsed) / 60 ) : 0
    const s = msTs(elapsed) % 60
    return `${m}:${s >= 10 ? s : `0${s}`}`
  }

  /**
   * translate the elapsed time for the progress circle
   * @param  {number} elapsed the elapsed time of the timer in ms
   * @return {number}         the elapsed time in % relative to the circle length
   */
  elapsedToOffset = (elapsed) => {
    const progressPercentage = ((elapsed/1000) / (this.props.duration/1000)).toFixed(4)
    return this.length * progressPercentage
  }

  render() {
    const {
      elapsedToString,
      elapsedToOffset,
    } = this
    const { elapsed } = this.state

    return (
      <div className="track-timer">
        <svg
          className="timer-container"
          viewBox="0 0 146 146"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            transform="translate(1 1)"
            fill="none"
            fillRule="evenodd"
          >
            <circle
              className="timer-wholetime"
              r="72"
            />
            <circle
              ref="circleRef"
              className='timer-elapsedtime'
              r="72"
              strokeDashoffset={elapsedToOffset(elapsed)}
            />
            <text
              className="timer-text"
              x="58"
              y="76"
            >
              {elapsedToString(elapsed)}
            </text>
          </g>
        </svg>
      </div>
    )
  }
}

export default Timer
