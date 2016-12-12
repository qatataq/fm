import React, { Component, PropTypes } from 'react';
import Velocity from 'velocity-animate';
import _ from 'lodash';

import { Play, Mute } from './Icons';
import '../styles/Player.css';

class Player extends Component {
  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  /**
   * Init the state waiting for the tracks, and indicating the starting index
   */
  audio = {};
  player = {};
  state = {
    tracks: [],
    index: 0,
  };
  ua = navigator.userAgent.toLowerCase();

  /**
   * The player position will change if window is resized
   */
  componentDidMount() {
    this.audio.paused = this.ua.indexOf('mobi') > -1;
    const setPlayerAppearanceDebounced = _.debounce(this.setPlayerAppearance, 250);
    window.addEventListener('resize', setPlayerAppearanceDebounced);
  }

  /**
   * Add the tracks from props to a new state
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.playlist) {
      this.setState({ tracks: nextProps.playlist });
    }
  }

  /**
   * When the component has updated trigger the player appearance
   */
  componentDidUpdate() {
    this.setPlayerAppearance(1000);
  }

  /**
   * Define the position and opacity of the player
   */
  setPlayerAppearance = (delay) => {
    const properties = {
      top: window.innerWidth > 768 ? '18%' : '0px',
      opacity: 1,
    };
    const parameters = {
      duration: isNaN(delay) ? 500 : 1000,
      easing: [.58,1.6,.57,.87],
      delay: isNaN(delay) ? 0 : delay,
    };
    Velocity(this.player, 'stop', true);
    Velocity(this.player, properties, parameters);
  };

  /**
   * When the track is loaded start fading the volume
   */
  loadedTrack = () => {
    this.audio.volume= 0;
    this.fadeInVolume();
  };

  /**
   * While the sound is inferior to 1 keep incrementing it
   */
  fadeInVolume = () => {
    if(this.audio.volume < 1) {
      this.audio.volume = (this.audio.volume + .01).toFixed(2);
      setTimeout(this.fadeInVolume, 10);
    }
  };

  /**
   * Play or pause the current track
   */
  togglePlay = () => {
    this.audio.paused ? this.audio.play() : this.audio.pause();
    this.forceUpdate();
  };

  /**
   * Mute or unmute the audio player
   */
  toggleMute = () => {
    this.audio.volume = this.audio.volume ? 0 : 1;
    this.forceUpdate();
  };

  /**
   * Change the current track to the next one from the playlist
   */
  nextTrack = (event) => {
    const state = this.state,
          element = event.currentTarget,
          animParams = { duration:200, easing: [.13,1.67,.72,2] };
    this.setState({ index: (state.index + 1) % state.tracks.length });
    this.audio.pause();
    this.audio.load();
    this.audio.play();
    Velocity(element, { translateX: '8px' }, animParams);
    Velocity(element, 'reverse', animParams)
        .then(() => { Velocity(element, 'stop', true); });
  };

  render() {
    const { tracks, index } = this.state;

    return (
      <div className="player" ref={player => this.player = player}>
        <div className="player-shadow"></div>
        <div className="player-background"></div>
        <div className="player-content">
          <div className="player-column">
            <div className="track-pic">
              <img
                src={tracks.length && tracks[index].artwork_url.replace('large', 't500x500')}
                alt="track artwork"
              />
            </div>
            <div className="track-buttons">
              <Play
                onClick={this.togglePlay}
                isPlayed={!this.audio.paused}
                className="track-play-button"
              />
              <Mute
                onClick={this.toggleMute}
                isMuted={this.audio.volume === 0}
                className="track-pause-button"
              />
            </div>
          </div>
          <div className="player-column player-column-light">
            <div className="track-title">
              {tracks.length && (
                <a href={ tracks[index].permalink_url } target="_blank">{tracks[index].title}</a>
              )}
            </div>
            <div className="track-artist">{ tracks.length && tracks[index].user.username}</div>
            <div className="track-label">{ tracks.length && tracks[index].label_name}</div>
            <div className="track-skip" onClick={this.nextTrack}>
              skip this track
            </div>
          </div>
          {tracks.length && (
            <audio ref={audio => this.audio = audio} autoPlay
                   onLoadedData={index === 0 && (this.loadedTrack)} onEnded={this.nextTrack}>
              <source src={tracks[index].stream_url}/>
            </audio>
          )}
        </div>
      </div>
    );
  }
}

export default Player;
