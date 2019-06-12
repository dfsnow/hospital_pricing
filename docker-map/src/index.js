import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
require('dotenv').config()

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

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
    console.log(process.env.REACT_APP_MAPBOX_TOKEN);
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10?optimize=true',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    //map.on('load', async () => {
      //map.addSource('greenspace_tiles', {
        //type: 'vector',
        //url: 'mapbox://kyliepace.cjv9ipamn0l8l2xoecwrwier2-6lbjl'
      //});

      //map.addLayer({
        //id: 'greenspaces',
        //type: 'fill',
        //source: 'greenspace_tiles',
        //'source-layer': 'bath-greenspaces',
        //paint: {
          //"fill-color": "#888888",
          //"fill-outline-color": "black",
          //"fill-opacity": 0.7
        //}
      //});
    //});


    //map.on('click', 'greenspaces', async e => {
      //// send e.lngLat to server
      //this.state.crime = {}
      //const crime = await axios.get(`${process.env.REACT_APP_API_URL}/api/crime`, {
        //params: {
          //point: e.lngLat
        //}
      //});

      //console.log(crime.data)

      //const features = crime.data.map(datum => {
        //const cat = datum.category;
        //if (!this.state.crimes[cat]){
          //this.state.crimes[cat] = 1;
        //}
        //else {
          //this.state.crimes[cat] ++
        //}
        //return {
          //type: 'Feature',
          //properties: {
            //category: cat,
            //title: 'crime point',
            //icon: 'point'
          //},
          //geometry: datum.point
        //}
      //});

      //this.setState({crimes: this.state.crimes})

      //var mapLayer = map.getLayer('crime-points');
      //if (mapLayer){
        //map.getSource('crime-points').setData({
          //type: 'FeatureCollection',
          //features: features
        //});
      //}
      //else {
        //map.addSource('crime-points', {
          //type: 'geojson',
          //data: {
            //type: 'Feature',
            //features: features
          //}
        //});

        //map.addLayer({
          //id: 'crime-points',
          //type: 'circle',
          //source: 'crime-points',
          //paint: {
            //"circle-radius": 6,
            //"circle-color": "#B42222"
          //}
        //});
      //}

/*      console.log(this.state.crimes)*/
    /*});*/
  };

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className='inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold'>
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div id='map' ref={el => this.mapContainer = el} className='absolute top right left bottom' />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
