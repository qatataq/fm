import React, { Component } from 'react'
import { connect } from 'react-redux'
import Velocity from 'velocity-animate'
import _ from 'lodash'
import {
  loadTrack,
  nextTrack,
  previousTrack,
  togglePlaying,
  updateVolume,
} from '../../actions/playerActions'
import {
  PlayPause,
  Next,
  Previous,
  Sound,
} from '../Icons'
import '../../styles/Controls.css'

class Audio extends Component {

  audio = null
  isStartingMobile = navigator.userAgent
    .toLowerCase()
    .includes('mobi')

  componentDidMount() {
    const { togglePlaying } = this.props
    // If on mobile device manually set the audio as paused

    if (this.isStartingMobile) {
      togglePlaying(true)
    } else {
      window.addEventListener('keydown', _.debounce(this.resolveKeydown, 300))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loadTrack, player, tracks } = this.props

    const isFirstTrack = nextProps.tracks.list.length && !nextProps.player.track && !player.track
    const isNewTrack = nextProps.player.index !== player.index
    if (isFirstTrack || isNewTrack) {
      loadTrack(nextProps.player.index, tracks.list)
    }
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props
    if (this.isStartingMobile) {
      return
    }
    if (prevProps.player.index !== player.index && this.audio) {
      this.audio.pause()
      this.audio.load()
      this.audio.play()
    }
    if (prevProps.player.playing !== player.playing && this.audio) {
      player.playing ? this.audio.play() : this.audio.pause()
    }
    if (prevProps.player.volume !== player.volume && this.audio) {
      this.audio.volume = player.volume / 100
    }
  }

  handlePlayPause = (event) => {
    const { player, togglePlaying } = this.props
    const element = event.currentTarget
    const animAttr = { scaleX: '0.3', scaleY: '0.3', opacity: '0' }
    const animParams = { duration:200, easing: [.13,1.67,.72,2] }
    const onComplete = {
      complete: () => {
        togglePlaying(player.playing)
        Velocity(element, 'reverse', animParams)
          .then(() => {
            Velocity(element, 'stop', true)
          })
      },
    }
    if (this.isStartingMobile) {
      this.audio.play()
      this.isStartingMobile = false
    }
    Velocity(element, animAttr, _.extend(animParams, onComplete))
  }

  handleNextTrack = (direction) => (event) => {
    const {
      nextTrack,
      player,
      previousTrack,
      togglePlaying,
      tracks,
    } = this.props
    const element = event.currentTarget
    const animAttr = direction === 'next' ? { translateX: '8px' } : { translateX: '-8px' }
    const animParams = { duration:200, easing: [.13,1.67,.72,2] }

    Velocity(element, animAttr, animParams)
    Velocity(element, 'reverse', animParams)
        .then(() => {
          Velocity(element, 'stop', true)
          if (!player.playing) {
            togglePlaying(player.playing)
          }
          if (direction === 'next') {
            nextTrack(player.index, tracks.list)
          } else {
            previousTrack(player.index, tracks.list)
          }
        })
  }



  /**
   * Do actions when shortcuts are pressed :
   * - "space" togglePlay
   * - "m" toggleMute
   * - "n", "arrow key right" nextTrack
   */
  resolveKeydown = (event) => {
    const { nextTrack, togglePlaying, player, previousTrack, tracks, updateVolume } = this.props
    event.preventDefault()
    switch (event.keyCode) {
      case 32: // space
        togglePlaying(player.playing)
        break
      case 77: // m
        if (player.volume) {
          updateVolume(0)
        } else {
          updateVolume(player.prevVolume)
        }
        break
      case 78: // n
      case 39: // right-arrow
        nextTrack(player.index, tracks.list)
        break
      case 80: // p
      case 37: // left-arrow
        previousTrack(player.index, tracks.list)
        break
      default:
    }
  }

  render() {
    const { nextTrack, player, tracks, updateVolume } = this.props
    return (
      <div className="is-fadeIn">
        <div className="Controls">
          {player.track && (
            <div>
              <div className="row">
                <Previous
                  className="Controls-space"
                  onClick={this.handleNextTrack('previous')}
                />
                <PlayPause
                  className="Controls-space"
                  isPlaying={player.playing}
                  onClick={this.handlePlayPause}
                />
                <Next onClick={this.handleNextTrack('next')}/>
              </div>
              <div className="row">
                <Sound
                  className={'Controls-sound'}
                  volume={player.volume}
                  onChange={(event) => { updateVolume(event.target.value) }}
                />
              </div>
            </div>
          )}
        </div>
        {player.track && (
          <audio
            ref={audio => this.audio = audio}
            autoPlay
            onEnded={() => { nextTrack(player.index, tracks.list) }}
          >
            <source src={player.track.stream_url}/>
          </audio>
        )}
      </div>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = (dispatch) => ({
  loadTrack: (index, list) => { dispatch(loadTrack(index, list)) },
  nextTrack: (index, list) => { dispatch(nextTrack(index, list)) },
  previousTrack: (index, list) => { dispatch(previousTrack(index, list)) },
  togglePlaying: (playing) => { dispatch(togglePlaying(playing)) },
  updateVolume: (newVolume) => { dispatch(updateVolume(newVolume)) },
})

export default connect(stateToProps, dispatchToProps)(Audio);
