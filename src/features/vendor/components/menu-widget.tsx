import { alpha, Box, Button, Card, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import IVendor from 'shared/interfaces/vendor';
import StarRateIcon from '@mui/icons-material/StarRate';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import styled from 'styled-components';
import { useState } from 'react';
import { useWindowSize } from '@/hooks/use-window-size';
import IMenuItem from 'shared/interfaces/menu-item';
import { removeZeroFromNumIfNecessary } from '@/shared/helpers/string-formatters';
import { MenuItemWidget } from './menu-item-widget';
import { MenuItemDialog } from './menu-item-dialog';
import InfoIcon from '@mui/icons-material/Info';
import { VendorInfoDialog } from './vendor-info-dialog';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IReview, { IReviewWithID } from 'shared/interfaces/review';
import StarRating from './star-rating';
import { HalfCircleRating } from './half-circle-rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReviewsWidget } from './reviews';
interface MenuWidgetProps {
  vendor: IVendor;
}

const VendorInfoRow = styled(Box)<{ shorterThanTabletWidth: boolean }>`
  max-width: fit-content;
  display: flex;
  align-items: ${(props) => (props.shorterThanTabletWidth ? 'center' : 'flex-start')};
  justify-content: flex-start;
  flex-direction: ${(props) => (props.shorterThanTabletWidth ? 'row' : 'column')};
  text-wrap: wrap;
`;
export const MenuWidget: React.FC<MenuWidgetProps> = ({ vendor }) => {
  const storeInfoFontSize = '14px';
  const [isVendorInfoDialogOpen, setIsVendorInfoDialogOpen] = useState(false);
  const { width } = useWindowSize();
  const shorterThanTabletWidth = 1000;

  const handleOpenVendorInfoDialog = () => {
    setIsVendorInfoDialogOpen(true);
  };

  const handleCloseVendorInfoDialog = () => {
    setIsVendorInfoDialogOpen(false);
  };

  const theme = useTheme();

  const groupedItems = vendor.menu.reduce((acc: { [key: string]: IMenuItem[] }, item: IMenuItem) => {
    (acc[item.type] = acc[item.type] || []).push(item);
    return acc;
  }, {});

  const [selectedItem, setSelectedItem] = useState<IMenuItem | null>(null);
  const [isMenuItemDialogOpen, setMenuItemDialogOpen] = useState(false);
  const handleMenuItemClick = (item: IMenuItem) => {
    setSelectedItem(item);
    setMenuItemDialogOpen(true);
  };

  const handleCloseMenuItemDialog = () => {
    setMenuItemDialogOpen(false);
  };

  return (
    <Box gap="2rem" display="flex" flexDirection={width >= shorterThanTabletWidth ? 'row' : 'column'}>
      <Box
        display="flex"
        flexDirection="column"
        minWidth={230}
        sx={{ width: width >= shorterThanTabletWidth ? 230 : '100%' }}
      >
        {width >= shorterThanTabletWidth && (
          <Typography fontWeight="bold" fontSize="1.2rem" paddingTop={4} paddingBottom={0.5}>
            Store Info
          </Typography>
        )}
        <Box display="flex" flexDirection={width >= shorterThanTabletWidth ? 'column' : 'row'}>
          <VendorInfoRow shorterThanTabletWidth={width >= shorterThanTabletWidth}>
            <Box display="flex" flexDirection="column">
              <Box display="flex">
                <AccessTimeIcon sx={{ transform: 'scale(0.6)' }} />
                <Typography fontSize={storeInfoFontSize} sx={{ color: vendor.isOpen ? 'green' : 'red' }}>
                  {vendor.isOpen ? 'Open' : 'Closed'}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <LocalDiningIcon sx={{ transform: 'scale(0.6)' }} />
                <Typography sx={{ color: vendor.isCatering ? 'green' : 'red' }} fontSize={storeInfoFontSize}>
                  {vendor.isCatering ? 'Catering' : 'No Catering'}
                </Typography>
                <Typography fontSize={storeInfoFontSize} sx={{ paddingLeft: '4px' }}>
                  |
                </Typography>
                <StarRateIcon sx={{ transform: 'scale(0.6)', color: 'yellow' }} />
                <Typography fontSize={storeInfoFontSize}>
                  {removeZeroFromNumIfNecessary(vendor.rating || 0) || 0}
                </Typography>
                <Typography paddingLeft={0.3} fontSize={storeInfoFontSize}>
                  ({vendor.reviews.length} reviews)
                </Typography>
              </Box>
            </Box>
          </VendorInfoRow>
          {/* Spacer to push the button to the right */}
          <Box display="flex" flexGrow={1}></Box>

          {width >= 780 ? (
            <Button
              sx={{
                color: theme.palette.text.primary,
                padding: 0.2,
                height: 30,
                mt: 1,
                borderRadius: '24px',
                width: width >= shorterThanTabletWidth ? '100%' : '140px',
                backgroundColor: theme.palette.background.paper,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
                transition: '0.2s ease',
                ['&:hover']: {
                  backgroundColor: theme.palette.background.paper,
                },
              }}
              variant="contained"
              onClick={handleOpenVendorInfoDialog}
            >
              See more
            </Button>
          ) : (
            <IconButton onClick={handleOpenVendorInfoDialog}>
              <InfoIcon />
            </IconButton>
          )}
        </Box>
        <VendorInfoDialog
          handleCloseVendorInfoDialog={handleCloseVendorInfoDialog}
          isVendorInfoDialogOpen={isVendorInfoDialogOpen}
          vendor={vendor}
        />
        <Divider sx={{ marginTop: '20px', borderColor: alpha(theme.palette.text.primary, 0.5) }} />
      </Box>
      <Grid container spacing={2}>
        {vendor.menu.length === 0 ? (
          <Grid justifyContent="center" item xs={12} mt={5}>
            <Typography fontSize="25px" textAlign="center">
              Sorry! This vendor doesn't have a menu.
            </Typography>
          </Grid>
        ) : (
          <>
            {vendor.reviews.length > 0 && <ReviewsWidget vendor={vendor} />}
            {Object.entries(groupedItems).map(([type, items], index: number) => (
              <Box
                width="100%"
                key={type}
                sx={{
                  paddingTop: index > 0 ? 4 : 0,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {type.substring(0, 1).toUpperCase() + type.substring(1)}s
                </Typography>
                <Grid container spacing={2}>
                  {items.map((menuItem: IMenuItem) => (
                    <MenuItemWidget handleMenuItemClick={handleMenuItemClick} menuItem={menuItem} />
                  ))}
                </Grid>
              </Box>
            ))}
          </>
        )}
      </Grid>
      {selectedItem && (
        <MenuItemDialog
          handleCloseMenuItemDialog={handleCloseMenuItemDialog}
          isMenuItemDialogOpen={isMenuItemDialogOpen}
          selectedItem={selectedItem}
        />
      )}
    </Box>
  );
};
