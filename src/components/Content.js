import React, { Component } from 'react'
import { connect } from 'react-redux'

import Audio from './Audio/Audio'
import Info from './Info'
import TracksList from './TracksList/TracksList'

import '../styles/Content.css'

class Content extends Component {
  render() {
    const { player, tracks } = this.props
    const render = player && tracks &&
      <div className='content'>
        <Audio {...this.props} />
        <Info {...this.props} />
        <TracksList {...this.props} />
      </div>

    return render
  }
}

const stateToProps = (state) => ({
  player: state.player,
  tracks: state.tracks,
})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(Content)
