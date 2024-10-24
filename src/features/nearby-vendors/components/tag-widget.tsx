import React, { useContext } from 'react';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import ITag from 'shared/interfaces/tag';
import DefaultMenuItemImage from '@/assets/default_menu_item.png';
import { HomeContext } from '@/features/home/home-context';

interface TagWidgetProps {
  tag: ITag;
  onClick: () => void;
}

export const TagWidget: React.FC<TagWidgetProps> = React.memo(({ tag, onClick }) => {
  const theme = useTheme();
  const image = tag.image && tag.image.imageURL ? tag.image.imageURL : DefaultMenuItemImage;

  const { activeTags } = useContext(HomeContext);
  const isActive = activeTags.includes(tag.title);

  return (
    <Tooltip title={tag.title}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        gap={1}
        onClick={onClick}
        sx={{ cursor: 'pointer' }}
      >
        <img
          width={70}
          height={60}
          src={image}
          alt={tag.title}
          style={{
            borderRadius: '4px',
            border: isActive ? `3px solid ${theme.palette.divider}` : `none`,
          }}
        />
        <Typography fontSize="14px">{tag.title}</Typography>
      </Box>
    </Tooltip>
  );
});
