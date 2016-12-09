import React, { Component, PropTypes } from 'react';

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
    if(nextProps.playlist)
        this.setState({ tracks: nextProps.playlist });
  }

  /**
   * Play or pause the current track
   */
  togglePlay = () => {
    const audio = this.refs.audio;
    audio.paused ? audio.play() : audio.pause();
  };

  /**
   * Mute or unmute the audio player
   */
  toggleMute = () => {
    const audio = this.refs.audio;
    audio.volume = audio.volume ? 0 : 1;
  };

  /**
   * Change the current track to the next one from the playlist
   */
  nextTrack = () => {
    const state = this.state,
          audio = this.refs.audio;
    this.setState({ index: (state.index+1) % state.tracks.length });
    audio.pause();
    audio.load();
    audio.play();
  };

  render() {
    const { tracks, index } = this.state,
          { apiConfig } = this.props;
    return (
      <div className="player">
        <button type="button" onClick={this.togglePlay}>Play/Pause</button>
        <button type="button" onClick={this.toggleMute}>Mute</button>
        <button type="button" onClick={this.nextTrack}>Next</button>
        { tracks.length ?
          <audio ref="audio" autoPlay onEnded={this.nextTrack}>
            <source src={`${tracks[index].stream_url}?client_id=${apiConfig.client_id}`} />
          </audio> : null }
      </div>
    );
  }
}

export default Player;
