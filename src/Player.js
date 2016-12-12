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
  canAutoplay = false;

  detectAutoplay = () => {
    const mp3 = 'data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
    const ogg = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAADqnjMlAAAAAOyyzPIBHgF2b3JiaXMAAAAAAUAfAABAHwAAQB8AAEAfAACZAU9nZ1MAAAAAAAAAAAAA6p4zJQEAAAANJGeqCj3//////////5ADdm9yYmlzLQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMTAxMTAxIChTY2hhdWZlbnVnZ2V0KQAAAAABBXZvcmJpcw9CQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBACAAAAYRqF1TCqDEEPKQ4QUY9AzoxBDDEzGHGNONKQMMogzxZAyiFssLqgQBKEhKwKAKAAAwBjEGGIMOeekZFIi55iUTkoDnaPUUcoolRRLjBmlEluJMYLOUeooZZRCjKXFjFKJscRUAABAgAMAQICFUGjIigAgCgCAMAYphZRCjCnmFHOIMeUcgwwxxiBkzinoGJNOSuWck85JiRhjzjEHlXNOSuekctBJyaQTAAAQ4AAAEGAhFBqyIgCIEwAwSJKmWZomipamiaJniqrqiaKqWp5nmp5pqqpnmqpqqqrrmqrqypbnmaZnmqrqmaaqiqbquqaquq6nqrZsuqoum65q267s+rZru77uqapsm6or66bqyrrqyrbuurbtS56nqqKquq5nqq6ruq5uq65r25pqyq6purJtuq4tu7Js664s67pmqq5suqotm64s667s2rYqy7ovuq5uq7Ks+6os+75s67ru2rrwi65r66os674qy74x27bwy7ouHJMnqqqnqq7rmarrqq5r26rr2rqmmq5suq4tm6or26os67Yry7aumaosm64r26bryrIqy77vyrJui67r66Ys67oqy8Lu6roxzLat+6Lr6roqy7qvyrKuu7ru+7JuC7umqrpuyrKvm7Ks+7auC8us27oxuq7vq7It/KosC7+u+8Iy6z5jdF1fV21ZGFbZ9n3d95Vj1nVhWW1b+V1bZ7y+bgy7bvzKrQvLstq2scy6rSyvrxvDLux8W/iVmqratum6um7Ksq/Lui60dd1XRtf1fdW2fV+VZd+3hV9pG8OwjK6r+6os68Jry8ov67qw7MIvLKttK7+r68ow27qw3L6wLL/uC8uq277v6rrStXVluX2fsSu38QsAABhwAAAIMKEMFBqyIgCIEwBAEHIOKQahYgpCCKGkEEIqFWNSMuakZM5JKaWUFEpJrWJMSuaclMwxKaGUlkopqYRSWiqlxBRKaS2l1mJKqcVQSmulpNZKSa2llGJMrcUYMSYlc05K5pyUklJrJZXWMucoZQ5K6iCklEoqraTUYuacpA46Kx2E1EoqMZWUYgupxFZKaq2kFGMrMdXUWo4hpRhLSrGVlFptMdXWWqs1YkxK5pyUzDkqJaXWSiqtZc5J6iC01DkoqaTUYiopxco5SR2ElDLIqJSUWiupxBJSia20FGMpqcXUYq4pxRZDSS2WlFosqcTWYoy1tVRTJ6XFklKMJZUYW6y5ttZqDKXEVkqLsaSUW2sx1xZjjqGkFksrsZWUWmy15dhayzW1VGNKrdYWY40x5ZRrrT2n1mJNMdXaWqy51ZZbzLXnTkprpZQWS0oxttZijTHmHEppraQUWykpxtZara3FXEMpsZXSWiypxNhirLXFVmNqrcYWW62ltVprrb3GVlsurdXcYqw9tZRrrLXmWFNtBQAADDgAAASYUAYKDVkJAEQBAADGMMYYhEYpx5yT0ijlnHNSKucghJBS5hyEEFLKnINQSkuZcxBKSSmUklJqrYVSUmqttQIAAAocAAACbNCUWByg0JCVAEAqAIDBcTRNFFXVdX1fsSxRVFXXlW3jVyxNFFVVdm1b+DVRVFXXtW3bFn5NFFVVdmXZtoWiqrqybduybgvDqKqua9uybeuorqvbuq3bui9UXVmWbVu3dR3XtnXd9nVd+Bmzbeu2buu+8CMMR9/4IeTj+3RCCAAAT3AAACqwYXWEk6KxwEJDVgIAGQAAgDFKGYUYM0gxphhjTDHGmAAAgAEHAIAAE8pAoSErAoAoAADAOeecc84555xzzjnnnHPOOeecc44xxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY0wAwE6EA8BOhIVQaMhKACAcAABACCEpKaWUUkoRU85BSSmllFKqFIOMSkoppZRSpBR1lFJKKaWUIqWgpJJSSimllElJKaWUUkoppYw6SimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaVUSimllFJKKaWUUkoppRQAYPLgAACVYOMMK0lnhaPBhYasBAByAwAAhRiDEEJpraRUUkolVc5BKCWUlEpKKZWUUqqYgxBKKqmlklJKKbXSQSihlFBKKSWUUkooJYQQSgmhlFRCK6mEUkoHoYQSQimhhFRKKSWUzkEoIYUOQkmllNRCSB10VFIpIZVSSiklpZQ6CKGUklJLLZVSWkqpdBJSKamV1FJqqbWSUgmhpFZKSSWl0lpJJbUSSkklpZRSSymFVFJJJYSSUioltZZaSqm11lJIqZWUUkqppdRSSiWlkEpKqZSSUmollZRSaiGVlEpJKaTUSimlpFRCSamlUlpKLbWUSkmptFRSSaWUlEpJKaVSSksppRJKSqmllFpJKYWSUkoplZJSSyW1VEoKJaWUUkmptJRSSymVklIBAEAHDgAAAUZUWoidZlx5BI4oZJiAAgAAQABAgAkgMEBQMApBgDACAQAAAADAAAAfAABHARAR0ZzBAUKCwgJDg8MDAAAAAAAAAAAAAACAT2dnUwAEAAAAAAAAAADqnjMlAgAAADzQPmcBAQA=';

    try {
        const audio = new Audio();
        const src = audio.canPlayType('audio/ogg') ? ogg : mp3;
        audio.autoplay = true;
        audio.volume = 0;
        audio.onplay =  () => {
            this.canAutoplay = true;
        };
        audio.src = src;
    } catch(e) {
        console.error('the navigator can not autoplay');
    }
  }

  /**
   * The player position will change if window is resized
   */
  componentDidMount() {
    this.detectAutoplay();
    window.addEventListener("resize", this.setPlayerAppearance);
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
      top: window.innerWidth > 768 ? '18%' : '0',
      opacity: 1,
    };
    const parameters = {
      duration: 1000,
      easing: [.58,1.6,.57,.87],
      delay: isNaN(delay) ? 0 : delay,
  };
    Velocity( this.player, 'stop', true);
    Velocity(this.player, properties, parameters);
  }

  /**
   * When the track is loaded start fading the volume
   */
  loadedTrack = () => {
    if(!this.canAutoplay) {
        this.audio.paused = true;
    }
    this.audio.volume= 0;
    this.fadeInVolume();
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
                <audio ref={audio => this.audio = audio} autoPlay onLoadedData={index === 0 && (this.loadedTrack)} onEnded={this.nextTrack}>
                  <source src={`${tracks[index].stream_url}?client_id=${apiConfig.client_id}`} />
                </audio>
            )}
          </div>
      </div>
    );
  }
}

export default Player;
