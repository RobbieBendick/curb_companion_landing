import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import IVendor from 'shared/interfaces/vendor';

interface SmallMapProps {
  vendor: IVendor;
}

export const SmallMap: React.FC<SmallMapProps> = ({ vendor }) => {
  if (!vendor || !vendor.location || !vendor.location.coordinates) return;
  const [lng, lat] = vendor.location.coordinates;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const mapContainerStyle = {
    width: '100%',
    height: '240px',
  };
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={{ lat, lng }}>
      <MarkerF position={{ lat, lng }} />
    </GoogleMap>
  );
};
