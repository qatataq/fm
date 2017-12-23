import React, { Component } from 'react'

import '../styles/Info.css'

class Info extends Component {

   /**
    * Return the track link to Soundcloud
    */
   getTrackLink = () => {
     const { player } = this.props
     const link = player.track.permalink_url || '#'

     return link.substr(0, link.indexOf('s-p1UCC'))
   }

  render() {
    const { player } = this.props
    return (
      <div className="is-fadeIn">
        {player.track &&
          <div className="Info">
            <div className="Info-title">
              <a href={this.getTrackLink()} target="_blank">{player.track.title}</a>
            </div>
            <div className="Info-artist">{player.track.user.username}</div>
            <div className="Info-label">{player.track.label_name}</div>
          </div>
        }
      </div>
    )
  }
}

export default Info
