import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from './Content'
import States from './States'
import Footer from './Footer'
import { fetchTracks } from '../actions/tracksActions'
import '../styles/App.css'

class App extends Component {
  /**
   * When the component will mount, fetch the tracks of the playlist
   */
  componentWillMount() {
    this.props.fetchTracks()
  }

  render() {
    return (
      <div className="app">
        <States />
        <Content />
        <Footer />
      </div>
    )
  }
}

const stateToProps = () => ({})

const dispatchToProps = (dispatch) => ({
  fetchTracks: () => dispatch(fetchTracks()),
})

export default connect(stateToProps, dispatchToProps)(App)
