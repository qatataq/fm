import React, { Component, PropTypes } from 'react';
import Velocity from 'velocity-animate';
import _ from 'lodash';

import Timer from './Timer';
import { Play, Mute } from './Icons';
import '../styles/Player.css';

class Player extends Component {
  static propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    playlistToken: PropTypes.string.isRequired
  };

  /**
   * Init the state waiting for the tracks, and indicating the starting index
   */
  audio = {};
  player = {};
  muteButton = {};
  state = {
    index: 0,
  };

  /**
   * The player position will change if window is resized
   */
  componentDidMount() {
    this.audio.paused = navigator.userAgent.toLowerCase().includes('mobi');
  }

  /**
   * When the component has updated trigger the player appearance
   */
  componentDidUpdate() {
    this.setPlayerAppearance();
  }

  /**
   * Define the position and opacity of the player
   */
  setPlayerAppearance = () => {
    const properties = {
      top: [window.innerWidth > 768 ? '18%' : '0px', '21%'],
      opacity: [1, 0],
    };
    const parameters = {
      duration: [1000, 0],
      easing: [.58, 1.6, .57, .87],
      delay: [1000, 0],
    };
    Velocity(this.player, properties, parameters)
      .then(() => {this.player.style.top = ''});
  };

  /**
   * Return the following active track info
   */
  getTime = () => {
    console.log('ok');
    return {
      elapsed: 150,
      total: 300,
    }
  }

  /**
   * When the track is loaded start fading the volume
   */
  loadedTrack = () => {
    this.audio.volume = 0;
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
    const newVolume = this.audio.volume ? 0 : 1;
    const cross = this.muteButton.querySelector("#cross");
    const sound = this.muteButton.querySelector("#sound");
    const properties = (direction = false) => ({
      translateX: direction ? '0px' : '-30px',
    });
    const parameters = (direction = false) => ({
      duration: 300,
      easing: [.58,1.6,.57,.87],
      delay: direction ? 200 : 0,
    });
    this.audio.volume = newVolume;
    Velocity(cross, 'stop', true);
    Velocity(sound, 'stop', true);
    Velocity(cross, properties(this.audio.volume), parameters(this.audio.volume));
    Velocity(sound, properties(!this.audio.volume), parameters(!this.audio.volume));
    this.forceUpdate();
  };

  /**
   * Change the current track to the next one from the playlist
   */
  nextTrack = (event) => {
    const { index } = this.state;
    const { tracks } = this.props;
    const element = event.currentTarget;
    const animParams = { duration:200, easing: [.13,1.67,.72,2] };

    this.setState({ index: (index + 1) % tracks.length });
    this.audio.pause();
    this.audio.load();
    this.audio.play();
    Velocity(element, { translateX: '8px' }, animParams);
    Velocity(element, 'reverse', animParams)
        .then(() => { Velocity(element, 'stop', true); });
  };

  /**
   * Return the track link to Soundcloud
   */
  getTrackLink = () => {
    const { index } = this.state
    const { tracks, playlistToken } = this.props
    const link = tracks[index].permalink_url || '#'

    return link.substr(0, link.indexOf(playlistToken))
  }

  render() {
    const { index } = this.state;
    const { tracks } = this.props;
    const { getTrackLink } = this;

    return (
      <div className="player" ref={player => this.player = player}>
        <div className="player-shadow"></div>
        <div className="player-background"></div>
        <div className="player-content">
          <div className="player-column">
            <div className="track-pic">
              {tracks.length && (
                <img
                  src={tracks[index].artwork_url.replace('large', 't500x500')}
                  alt="track artwork"
                />
              )}
            </div>
            <div className="track-buttons">
              <Play
                onClick={this.togglePlay}
                isPlayed={!this.audio.paused}
                className="track-play-button"
              />
              <Mute
                reference={mute => this.muteButton = mute}
                onClick={this.toggleMute}
                isMuted={this.audio.volume === 0}
                className="track-pause-button"
              />
            </div>
          </div>
          <div className="player-column player-column-light">
            <div className="track-title">
              {tracks.length && (
                <a href={getTrackLink()} target="_blank">{tracks[index].title}</a>
              )}
            </div>
            <div className="track-artist">{tracks.length && tracks[index].user.username}</div>
            <div className="track-label">{tracks.length && tracks[index].label_name}</div>
            <Timer
              totalTime={this.getTime}
              isPlayed={!this.audio.paused}
            />
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
