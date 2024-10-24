import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  DialogActions,
  Button,
} from '@mui/material';
import IVendor from 'shared/interfaces/vendor';
import { SmallMap } from './small-map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { BuildEachDay } from './build.each-day';
import { useState } from 'react';

interface VendorInfoDialogProps {
  vendor: IVendor;
  handleCloseVendorInfoDialog: any;
  isVendorInfoDialogOpen: boolean;
}

export const VendorInfoDialog: React.FC<VendorInfoDialogProps> = ({
  vendor,
  handleCloseVendorInfoDialog,
  isVendorInfoDialogOpen,
}) => {
  const handleDirectionsClick = () => {
    if (vendor && vendor.location && vendor.location.coordinates) {
      const [lon, lat] = vendor.location.coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
      window.open(url, '_blank');
    }
  };
  const [isScheduleExpanded, setIsScheduleExpanded] = useState<boolean>(false);

  return (
    <Dialog open={isVendorInfoDialogOpen} onClose={handleCloseVendorInfoDialog}>
      <DialogTitle variant="h5" fontSize="27px" fontWeight="bold">
        {vendor.title}
      </DialogTitle>
      {vendor && vendor.location && vendor.location.coordinates && (
        <DialogContent sx={{ padding: 0 }}>
          <Box
            sx={{
              width: '560px',
            }}
          >
            <SmallMap vendor={vendor} />
            <ListItem
              secondaryAction={
                <IconButton onClick={handleDirectionsClick}>
                  <ArrowOutwardIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary={vendor.location.address?.street}
                secondary={`${vendor.location.address?.city}, ${vendor.location.address?.state}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={vendor.phoneNumber} />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}>
                  {isScheduleExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              }
            >
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ color: vendor.isOpen ? 'green' : 'red' }}
                primary={vendor.isOpen ? 'Open' : 'Closed'}
                secondary={`${vendor.isOpen ? 'Open' : 'Closed'}`}
              />
            </ListItem>
            {isScheduleExpanded && <BuildEachDay schedule={vendor.schedule} />}
          </Box>
        </DialogContent>
      )}

      <DialogActions>
        <Button variant="contained" onClick={handleCloseVendorInfoDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
