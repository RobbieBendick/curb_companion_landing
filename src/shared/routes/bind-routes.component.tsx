import { CreateVendorPage } from '@/pages/create-vendor';
import { LandingPage } from '@/pages/landing';
import { MapScreen } from '@/pages/map';
import { Route, Routes } from 'react-router-dom';
import ResponsiveNavbar from '@/features/navbar/navbar';
import Footer from '../footer.component';
import TermsAndConditionsPage from '@/pages/terms-and-conditions';
import { DrawerProvider } from '@/features/drawer/drawer-context';
import PrivacyPolicyPage from '@/pages/privacy-policy';
import { VendorPage } from '@/pages/vendor';
import { HomePage } from '@/pages/home';
import { FourOhFourPage } from '@/pages/404';
import { FeedbackPage } from '@/pages/feedback';

export const ROUTE_PATHS: any = {
  landing: '/',
  map: '/map',
  createVendor: '/create-vendor',
  termsAndConditions: '/terms-and-conditions',
  privacyPolicy: 'privacy-policy',
  vendor: '/vendor/:vendorID',
  home: '/home',
  feedback: '/feedback',
  '404': '*',
};

interface IRoute {
  path: string;
  element: JSX.Element;
}

export const routes: IRoute[] = [
  {
    path: ROUTE_PATHS.landing,
    element: <LandingPage />,
  },
  {
    path: ROUTE_PATHS.map,
    element: <MapScreen />,
  },
  {
    path: ROUTE_PATHS.createVendor,
    element: <CreateVendorPage />,
  },
  {
    path: ROUTE_PATHS.termsAndConditions,
    element: <TermsAndConditionsPage />,
  },
  {
    path: ROUTE_PATHS.privacyPolicy,
    element: <PrivacyPolicyPage />,
  },
  {
    path: ROUTE_PATHS.vendor,
    element: <VendorPage />,
  },
  {
    path: ROUTE_PATHS.home,
    element: <HomePage />,
  },
  {
    path: ROUTE_PATHS['404'],
    element: <FourOhFourPage />,
  },
  {
    path: ROUTE_PATHS.feedback,
    element: <FeedbackPage />,
  },
];

export function BindRoutes(props: { children?: React.ReactNode }): JSX.Element {
  return (
    <DrawerProvider>
      <>
        <ResponsiveNavbar />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {props.children}
        </Routes>
        <Footer />
      </>
    </DrawerProvider>
  );
}
