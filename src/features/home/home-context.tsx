import axios from 'axios';
import { createContext, useState } from 'react';
import { Constants } from '@/constants/constants';
import ITag from 'shared/interfaces/tag';

interface IHomeContext {
  homeSections: any;
  setHomeSections: any;
  homeErrorMessage: string;
  setHomeErrorMessage: any;
  activeTags: string[];
  setActiveTags: any;
  getOrlandoHomeSections: any;
  handleTagClick: any;
}

export const HomeContext = createContext<IHomeContext>({
  homeSections: {},
  setHomeSections: () => {},
  homeErrorMessage: '',
  setHomeErrorMessage: () => {},
  activeTags: [],
  setActiveTags: () => {},
  getOrlandoHomeSections: async () => {},
  handleTagClick: () => {},
});

export function HomeProvider(props: { children: React.ReactNode }): JSX.Element {
  const [homeSections, setHomeSections] = useState([]);
  const [homeErrorMessage, setHomeErrorMessage] = useState<string>('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const getOrlandoHomeSections = async (tags?: string[]) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/home/sections?&lat=${Constants.ORLANDO_COORDINATES.lat}&lon=${
        Constants.ORLANDO_COORDINATES.lon
      }&radius=${Constants.ORLANDO_COORDINATES.radius}${tags && tags.length > 0 ? `&tags=${tags.join(',')}` : ''}`;
      let res = await axios.get(url);
      if (res.status >= 200 && res.status < 300) {
        setHomeSections(res.data.data);
        setHomeErrorMessage('');
      }
    } catch (error: any) {
      console.error('ERROR', error.response.data.errorMessage);
      setHomeSections([]);
      setHomeErrorMessage(error.response.data.errorMessage);
    }
  };

  const handleTagClick = async (tag: ITag) => {
    const index = activeTags.indexOf(tag.title);
    let aTags;
    if (index !== -1) {
      setActiveTags((prevTags: string[]) => {
        aTags = prevTags.filter((otherTag: string) => otherTag !== tag.title);
        return aTags;
      });
    } else {
      setActiveTags((prevTags: string[]) => {
        aTags = [...prevTags, tag.title];
        return aTags;
      });
    }
    try {
      await getOrlandoHomeSections(aTags);
    } catch (error) {
      console.error('Error refreshing home sections:', error);
    }
  };
  return (
    <HomeContext.Provider
      value={{
        setHomeSections,
        homeSections,
        homeErrorMessage,
        setHomeErrorMessage,
        activeTags,
        setActiveTags,
        getOrlandoHomeSections,
        handleTagClick,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
}
