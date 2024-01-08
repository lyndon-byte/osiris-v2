import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: 'auto',
  height: '30vh',
  margin: 'auto',
  border: '10px solid white',
  borderRadius: '1%',
};

const Map = () => {

    const center = {
            lat: 7.2905715, // default latitude
            lng: 80.6337262, // default longitude
    };
      
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCp2FrtJgGCeG-sJUxUqsTAEPXeNaDRSEY',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={20}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;