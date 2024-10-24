import { Box, IconButton, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { VendorCard } from './vendor-card';
import IVendor from 'shared/interfaces/vendor';
import { useContext, useEffect, useMemo, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from 'react';
import { HomeContext } from '@/features/home/home-context';

interface HomeSectionProps {
  sections: any;
}

const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  draggable: false,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const HomeSection: React.FC<HomeSectionProps> = ({ sections }) => {
  if (!sections) return null;
  const [sliderRefs, setSliderRefs] = useState<{ [key: string]: any }>({});

  const { homeErrorMessage } = useContext(HomeContext);

  useEffect(() => {
    // create a ref for each section and store it in state
    const refs = Object.keys(sections).reduce((acc: any, cur: any) => {
      acc[cur] = React.createRef();
      return acc;
    }, {});
    setSliderRefs(refs);
  }, [sections]);

  const goToPrevSlide = (sectionKey: string) => {
    const currentRef = sliderRefs[sectionKey];
    if (currentRef && currentRef.current) {
      currentRef.current.slickPrev();
    }
  };

  const goToNextSlide = (sectionKey: string) => {
    const currentRef = sliderRefs[sectionKey];
    if (currentRef && currentRef.current) {
      currentRef.current.slickNext();
    }
  };

  const memoizedSections = useMemo(() => {
    if (Object.keys(sections).length === 0 && homeErrorMessage) {
      return (
        <Box display="flex" justifyContent="center" alignContent="center" minHeight="50vh" mt={3}>
          <Typography textAlign="center" color="error">
            {homeErrorMessage}
          </Typography>
        </Box>
      );
    }

    return Object.keys(sections).map((sectionKey: string, index: number) => {
      if (sectionKey === 'Nearest') return null;
      const vendors = sections[sectionKey];
      return (
        <Box
          key={sectionKey}
          sx={{
            // 1 is the first index in this case because we're not showing "Nearest"
            paddingTop: index === 1 ? '50px' : '0px',
          }}
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography fontWeight="bold" variant="h4" fontSize="24px" gutterBottom>
              {sectionKey}
            </Typography>

            <Box display="flex" flexDirection="row">
              <IconButton onClick={() => goToPrevSlide(sectionKey)}>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton onClick={() => goToNextSlide(sectionKey)}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </Box>

          <Slider {...settings} ref={sliderRefs[sectionKey]}>
            {vendors.map((vendor: IVendor) => (
              <VendorCard key={vendor._id} vendor={vendor} />
            ))}
          </Slider>
        </Box>
      );
    });
  }, [sections, sliderRefs]);

  return <>{memoizedSections}</>;
};
