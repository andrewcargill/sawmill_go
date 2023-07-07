import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: '100vw',
  height: '400px'
};

const center = {
  lat: 64.0531796, // Update with desired latitude
  lng: 19.9174683, // Update with desired longitude
};

function MyMapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U",
    mapId: '56127499ee1ce2ef'
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapTypeId: 'satallite' }}
    >
        <Marker position={center} />
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MyMapComponent);
