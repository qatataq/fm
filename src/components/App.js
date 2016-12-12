import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import 'whatwg-fetch';

import Player from './Player';
import { Loader, Error } from './States';
import '../styles/App.css';

const SC_CLIENT_ID = 'b8198f1a65c0235a26607a834bcc3062';
const SC_PLAYLIST_ID = '219590548';
const SC_PLAYLIST_SECRET_TOKEN = 's-suaqL';

class App extends Component {
  /**
   * This will set the initial state of the component
   */
  state = {
    playlist: [],
    loading: true,
    error: null,
  };

  /**
   * When the component will mount, for a playlist url we fetch the tracks of this playlist
   */
  componentWillMount() {
    fetch(`https://api.soundcloud.com/playlists/${SC_PLAYLIST_ID}.json?client_id=${SC_CLIENT_ID}&secret_token=${SC_PLAYLIST_SECRET_TOKEN}`)
      .then(response => response.json())
      .then(({ tracks }) => {
        tracks.map(track => {
          track.stream_url = `${track.stream_url.split('?secret_token')[0]}?client_id=${SC_CLIENT_ID}`;
          return track;
        });
        this.setState({
          playlist: _.shuffle(tracks),
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error,
        });
      });
  }

  render() {
    return (
      <div className="app">
        <ReactCSSTransitionGroup
           transitionName="fade"
           transitionEnterTimeout={0}
           transitionLeaveTimeout={500}>
            {this.state.loading && (<Loader />)}
            {this.state.error && (<Error />)}
        </ReactCSSTransitionGroup>
        {!this.state.error && <Player playlist={this.state.playlist}/>}
        <footer>
          Project at
          <a href="https://github.com/qatataq/fm" target="_blank">GitHub</a>,
          using <span className="soundcloud-logo" />
        </footer>
      </div>
    );
  }
}

export default App;
