import { Box, Button, Typography, useTheme } from '@mui/material';
import { InfoWindowF } from '@react-google-maps/api';
import IVendor from 'shared/interfaces/vendor';

interface MarkerVendorInfoWindowProps {
  selectedVendor: IVendor;
  setSelectedVendor: any;
}

export const MarkerVendorInfoWindow: React.FC<MarkerVendorInfoWindowProps> = ({
  selectedVendor,
  setSelectedVendor,
}) => {
  const theme = useTheme();

  if (!selectedVendor.location || !selectedVendor.location.coordinates) return;
  return (
    <InfoWindowF
      position={{
        lat: selectedVendor.location.coordinates[1],
        lng: selectedVendor.location.coordinates[0],
      }}
      onCloseClick={() => setSelectedVendor(null)}
    >
      <Box paddingLeft={1} paddingRight={1}>
        <Typography fontWeight={500} fontSize="15px" color="black">
          {selectedVendor.title}
        </Typography>
        <Typography fontSize="14px" component="p" color="black">
          {selectedVendor.location.address?.street}
        </Typography>
        <Typography fontSize="14px" component="p" color="black">
          {selectedVendor.location.address?.city}, {selectedVendor.location.address?.state},{' '}
          {selectedVendor.location.address?.postalCode}
        </Typography>

        <Typography fontSize="13px" component="p" color="black">
          {selectedVendor.description}
        </Typography>

        <a href={`/vendor/${selectedVendor._id}`}>
          <Button sx={{ width: '100%', backgroundColor: theme.palette.divider, color: '#FFFFFF' }}>View Menu</Button>
        </a>
      </Box>
    </InfoWindowF>
  );
};
