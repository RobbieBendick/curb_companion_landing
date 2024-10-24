import { Dialog, DialogContent, Typography, DialogActions, Button } from '@mui/material';
import IMenuItem from 'shared/interfaces/menu-item';
import DefaultMenuItemImage from '@/assets/default_menu_item.png';
import { useWindowSize } from '@/hooks/use-window-size';

interface MenuItemDialogProps {
  selectedItem: IMenuItem;
  handleCloseMenuItemDialog: any;
  isMenuItemDialogOpen: boolean;
}
export const MenuItemDialog: React.FC<MenuItemDialogProps> = ({
  selectedItem,
  handleCloseMenuItemDialog,
  isMenuItemDialogOpen,
}) => {
  const { width } = useWindowSize();
  return (
    <Dialog
      open={isMenuItemDialogOpen}
      onClose={handleCloseMenuItemDialog}
      PaperProps={{
        sx: {
          minWidth: width >= 1000 ? 600 : 300,
        },
      }}
    >
      <DialogContent>
        <Typography variant="body1" marginBottom="8px" fontSize="32px" fontWeight="bold">
          {selectedItem?.title}
        </Typography>
        <Typography variant="body1" fontSize="14px" paddingBottom="16px">
          {selectedItem?.description || 'No description.'}
        </Typography>

        <img
          src={DefaultMenuItemImage}
          width={'100%'}
          style={{ borderRadius: '4px', marginInline: 'auto', display: 'block   ' }}
        ></img>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Price: ${selectedItem?.price}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCloseMenuItemDialog}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
