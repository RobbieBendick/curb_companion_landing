import { ListItem, ListItemButton, ListItemText, Typography, Chip, Divider, Box, useTheme, alpha } from '@mui/material';
import ITag from 'shared/interfaces/tag';
import IVendor from 'shared/interfaces/vendor';

interface DrawerVendorInfoListItemProps {
  vendor: IVendor;
  mapRef: any;
  setSelectedVendor: any;
}

export const DrawerVendorInfoListItem: React.FC<DrawerVendorInfoListItemProps> = ({
  vendor,
  mapRef,
  setSelectedVendor,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (mapRef.current && vendor.location && vendor.location.coordinates) {
      const newCenter = {
        lat: vendor.location.coordinates[1],
        lng: vendor.location.coordinates[0],
      };
      mapRef.current.panTo(newCenter);
      mapRef.current.setZoom(15);
    }
    setSelectedVendor(vendor);
  };

  return (
    <>
      <ListItem key={vendor.title} disablePadding>
        <ListItemButton sx={{ display: 'block' }} onClick={handleClick}>
          <ListItemText primary={vendor.title} sx={{ fontSize: '0.8rem' }} />
          {vendor.location && vendor.location.address && (
            <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row">
                <Typography sx={{ fontSize: '12px', pb: 0.5 }}>
                  {vendor.location.address.city}, {vendor.location.address.state}, {vendor.location.address.postalCode}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize="12px">{vendor.location.address.street}</Typography>
                {vendor.isOpen ? (
                  <Typography sx={{ fontSize: '11px', color: 'green' }}>Open</Typography>
                ) : (
                  <Typography sx={{ fontSize: '11px', color: 'red' }}>Closed</Typography>
                )}
              </Box>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '5px' }}>
            {/* Tags */}
            {vendor.tags.map((tag: ITag) => {
              return (
                <Chip sx={{ fontSize: '12px', cursor: 'pointer', height: '19px' }} size="small" label={tag.title} />
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 0.7 }}></Box>
        </ListItemButton>
      </ListItem>
      <Divider sx={{ borderColor: alpha(theme.palette.text.primary, 0.5) }} />
    </>
  );
};
