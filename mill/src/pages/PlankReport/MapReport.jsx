import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function MyMapComponent({ tree }) {
  const containerStyle = {
    width: "100vw",
    height: "400px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U",
    mapId: "YOUR_MAP_ID",
  });

  const center = {
    lat: Number(tree.latitude), // Convert to number
    lng: Number(tree.longitude), // Convert to number
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
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
      zoom={2}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapTypeId: "satellite" }}
    >
      <Marker position={center} />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyMapComponent);
