import React from "react";
import Fade from "react-reveal/Fade";
import { GoogleMap, Marker, withGoogleMap, withScriptjs, Circle } from "react-google-maps";
import { compose, withProps } from "recompose";

const mapData = [
    //India-Nepal
    { lat: 8.9952, lng: 76.6105}, // kerala:   
    { lat: 28.2096, lng: 83.9856 }, // pokhara:  
    { lat: 19.0760, lng: 72.8777}, // Mumbai :  
    { lat: 27.0410, lng: 88.2663 }, // darjeel : 
    { lat: 27.7172, lng: 85.3240 }, // Kathm :   
    //USA
    { lat: 37.7749, lng: -122.4194 }, // cali :  
    { lat: 32.705002, lng: -97.1081 }, // tx :    
    { lat: 32.4794, lng: -80.3348 }, // sc :    
    { lat: 42.7325, lng: -84.5555 }, // mi :    
    { lat: 36.1627, lng: -86.7816}, // nash :  
   { lat: 45.2618, lng: -111.3080 }, // bigsky :        
   { lat: 38.8697146, lng: -106.9878231 }, // crestedbutte :  
   { lat: 34.483696, lng: -114.3224548 }, // az :            
   { lat: 43.4261809, lng: -73.7123408}, // ny :            
   { lat: 27.6648, lng: -81.5158 }, // fl :            
   { lat: 35.2220, lng: -101.8313 }, // amarillo :      
   { lat: 44.4280, lng: -110.5885 }, // yellowstone :   
   {lat: 40.76, lng: -111.89}, // saltlakecity:
   //misc
   { lat: 41.8781, lng: -87.6298 }, // chicago :       
   { lat: -1.2420, lng: 29.9856 }, // kabale :        
   { lat: 18.2208, lng: -66.5901 }, // pr :            
   { lat: 17.7612, lng: -88.0277 }, // belize :        
   { lat: 20.6534, lng: -105.2253 }, // mexico :        
   { lat: 51.2538 , lng : -85.3232}, // ontario :       
   { lat: .3476, lng : 32.5825 }, // kampala :       
   {lat: 31.2304, lng: 121.4737}, // shanghai:       
   {lat: 49.9929, lng: 8.2473}, // frankfurt:
    {lat: 51.5074, lng: -0.1278}, // london:
    {lat: 55.9533, lng: 3.1883}, // edinburgh:
];


const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div id="loadingElement" style={{ height: `100%`}} />,
    containerElement: <div id="containerElement" style={{ height: `500px`, width: `100%`}} />,
    mapElement: <div id="mapElement" style={{ height: `100%`, width: `80%`, margin:`auto`}} />,
    markers: mapData
  }),
  withScriptjs,
  withGoogleMap
  
  )(props => {
    

    return(
      <GoogleMap defaultZoom={2} defaultCenter={{ lat: 10, lng: 0 }}>
        {props.markers.map(marker => (
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              key={marker.id}
            />
        ))}
      </GoogleMap>
    )
});

export default MapComponent
