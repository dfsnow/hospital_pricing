[blog post](https://kyliepace.github.io/2019/postgis-node-mapbox/)



## Map
map with Bath greenspaces loaded over mapbox tileset

based on [react-mapbox-examples](https://github.com/mapbox/mapbox-react-examples)

click on a park to get data on 20 nearest crime reports

## Running locally
`npm run start`


## to do:

add those 20 nearest reports to the map

divide map into ~16 squares and generate a crime index per square based on crime reports, pass to client on load and use that data to change greenparks' fill color accordingly.

move mouse and see 10 nearest crimes and see graph breaking down the different crime categories