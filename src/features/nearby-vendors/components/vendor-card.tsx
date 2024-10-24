import { Box, Typography, useTheme } from '@mui/material';
import IVendor from 'shared/interfaces/vendor';
import defaultVendor from '@/assets/default_vendor.png';
import defaultVendorDark from '@/assets/default_vendor_dark.png';
import { useContext } from 'react';
import { ColorModeContext } from '@/app';
import StarRateIcon from '@mui/icons-material/StarRate';
import { removeZeroFromNumIfNecessary } from '@/shared/helpers/string-formatters';

interface VendorCardProps {
  vendor: IVendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  const { mode } = useContext(ColorModeContext) as any;

  const defaultVendorImages = {
    dark: defaultVendorDark,
    light: defaultVendor,
  };

  const theme = useTheme();

  const defaultVendorImage = (defaultVendorImages as any)[mode];
  return (
    <a href={`/vendor/${vendor._id}`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: '16px',
          borderRadius: '8px',
          margin: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={vendor.profileImage?.imageURL ?? defaultVendorImage}
          alt={vendor.title}
          style={{ width: '80%', borderRadius: '8px 8px 0 0', alignSelf: 'center' }}
        />
        <Box sx={{ padding: '16px', width: '100%' }}>
          <Typography
            variant="h6"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
            }}
          >
            {vendor.title}
          </Typography>
          <Box display="flex" flexDirection="row">
            <Typography fontSize="14px">{removeZeroFromNumIfNecessary(vendor.rating || 0) || 0}</Typography>
            <StarRateIcon fontSize="small" sx={{ transform: 'scale(0.8)' }} />
            <Typography fontSize="14px">({vendor.reviews.length})</Typography>
          </Box>
        </Box>
      </Box>
    </a>
  );
};
