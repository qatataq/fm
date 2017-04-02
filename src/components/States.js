import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import logo from '../images/logo.svg'
import error from '../images/error-qatataqfm.svg'

const Loader = () => (
  <div className="loader">
    <div className="loader-loading">
      <img src={logo} alt="qatataqfm logo" />
    </div>
  </div>
)

const Error = () => (
  <div className="error">
    <div className="error-display">
      <img src={error} alt="error illustration" />
    </div>
  </div>
)

export {
  Loader,
  Error,
}

class States extends Component {
  render() {
    const { tracks } = this.props
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={0}
        transitionLeaveTimeout={500}
      >
        {tracks.loading && (<Loader />)}
        {tracks.error && (<Error />)}
      </ReactCSSTransitionGroup>
    )
  }
}

const stateToProps = (state) => ({
  tracks: state.tracks,
})

const dispatchToProps = () => ({})

export default connect(stateToProps, dispatchToProps)(States)
