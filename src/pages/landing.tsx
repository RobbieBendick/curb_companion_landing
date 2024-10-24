import { Box, Button, Snackbar, Typography, styled } from '@mui/material';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../app';
import { CardSection } from '@/features/landing/landing.components';
import phonesLightLarge from '@/assets/phones-large.png';
import phonesDarkLarge from '@/assets/dark-phones-large.png';

export function LandingPage() {
  const [open, setOpen] = useState(false);
  const { mode } = useContext(ColorModeContext);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Title = styled('h1')`
    font-size: 2.5em;
    text-align: start;
    max-width: 30rem;
    margin: 0;
  `;

  const Subtitle = styled('h2')`
    font-size: 1.5em;
    text-align: start;
    font-weight: normal;
    max-width: 30rem;
  `;

  const SectionWrapper = styled('section')`
    min-height: 55rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 4rem;
    padding: 0 3rem;
    @media (max-width: 1000px) {
      flex-direction: column;
      gap: 3rem;
      justify-content: 'unset';
      margin-top: 4rem;
    }
  `;

  const ContainerColumn = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

  const ImgContainerColumn = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 550px) {
      width: 400px;
    }
    @media (max-width: 450px) {
      width: 350px;
    }
    @media (max-width: 420px) {
      width: 320px;
    }
    @media (max-width: 400px) {
      width: 300px;
    }
  `;

  const ContainerRow = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 1rem;
  `;

  const DownloadButton = styled(Button)`
    background-color: #0ea47a;
    border-radius: 5rem;
    text-transform: none;
    padding: 0.5rem 2rem;
    color: #ffffff;
  `;

  const LearnMoreButton = styled(Button)`
    background-color: #b0b0b0;
    border-radius: 5rem;
    text-transform: none;
    padding: 0.5rem 2rem;
    color: #000000;
    &:hover {
      /* different hovers depending on theme */
      background-color: ${mode === 'dark' ? 'rgba(176, 176, 176, 0.5)' : '#8c8c8c'};
    }
  `;

  const AppWrapper = styled(Box)`
    max-width: 1500px;
    margin: 0 auto;
  `;

  const themedPhoneImages = {
    light: phonesDarkLarge,
    dark: phonesLightLarge,
  };

  const selectedThemePhoneImage = themedPhoneImages[mode];

  const learnMoreButtonHandler = () => {
    let element = document.querySelector('#what-we-offer');
    if (!element) return;
    element.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <AppWrapper>
      <SectionWrapper>
        <ContainerColumn>
          <Title>Discover the best street food in Orlando!</Title>
          <Subtitle>Find your favorite local food truck or food stand and check out their menu!</Subtitle>
          <ContainerRow>
            <DownloadButton onClick={handleClick} variant="contained">
              Download
            </DownloadButton>
            <LearnMoreButton onClick={learnMoreButtonHandler} variant="contained">
              Learn More
            </LearnMoreButton>
          </ContainerRow>
          <Typography sx={{ paddingLeft: '3px', mt: 1.25, fontStyle: 'italic', fontSize: '0.9rem' }}>
            Available soon on iOS and Android
          </Typography>
        </ContainerColumn>
        <ImgContainerColumn>
          <img src={selectedThemePhoneImage} alt="Landing Image" />
        </ImgContainerColumn>
      </SectionWrapper>
      <CardSection />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Available soon on the App Store and Google Play"
      />
    </AppWrapper>
  );
}
