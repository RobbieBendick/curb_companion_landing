import React from 'react';
import { styled, Card, useTheme, Icon } from '@mui/material';
import { Analytics, Article, Map, Schedule, ShoppingCart } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

interface CardDataProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
}
const cardData: CardDataProps[] = [
  {
    icon: <Article fontSize="large" />,
    title: 'Menu',
    description: 'Explore the vendor’s offerings in advance by browsing through their menu.',
  },
  {
    icon: <Schedule fontSize="large" />,
    title: 'Schedule',
    description: 'Stay informed about any vendor’s operating hours in your area, allowing you to plan your visits.',
  },
  {
    icon: <Map fontSize="large" />,
    title: 'Map',
    description: 'Discover nearby vendors with our interactive map feature, providing easily accessible directions.',
  },
  {
    icon: <ShoppingCart fontSize="large" />,
    title: 'Order Ahead',
    description: 'Optimize your time by placing mobile orders in advance, ensuring a fast and seamless experience.',
    comingSoon: true,
  },
  {
    icon: <NotificationsActiveIcon fontSize="large" />,
    title: 'Notifications',
    description: 'Recieve a notification when your bookmarked vendors open their doors.',
    comingSoon: true,
  },
  {
    icon: <Analytics fontSize="large" />,
    title: 'Analytics',
    description:
      'For vendors, gain insights into customer preferences and purchasing patterns to enhance your business strategy.',
    comingSoon: true,
  },
];

export const ElevatedCard: React.FC<CardDataProps> = ({ title, description, icon, comingSoon }) => {
  const theme = useTheme();

  const Ribbon = styled('div')`
    position: absolute;
    top: 32px;
    right: 32px;
    background-color: #0ea47a;
    color: #fff;
    padding: 0.45rem 1rem;
    font-size: 0.7rem;
    transform: translate(50%, -50%) rotate(45deg);
    z-index: 1;
    text-align: center;
    width: 200px;
  `;

  const StyledCard = styled(Card)`
    position: relative;
    width: 21rem;
    height: 17rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background-color: ${(props) => props.theme.palette.background.default};
  `;

  const IconContainer = styled('div')`
    margin-top: auto;
    color: ${(props) => props.theme.palette.text.primary};
    background-color: ${(props) => (props.theme.palette.background as any).secondary}; /* linter error but still works */
    border-radius: 20%;
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.8rem;
  `;

  const CardTitle = styled(Typography)`
    font-weight: bold;
    margin-bottom: 0.8rem;
    font-size: 1.5rem;
  `;

  return (
    <StyledCard theme={theme}>
      <CardContent>
        <IconContainer theme={theme}>
          <Icon style={{ width: 'unset', height: 'unset', display: 'flex' }}>{icon}</Icon>
        </IconContainer>
        <CardTitle variant="h6">{title}</CardTitle>
        <Typography sx={{ fontSize: '1.1rem' }} variant="body2">
          {description}
        </Typography>
        {comingSoon && <Ribbon>Coming Soon</Ribbon>}
      </CardContent>
    </StyledCard>
  );
};

export const CardSection: React.FC = () => {
  const StyledSection = styled('section')`
    @media (max-width: 1000px) {
      margin-top: 10rem;
    }
  `;

  const StyledHeader = styled(Typography)`
    font-weight: bold;
    margin: 2rem 0;
  `;

  const CardGrid = styled('div')`
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;
    justify-items: center;
    padding-bottom: 2rem;

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, minmax(20rem, 1fr));
    }

    @media (max-width: 800px) {
      grid-template-columns: repeat(2, minmax(20rem, 1fr));
    }

    @media (max-width: 750px) {
      grid-template-columns: minmax(20rem, 1fr);
    }
  `;

  return (
    <StyledSection id="what-we-offer">
      <StyledHeader variant="h4" align="center">
        What We Offer
      </StyledHeader>
      <CardGrid>
        {cardData.length > 0 &&
          cardData.map((card: CardDataProps) => (
            <ElevatedCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              comingSoon={Boolean(card.comingSoon)}
            />
          ))}
      </CardGrid>
    </StyledSection>
  );
};
