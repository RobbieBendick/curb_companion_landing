import React, { useContext, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ITag from 'shared/interfaces/tag';
import { Box, IconButton, styled, useTheme } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TagWidget } from './tag-widget';
import { HomeContext } from '@/features/home/home-context';

interface TagCarouselProps {
  tags: ITag[];
}

const TagCarousel: React.FC<TagCarouselProps> = ({ tags }) => {
  const settings = {
    dots: false,
    arrows: false,
    speed: 400,
    infinite: false,
    slidesToShow: 14,
    slidesToScroll: 14,
    draggable: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 12,
          slidesToScroll: 12,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 10,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const NavigateButtonContainer = styled(Box)`
    position: absolute;
    top: 35%;
    transform: translateY(-50%);
    z-index: 1000;
  `;

  const sliderRef = useRef<Slider>(null);

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const theme = useTheme();

  const { handleTagClick } = useContext(HomeContext);

  return (
    <Box className="carousel-container" position="relative">
      <NavigateButtonContainer left={-15}>
        <IconButton
          sx={{
            padding: '5px',
            backgroundColor: theme.palette.background.default,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
            transition: '0.2s ease',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',

            ['&:hover']: {
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
            },
          }}
          onClick={goToPrevSlide}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </NavigateButtonContainer>
      <NavigateButtonContainer right={-15}>
        <IconButton
          sx={{
            padding: '5px',
            backgroundColor: theme.palette.background.default,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
            transition: '0.2s ease',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',

            ['&:hover']: {
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
            },
          }}
          onClick={goToNextSlide}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </NavigateButtonContainer>

      <Slider {...settings} ref={sliderRef}>
        {tags.map((tag: ITag) => {
          return <TagWidget key={tag._id} tag={tag} onClick={() => handleTagClick(tag)} />;
        })}
      </Slider>
    </Box>
  );
};

export default TagCarousel;
