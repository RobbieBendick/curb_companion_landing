import { MarkerF } from '@react-google-maps/api';
import IVendor from 'shared/interfaces/vendor';

interface MapMarkerProps {
  vendor: IVendor;
  index: number;
  setSelectedVendor: any;
}
export const MapMarker: React.FC<MapMarkerProps> = ({ vendor, index, setSelectedVendor }) => {
  if (!vendor || !vendor.location || !vendor.location.coordinates) return null;

  return (
    <MarkerF
      noClustererRedraw={true}
      onClick={() => {
        if (!vendor || !vendor.location || !vendor.location.coordinates) return null;
        setSelectedVendor(vendor);
      }}
      animation={window.google.maps.Animation.DROP}
      key={index}
      position={{
        lat: vendor.location.coordinates[1],
        lng: vendor.location.coordinates[0],
      }}
    ></MarkerF>
  );
};
