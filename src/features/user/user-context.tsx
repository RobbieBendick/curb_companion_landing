import { createContext, useState } from 'react';

interface IUserContext {
  attemptGetLocation: any;
  userCoords: any;
  setUserCoords: any;
}

export const UserContext = createContext<IUserContext>({
  attemptGetLocation: () => {},
  userCoords: {},
  setUserCoords: () => {},
});

export function UserProvider(props: { children: React.ReactNode }): JSX.Element {
  const [userCoords, setUserCoords] = useState({});
  const attemptGetLocation = () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos: GeolocationPosition) {
      console.log('pos: ', pos);
      let crd = pos.coords;
      setUserCoords(crd);
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function errors(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, errors, options);
  };

  return (
    <UserContext.Provider
      value={{
        attemptGetLocation,
        userCoords,
        setUserCoords,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
