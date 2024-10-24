import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import ITag from 'shared/interfaces/tag';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TagCarousel from '@/features/nearby-vendors/components/tag-carousel';
import { HomeSection } from '@/features/nearby-vendors/components/home-section';
import { HomeContext } from '@/features/home/home-context';

interface HomePageProps {}

const Wrapper = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-top: 34px;
  max-width: 1210px;
  margin-inline: auto;
`;
const WrapperComponent: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
export const HomePage: React.FC<HomePageProps> = () => {
  const { homeSections, getOrlandoHomeSections } = useContext(HomeContext);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [areTagsLoading, setAreTagsLoading] = useState<boolean>(true);

  const getAllTags = async () => {
    try {
      let tagsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tags`);
      if (tagsResponse.status >= 200 && tagsResponse.status < 300) {
        setAllTags(tagsResponse.data.data);
        setAreTagsLoading(false);
      }
    } catch (error) {
      console.error('error: ', error);
      setAreTagsLoading(false);
    }
  };

  useEffect(() => {
    getAllTags();
    getOrlandoHomeSections();
  }, []);

  return (
    <>
      <WrapperComponent>
        {!areTagsLoading && <TagCarousel tags={allTags} />}
        <Typography mt={4} textAlign="center" variant="h4" fontWeight="bold">
          Orlando Vendors
        </Typography>
        <HomeSection sections={homeSections} />
      </WrapperComponent>
    </>
  );
};
