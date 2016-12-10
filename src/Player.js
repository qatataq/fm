import React, { Component, PropTypes } from 'react';

import './Player.css';

class Player extends Component {
  static propTypes = {
    apiConfig: PropTypes.object.isRequired,
    playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  /**
   * Init the state waiting for the tracks, and indicating the starting index
   */
  state = {
    tracks: [],
    index: 0,
  };

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
  };

  /**
   * Mute or unmute the audio player
   */
  toggleMute = () => {
    this.audio.volume = this.audio.volume ? 0 : 1;
  };

  /**
   * Change the current track to the next one from the playlist
   */
  nextTrack = () => {
    const state = this.state;
    this.setState({ index: (state.index + 1) % state.tracks.length });
    this.audio.pause();
    this.audio.load();
    this.audio.play();
  };

  render() {
    const { tracks, index } = this.state,
          { apiConfig } = this.props;
          console.log(tracks[index]);
    return (
      <div className="player">
        <div className="player-shadow"></div>
        <div className="player-background"></div>
        {tracks.length && (
          <div className="player-content">
            <div className="player-column">
              <div className="track-pic">
                <img src={tracks[index].artwork_url.replace('large', 't500x500')} alt="track artwork" />
              </div>
              <button type="button" className="track-play-pause" onClick={this.togglePlay}>Play/Pause</button>
              <button type="button" className="track-mute" onClick={this.toggleMute}>Mute</button>
            </div>
            <div className="player-column player-column-light">
              <div className="track-title">{tracks[index].title}</div>
              <div className="track-artist">{tracks[index].user.username}</div>
              <div className="track-label">{tracks[index].label_name}</div>
              <div className="track-skip">
                <button type="button" onClick={this.nextTrack}>Next</button>
              </div>
            </div>
            <audio ref={audio => this.audio = audio} autoPlay onEnded={this.nextTrack}>
              <source src={`${tracks[index].stream_url}?client_id=${apiConfig.client_id}`} />
            </audio>
          </div>  
        )}
      </div>
    );
  }
}

export default Player;
