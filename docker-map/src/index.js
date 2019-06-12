import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const API_URL = process.env.REACT_APP_API_URL

class Application extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: -87.619392,
      lat: 41.882702,
      zoom: 12
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10?optimize=true',
      center: [lng, lat],
      zoom
    });

    map.getCanvas().style.cursor = 'pointer';
    var cur_lon = this.state.lng;
    var cur_lat = this.state.lat;

    var queryDatabase = async function(e) {
      let searchValue = document.getElementById("searchBarInput").value;
      const hospitals = await axios.get(`${API_URL}/hospitals`, {
        params: {
          lon: e.lngLat.lng,
          lat: e.lngLat.lat,
          search: searchValue
        }
      });

      const features = hospitals.data.map(datum => {
        let feat = datum.properties
        return {
          type: 'Feature',
          properties: {
            title: feat.hospital_name,
            description: feat.description,
            price: feat.price
          },
          geometry: {
            type: 'Point',
            coordinates: [feat.lon, feat.lat]
          }
        }
      });

      document.querySelectorAll('.mapboxgl-popup').forEach(function(a) {
        a.remove()
      });

      features.forEach(function(popup) {
        // make a popup for each feature and add to the map
        new mapboxgl.Popup({closeOnClick: false})
            .setLngLat(popup.geometry.coordinates)
            .setHTML(`
                <h2>${popup.properties.title}</h2>
                <h4>Type: ${popup.properties.description}</h4>
                <h4>Price: $${popup.properties.price}</h4>`)
            .addTo(map);
      });

      cur_lon = e.lngLat.lng;
      cur_lat = e.lngLat.lat;
    };

    // Rerun query on click
    map.on('click', queryDatabase)

    // Run query on search
    document.querySelector("#searchBarForm")
      .addEventListener("submit", function(){
        var e = {"lngLat": ["lng": cur_lon, "lat": cur_lat]}
        queryDatabase(e)
      });

  };

  render() {
    return (
      <div>
        <div id='map' ref={el => this.mapContainer = el} className='absolute top right left bottom' />
      </div>
    );
  };
};

ReactDOM.render(<Application />, document.getElementById('app'));
