import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';

const libraries = ['places'];
const mapContainerStyle = {
  width: 'auto',
  height: '35vh',
  margin: 'auto',
  border: '10px solid white',
  borderRadius: '1%',
};



const Map = () => {

  const [lat,setLat] = useState(0)
  const [long,setLong] = useState(0)

   
  const center = {

    lat: lat,
    lng: long,

  };

  useEffect(() =>{


    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

  },[])
      
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
        zoom={17}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;