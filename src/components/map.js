import React from "react";
import Fade from "react-reveal/Fade";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";

const mapData = {
    //India-Nepal
    kerala:{ lat: 8.9952, lng: 76.6105 },
    pokhara:{ lat: 28.2096, lng: 83.9856 },
    Mumbai : { lat: 19.0760, lng: 72.8777},
    darjeeling : { lat: 27.0410, lng: 88.2663 },
    Kathmandu : { lat: 27.7172, lng: 85.3240 },
    //USA
    cali : { lat: 37.7749, lng: -122.4194 },
    tx : { lat: 32.705002, lng: -97.1081 },
    sc : { lat: 32.4794, lng: -80.3348 },
    mi : { lat: 42.7325, lng: -84.5555 },
    nashville : { lat: 36.1627, lng: -86.7816},
    bigsky : { lat: 45.2618, lng: -111.3080 },
    crestedbutte : { lat: 38.8697146, lng: -106.9878231 },
    az : { lat: 34.483696, lng: -114.3224548 },
    ny : { lat: 43.4261809, lng: -73.7123408},
    fl : { lat: 27.6648, lng: -81.5158 },
    amarillo : { lat: 35.2220, lng: -101.8313 },
    yellowstone : { lat: 44.4280, lng: -110.5885 },
    chicago : { lat: 41.8781, lng: -87.6298 },
    //misc
    kabale : { lat: -1.2420, lng: 29.9856 },
    pr : { lat: 18.2208, lng: -66.5901 },
    belize : { lat: 17.7612, lng: -88.0277 },
    mexico : { lat: 20.6534, lng: -105.2253 },
    ontario : { lat: 51.2538 , lng : -85.3232},
    kampala : { lat: .3476, lng : 32.5825 },
  };
  
const MapComponent = compose(
  withProps({
    googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWV2xmG6s-oCD1emPq31DXgBFxgbjMT98&libraries=geometry,drawing,places",
    loadingElement: <div id="loadingElement" style={{ height: `100%`}} />,
    containerElement: <div id="containerElement" style={{ height: `500px`, width: `100%`}} />,
    mapElement: <div id="mapElement" style={{ height: `100%`, width: `80%`, margin:`auto`}} />,
  }),
  withScriptjs,
  withGoogleMap
  )(props => {
    return(
      <GoogleMap defaultZoom={2} defaultCenter={{ lat: 10, lng: 0 }}>
          <Marker position={mapData.cali}></Marker>
          <Marker position={mapData.nashville}></Marker>
          <Marker position={mapData.kerala}></Marker>
          <Marker position={mapData.tx}></Marker>
          <Marker position={mapData.sc}></Marker>
          <Marker position={mapData.mi}></Marker>
          <Marker position={mapData.bigsky}></Marker>
          <Marker position={mapData.crestedbutte}></Marker>
          <Marker position={mapData.az}></Marker>
          <Marker position={mapData.ny}></Marker>
          <Marker position={mapData.fl}></Marker>
          <Marker position={mapData.amarillo}></Marker>
          <Marker position={mapData.yellowstone}></Marker>
          <Marker position={mapData.chicago}></Marker>
          <Marker position={mapData.pokhara}></Marker>
          <Marker position={mapData.kerala}></Marker>
          <Marker position={mapData.darjeeling}></Marker>
          <Marker position={mapData.Mumbai}></Marker>
          <Marker position={mapData.Kathmandu}></Marker>
          <Marker position={mapData.kabale}></Marker>
          <Marker position={mapData.pr}></Marker>
          <Marker position={mapData.belize}></Marker>
          <Marker position={mapData.mexico}></Marker>
          <Marker position={mapData.ontario}></Marker>
          <Marker position={mapData.kampala}></Marker>
      </GoogleMap>
    )
});

export default MapComponent
