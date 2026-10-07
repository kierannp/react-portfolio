import React from "react";
import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";

import kabale1 from "../images/adventures/kabale-1.jpg";
import kabale2 from "../images/adventures/kabale-2.jpg";
import kabale3 from "../images/adventures/kabale-3.jpg";
import kabale4 from "../images/adventures/kabale-4.jpg";
import kabale5 from "../images/adventures/kabale-5.jpg";
import kabale6 from "../images/adventures/kabale-6.jpg";
import sanfrancisco1 from "../images/adventures/sanfrancisco-1.jpg";
import sanfrancisco2 from "../images/adventures/sanfrancisco-2.jpg";
import sanfrancisco3 from "../images/adventures/sanfrancisco-3.jpg";
import sanfrancisco4 from "../images/adventures/sanfrancisco-4.jpg";
import crestedbutte1 from "../images/adventures/crestedbutte-1.jpg";
import crestedbutte2 from "../images/adventures/crestedbutte-2.jpg";
import crestedbutte3 from "../images/adventures/crestedbutte-3.jpg";
import crestedbutte4 from "../images/adventures/crestedbutte-4.jpg";
import edinburgh1 from "../images/adventures/edinburgh-1.jpg";
import edinburgh2 from "../images/adventures/edinburgh-2.jpg";
import edinburgh3 from "../images/adventures/edinburgh-3.jpg";
import edinburgh4 from "../images/adventures/edinburgh-4.jpg";
import milan1 from "../images/adventures/milan-1.jpg";
import milan2 from "../images/adventures/milan-2.jpg";
import milan3 from "../images/adventures/milan-3.jpg";
import milan4 from "../images/adventures/milan-4.jpg";

// To add photos to a location: drop the image in src/images/adventures/,
// import it at the top, and add it to that location's `photos` array. `date`
// is optional and shown under the place name. Locations with no photos simply
// show their name on hover.
//
//   import pokharaImg from "../images/adventures/pokhara.jpg"
//   {
//     id: "pokhara", name: "Pokhara, Nepal", lat: ..., lng: ...,
//     date: "March 2017",
//     photos: [{ src: pokharaImg, alt: "Fishtail peak over Phewa Lake" }],
//   },

