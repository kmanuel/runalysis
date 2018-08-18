/* eslint-disable no-undef */
import React, { Component } from 'react';
import './Map.css';

const API_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

class Map extends Component {
  componentDidMount() {
    const track = this.props.track || [
      [48.22385, 16.36512],
      [48.22405, 16.36712],
      [48.22505, 16.36712],
      [48.22605, 16.36650],
      [48.22385, 16.36512],
      [48.22385, 16.36512],
    ];

    const mymap = L.map('mapid').setView([48.22385, 16.36512], 15);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: API_TOKEN,
    }).addTo(mymap);

    var polyline = L.polyline(track, {color: 'red'}).addTo(mymap);
    mymap.fitBounds(polyline.getBounds());
  }

  render() {
    return (
      <div>
        <div id="mapid"></div>
      </div>
    );
  }
}

export default Map;
