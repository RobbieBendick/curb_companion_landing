import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Box, Drawer, List, Typography, useMediaQuery, useTheme } from '@mui/material';
import IVendor from '../../shared/interfaces/vendor';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { DrawerVendorInfoListItem } from '@/features/map/components/drawer-vendor-info-list-item';
import { MarkerVendorInfoWindow } from '@/features/map/components/marker-vendor-info-window';
import { useWindowSize } from '@/hooks/use-window-size';
import React from 'react';
import { MapMarker } from '@/features/map/components/map-marker';
import { Constants } from '@/constants/constants';
import { DrawerContext } from '@/features/drawer/drawer-context';

interface MapProps {
  vendorData: IVendor[];
}

const Map: React.FC<MapProps> = ({ vendorData }) => {
  const { width } = useWindowSize();

  const mapHeight = '95vh';
  const drawerWidth = 240;
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));

  const containerStyle = {
    width: !isMobile ? '100vw' : width - drawerWidth,
    height: mapHeight,
  };

  const center = {
    lat: 28.558811,
    lng: -81.408792,
  };

  const [selectedVendor, setSelectedVendor] = useState<IVendor | null>(null);

  const mapRef = useRef(null);

  const onMapLoad = React.useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const [lastSelectedVendor, setLastSelectedVendor] = useState<IVendor | null>(null);
  const centerMap = useMemo(() => {
    // try to use selectedVendor's coordinates
    if (selectedVendor?.location?.coordinates) {
      return {
        lat: selectedVendor.location.coordinates[1],
        lng: selectedVendor.location.coordinates[0],
      };
    }
    // try to use lastSelectedVendor's coordinates
    if (lastSelectedVendor?.location?.coordinates) {
      return {
        lat: lastSelectedVendor.location.coordinates[1],
        lng: lastSelectedVendor.location.coordinates[0],
      };
    }
    // default to the initial center
    return center;
  }, [selectedVendor, lastSelectedVendor, center]);

  const memoizedMap = useMemo(() => {
    return (
      <GoogleMap mapContainerStyle={containerStyle} center={centerMap} zoom={11} ref={mapRef} onLoad={onMapLoad}>
        {vendorData.map((vendor: IVendor, index: number) => (
          <MapMarker key={vendor._id} vendor={vendor} index={index} setSelectedVendor={setSelectedVendor} />
        ))}

        {selectedVendor && selectedVendor.location && selectedVendor.location.coordinates && (
          <MarkerVendorInfoWindow selectedVendor={selectedVendor} setSelectedVendor={setSelectedVendor} />
        )}
      </GoogleMap>
    );
  }, [width, centerMap]);

  useEffect(() => {
    if (selectedVendor) {
      setLastSelectedVendor(selectedVendor);
    }
  }, [selectedVendor]);

  const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);
  return (
    <Box display="flex">
      <Drawer
        slotProps={{
          backdrop: { invisible: true },
        }}
        variant={isMobile ? 'permanent' : 'temporary'}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            zIndex: 1,
            maxHeight: isMobile ? mapHeight : '100%',
            overflowY: 'scroll',
            position: 'relative',
            backgroundImage: 'unset',
          },
        }}
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <Typography variant="h6" align="center" sx={{ p: 2 }}>
          Orlando Vendors
        </Typography>
        <List>
          {vendorData.length > 0 &&
            vendorData.map((vendor: IVendor) => {
              return <DrawerVendorInfoListItem vendor={vendor} mapRef={mapRef} setSelectedVendor={setSelectedVendor} />;
            })}
        </List>
      </Drawer>
      <Box flex={1}>{memoizedMap}</Box>
    </Box>
  );
};

export const MapScreen = () => {
  const [vendors, updateVendors] = useState<IVendor[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const fetchVendors = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/vendors/search?&lat=${Constants.ORLANDO_COORDINATES.lat}&lon=${
        Constants.ORLANDO_COORDINATES.lon
      }&radius=${Constants.ORLANDO_COORDINATES.radius}`;
      const res = await axios.get(url);
      if (res.status >= 200 && res.status < 300) {
        updateVendors(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchVendors();
  }, []);
  return isLoaded ? <Map vendorData={vendors} /> : <Typography textAlign="center">Loading...</Typography>;
};
