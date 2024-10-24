import { Box, Grid, Paper, Typography } from '@mui/material';
import IMenuItem from 'shared/interfaces/menu-item';
import DefaultMenuItemImage from '@/assets/default_menu_item.png';

interface MenuItemWidgetProps {
  menuItem: IMenuItem;
  handleMenuItemClick: any;
}

export const MenuItemWidget: React.FC<MenuItemWidgetProps> = ({ menuItem, handleMenuItemClick }) => {
  return (
    <Grid item sm={12} md={6} key={menuItem._id} onClick={() => handleMenuItemClick(menuItem)} sx={{ width: '100%' }}>
      <Paper elevation={1} sx={{ display: 'flex', width: '100%', height: '100%', cursor: 'pointer' }}>
        <Box sx={{ p: 2, flex: 1 }}>
          <Typography fontSize="16px" variant="h6">
            {menuItem.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              textOverflow: 'ellipsis',
              mb: 1,
              fontSize: '14px',
              height: '40px',
            }}
          >
            {menuItem.description || 'No description.'}
          </Typography>

          <Typography fontSize="14px" variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
            ${menuItem.price}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={DefaultMenuItemImage}
            alt={menuItem.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Paper>
    </Grid>
  );
};
