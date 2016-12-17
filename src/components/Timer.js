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
  }

  duration = 0
  length = 0
  timerRef = 0
  state = {
    elapsed: 0,
  }

  constructor(props) {
    super(props)
    this.updateTimer(props)
  }

  componentDidMount() {
    this.length = this.getCircleLength()
  }

  componentWillReceiveProps(nextProps) {
    this.updateTimer(nextProps)
  }

  updateTimer = (props) => {
    if(props.duration && this.duration !== msTs(props.duration)) {
      this.duration = msTs(props.duration)
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

  resetTimer = () => {
    clearInterval(this.timerRef)
    this.setState({ elapsed: 0 })
    if(this.props.isPlayed) {
      this.timerRef = setInterval(this.tick, TICK_DURATION)
    }
  }

  getCircleLength = () => (
    Math.ceil(this.refs.circleRef.r.baseVal.value * 2 * Math.PI)
  )

  tick = () => {
    if(Math.floor(this.state.elapsed) === this.duration) {
      this.setState({ elapsed: 0 })
    } else {
      this.setState({ elapsed: this.state.elapsed + TICK_DURATION })
    }
  }

  elapsedToString = (elapsed) => {
    const m = msTs(elapsed) >= 60 ? Math.floor(msTs(elapsed) / 60 ) : 0
    const s = msTs(elapsed) % 60
    return `${m}:${s >= 10 ? s : `0${s}`}`
  }

  render() {
    const { elapsedToString } = this
    const { elapsed } = this.state

    return (
      <div className="track-timer">
        <svg className="timer-container" viewBox="0 0 146 146" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(1 1)" fill="none" fillRule="evenodd">
            <circle ref="circleRef" className="timer-wholetime" r="72" />
            <circle className="timer-elapsedtime" r="72" />
            <text className="timer-text" x="58" y="76">{elapsedToString(elapsed)}</text>
          </g>
        </svg>
      </div>
    )
  }
}

export default Timer
