import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classnames from 'classnames'
import ImageLoader from 'react-imageloader';
import FlipMove from 'react-flip-move';

import '../../styles/TrackList.css'

class TracksList extends Component {
  state = {
    loadingIndex: 0,
  }

  getTracksList = () => {
    const { player, tracks } = this.props
    const { loadingIndex } = this.state
    const sortedList = _.concat(tracks.list.slice(player.index, tracks.list.length), tracks.list.slice(0, player.index))
    const offsetList = _.concat(sortedList.slice(sortedList.length - 1, sortedList), sortedList.slice(0, sortedList.length - 1))
    return tracks.list.length ?
      offsetList.map((d, i) => (
        <ImageLoader
          className={classnames('TrackList-item', {
            'first': i === 0,
          })}
          key={d.id}
          onLoad={() => this.setState({ loadingIndex: loadingIndex + 1 })}
          src={loadingIndex >= i ? d.artwork_url.replace('large', 't500x500') : ''}
          style={{ backgroundImage: loadingIndex >= i ? `url(${d.artwork_url.replace('large', 't500x500')})` : ''}}
          wrapper={React.DOM.div}
        />
      ))
    :
      []
  }
  render() {
    return (
        <FlipMove
          className="TrackList is-fadeIn"
          duration={300}
          easing="ease-in-out"
          maintainContainerHeight
        >
          {this.getTracksList()}
        </FlipMove>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(TracksList);
