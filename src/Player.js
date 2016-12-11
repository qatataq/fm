import React, { Component, PropTypes } from 'react';
import Velocity from 'velocity-animate';

import { Play, Mute } from './Icons';
import './Player.css';

class Player extends Component {
  static propTypes = {
    apiConfig: PropTypes.object.isRequired,
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

  /**
   * When the component has updated trigger an apparition animation,
   * and start fading in the audio volume
   */
  componentDidUpdate() {
    this.audio.volume= 0;
    Velocity(this.player,
             {
               top: '18%',
               opacity: 1
             },
             {
               duration: 1000,
               easing: [.58,1.6,.57,.87],
               delay: 1000
           }).then(this.fadeInVolume);
  }

  /**
   * While the sound is inferior to 1 keep incrementing it
   */
  fadeInVolume = () => {
      if(this.audio.volume < 1) {
          this.audio.volume = (this.audio.volume + .01).toFixed(2);
          setTimeout(this.fadeInVolume, 10);
      }
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
    Velocity( element, {translateX:"8px"}, animParams);
    Velocity( element, 'reverse', animParams)
        .then(() => { Velocity( element, 'stop', true); });
  };

  render() {
    const { tracks, index } = this.state,
          { apiConfig } = this.props;
    return (
      <div className='player' ref={player => this.player = player}>
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
                <audio ref={audio => this.audio = audio} autoPlay onEnded={this.nextTrack}>
                  <source src={`${tracks[index].stream_url}?client_id=${apiConfig.client_id}`} />
                </audio>
            )}
          </div>
      </div>
    );
  }
}

export default Player;