const mapData = [
  // India / Nepal
  { id: "kerala", name: "Kerala, India", lat: 8.9952, lng: 76.6105, photos: [] },
  { id: "pokhara", name: "Pokhara, Nepal", lat: 28.2096, lng: 83.9856, photos: [] },
  { id: "mumbai", name: "Mumbai, India", lat: 19.076, lng: 72.8777, photos: [] },
  { id: "darjeeling", name: "Darjeeling, India", lat: 27.041, lng: 88.2663, photos: [] },
  { id: "kathmandu", name: "Kathmandu, Nepal", lat: 27.7172, lng: 85.324, photos: [] },
  // USA
  {
    id: "sanfrancisco",
    name: "San Francisco, California",
    lat: 37.7749,
    lng: -122.4194,
    date: "May 2016",
    photos: [
      { src: sanfrancisco1, alt: "The Golden Gate Bridge seen across the rocks and surf" },
      { src: sanfrancisco2, alt: "The bay and headlands seen through cypress trees" },
      { src: sanfrancisco3, alt: "Sitting on the rocks with the Golden Gate Bridge behind" },
      { src: sanfrancisco4, alt: "Bouldering on the rocks above the shore" },
    ],
  },
  { id: "fortworth", name: "Fort Worth, Texas", lat: 32.705002, lng: -97.1081, photos: [] },
  { id: "beaufort", name: "Beaufort, South Carolina", lat: 32.4794, lng: -80.3348, photos: [] },
  { id: "lansing", name: "Lansing, Michigan", lat: 42.7325, lng: -84.5555, photos: [] },
  { id: "nashville", name: "Nashville, Tennessee", lat: 36.1627, lng: -86.7816, photos: [] },
  { id: "bigsky", name: "Big Sky, Montana", lat: 45.2618, lng: -111.308, photos: [] },
  {
    id: "crestedbutte",
    name: "Crested Butte, Colorado",
    lat: 38.8697146,
    lng: -106.9878231,
    date: "July 2017",
    photos: [
      { src: crestedbutte1, alt: "Mountains rising over a wildflower meadow" },
      { src: crestedbutte2, alt: "A wooden cabin below a rocky peak" },
      { src: crestedbutte3, alt: "A green valley running toward distant peaks" },
      { src: crestedbutte4, alt: "Sunset over water with dark hills behind" },
    ],
  },
  { id: "arizona", name: "Lake Havasu, Arizona", lat: 34.483696, lng: -114.3224548, photos: [] },
  { id: "adirondacks", name: "Adirondacks, New York", lat: 43.4261809, lng: -73.7123408, photos: [] },
  { id: "florida", name: "Florida", lat: 27.6648, lng: -81.5158, photos: [] },
  { id: "amarillo", name: "Amarillo, Texas", lat: 35.222, lng: -101.8313, photos: [] },
  { id: "yellowstone", name: "Yellowstone National Park", lat: 44.428, lng: -110.5885, photos: [] },
  { id: "saltlakecity", name: "Salt Lake City, Utah", lat: 40.76, lng: -111.89, photos: [] },
  { id: "chicago", name: "Chicago, Illinois", lat: 41.8781, lng: -87.6298, photos: [] },
  { id: "stlouis", name: "St. Louis, Missouri", lat: 38.627, lng: -90.1994, photos: [] },
  { id: "atlanta", name: "Atlanta, Georgia", lat: 33.749, lng: -84.388, photos: [] },
  { id: "boston", name: "Boston, Massachusetts", lat: 42.3601, lng: -71.0589, photos: [] },
  // Elsewhere
  {
    id: "kabale",
    name: "Kabale, Uganda",
    lat: -1.242,
    lng: 29.9856,
    date: "December 2016",
    photos: [
      { src: kabale1, alt: "Terraced farmland and green hills seen over a maize field" },
      { src: kabale2, alt: "Villagers gathered on a dirt road with hills behind" },
      { src: kabale3, alt: "Pouring water from a jerrycan at an outdoor table with local residents" },
      { src: kabale4, alt: "A crowd gathered around a table outside a village building" },
      { src: kabale5, alt: "Forested hillside under a blue sky" },
      { src: kabale6, alt: "Kieran standing on a red dirt road with hills behind" },
    ],
  },
  { id: "kampala", name: "Kampala, Uganda", lat: 0.3476, lng: 32.5825, photos: [] },
  { id: "puertorico", name: "Puerto Rico", lat: 18.2208, lng: -66.5901, photos: [] },
  { id: "belize", name: "Belize", lat: 17.7612, lng: -88.0277, photos: [] },
  { id: "mexico", name: "Puerto Vallarta, Mexico", lat: 20.6534, lng: -105.2253, photos: [] },
  { id: "ontario", name: "Ontario, Canada", lat: 51.2538, lng: -85.3232, photos: [] },
  { id: "shanghai", name: "Shanghai, China", lat: 31.2304, lng: 121.4737, photos: [] },
  { id: "frankfurt", name: "Frankfurt, Germany", lat: 49.9929, lng: 8.2473, photos: [] },
  { id: "london", name: "London, England", lat: 51.5074, lng: -0.1278, photos: [] },
  {
    id: "edinburgh",
    name: "Edinburgh, Scotland",
    lat: 55.9533,
    lng: -3.1883,
    date: "March 2025",
    photos: [
      { src: edinburgh1, alt: "Open grassland and low hills under a broken sky" },
      { src: edinburgh2, alt: "A track climbing through the hills" },
      { src: edinburgh3, alt: "A steep hillside above the water" },
      { src: edinburgh4, alt: "A grass track running across open moorland" },
    ],
  },
  {
    id: "milan",
    name: "Milan, Italy",
    lat: 45.4642,
    lng: 9.19,
    date: "April 2026",
    photos: [
      { src: milan1, alt: "The Duomo di Milano and its crowded piazza" },
      { src: milan2, alt: "The courtyard of the Sforza Castle" },
      { src: milan3, alt: "A quiet cobbled street in Milan" },
      { src: milan4, alt: "Milano Centrale station seen from above" },
    ],
  },
];

