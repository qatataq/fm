import _ from 'lodash'
import 'whatwg-fetch'

const SC_CLIENT_ID = 'b8198f1a65c0235a26607a834bcc3062'
const SC_PLAYLIST_ID = '219590548'
const SC_PLAYLIST_SECRET_TOKEN = 's-suaqL'

const requestTracks = payload => ({
  type: 'REQUEST_TRACKS',
  payload,
})

const receiveErrorTracks = payload => ({
  type: 'TRACKS_ERROR',
  payload,
})

const receiveTracks = payload => ({
  type: 'RECEIVE_TRACKS',
  payload,
})

export const fetchTracks = () =>
  dispatch => {
    dispatch(requestTracks('requesting'))
    return fetch(`https://api.soundcloud.com/playlists/${SC_PLAYLIST_ID}.json?client_id=${SC_CLIENT_ID}&secret_token=${SC_PLAYLIST_SECRET_TOKEN}`)
      .then(response => response.json())
      .then(({ tracks }) => {
        const newTracks = tracks.map(track =>
          track.artwork_url ?
            _.extend({}, track, { stream_url: `${track.stream_url.split('?secret_token')[0]}?client_id=${SC_CLIENT_ID}` })
          :
           null
        )
        dispatch(receiveTracks(_.chain(newTracks).compact().shuffle().value()))
      })
      .catch(error => dispatch(receiveErrorTracks(error)))
  }