// Monochrome basemap: the saturated default (teal water, green land, red pins)
// was the only colour on an otherwise black-and-white page. Roads, POIs and
// transit are hidden because none of them matter at world zoom.
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#e9e9e9" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#e4e4e4" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#fafafa" }] },
  { featureType: "water", elementType: "labels.text", stylers: [{ visibility: "off" }] },
];

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div id="loadingElement" style={{ height: `100%` }} />,
    containerElement: <div id="containerElement" style={{ height: `480px`, width: `100%` }} />,
    mapElement: <div id="mapElement" style={{ height: `100%`, width: `100%` }} />,
    markers: mapData,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  // Hover only identifies the pin; the photos themselves live in the side
  // panel, which has far more room than an InfoWindow.
  const [hovered, setHovered] = React.useState(null);
  const closeTimer = React.useRef(null);

  const openHover = marker => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setHovered(marker);
    // Hovering a place that has photos opens the panel straight away. Places
    // with none are left alone, so sweeping the map doesn't flash an empty panel.
    if (marker.photos.length > 0) props.onSelect(marker);
  };

  // Closing on a short delay keeps the window steady across the small gaps
  // between a marker and the popup, instead of snapping shut and reopening.
  const closeHover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHovered(null), 120);
  };

  React.useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  // disableAutoPan: without it the map slides to fit the popup, dragging the
  // marker out from under the cursor and retriggering hover.
  // pixelOffset: lifts the popup clear of the ~40px marker icon, so the popup
  // never covers the marker it was opened from.
  // A filled marker means "there are photos here"; 28 of the 33 places have
  // none, so without this the only way to find them is to sweep every pin.
  const hasGoogle = typeof window !== "undefined" && window.google;
  const markerIcon = marker =>
    hasGoogle
      ? {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: marker.photos.length > 0 ? 7.5 : 4.5,
          fillColor: marker.photos.length > 0 ? "#111" : "#ffffff",
          fillOpacity: 1,
          strokeColor: marker.photos.length > 0 ? "#ffffff" : "#9a9a9a",
          strokeWeight: marker.photos.length > 0 ? 2 : 1.5,
        }
      : undefined;

  const infoOptions = {
    disableAutoPan: true,
    maxWidth: 260,
    ...(typeof window !== "undefined" && window.google
      ? { pixelOffset: new window.google.maps.Size(0, -42) }
      : {}),
  };

  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 31.5, lng: 0 }}
      defaultOptions={{
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
      onClick={() => props.onSelect(null)}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={markerIcon(marker)}
          title={marker.name}
          onMouseOver={() => openHover(marker)}
          onMouseOut={closeHover}
          onClick={() => props.onSelect(marker)}
          onFocus={() => openHover(marker)}
        />
      ))}

      {/* Places with photos announce themselves in the panel, so the label
          would just repeat it; show it only for places without photos. */}
      {hovered && hovered.photos.length === 0 && (
        <InfoWindow
          position={{ lat: hovered.lat, lng: hovered.lng }}
          options={infoOptions}
          onCloseClick={() => setHovered(null)}
        >
          <div className="map-infowindow">
            <h4>{hovered.name}</h4>
            {hovered.date && <p className="map-infowindow-date">{hovered.date}</p>}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
});

const AdventuresMap = () => {
  const [selected, setSelected] = React.useState(null);

  // Esc closes the panel, matching the close button.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="adventures-map">
      <MapComponent onSelect={setSelected} />

      {selected && (
        <aside className="adventures-panel" aria-label={`Photos from ${selected.name}`}>
          <div className="adventures-panel-head">
            <div>
              <h3>{selected.name}</h3>
              {selected.date && <p className="adventures-panel-date">{selected.date}</p>}
            </div>
            <button
              type="button"
              className="adventures-panel-close"
              onClick={() => setSelected(null)}
              aria-label="Close photos"
            >
              &times;
            </button>
          </div>

          {selected.photos.length > 0 ? (
            <div className="adventures-panel-photos">
              {selected.photos.map(photo => (
                <img src={photo.src} alt={photo.alt} key={photo.src} loading="lazy" />
              ))}
            </div>
          ) : (
            <p className="adventures-panel-empty">No photos here yet.</p>
          )}
        </aside>
      )}
    </div>
  );
};

export default AdventuresMap
