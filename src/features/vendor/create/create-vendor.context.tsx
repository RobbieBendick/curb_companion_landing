import { createContext, useState } from 'react';
import { ICreateVendorContext, ICreateVendor, ICreateMenuItem } from '.';
export const CreateVendorContext = createContext<ICreateVendorContext>({
  vendor: {
    title: '',
    description: '',
    tags: [],
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    website: '',
    menu: [],
    schedule: [],
    catering: false,
  },
  setVendor: () => {},
  menuItem: {
    title: '',
    description: '',
    price: '',
    type: '',
  },
  setMenuItem: () => {},
  menuItemList: [],
  setMenuItemList: () => {},
  selectedScheduleList: [],
  setSelectedScheduleList: () => {},
});

export function CreateVendorProvider(props: { children: React.ReactNode }): JSX.Element {
  const [vendor, setVendor] = useState<ICreateVendor>({
    title: '',
    description: '',
    tags: [],
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    website: '',
    menu: [],
    schedule: [],
    catering: false,
  });

  const [menuItem, setMenuItem] = useState<ICreateMenuItem>({
    title: '',
    description: '',
    price: '',
    type: '',
  });

  const [menuItemList, setMenuItemList] = useState<ICreateMenuItem[]>([]);

  const [selectedScheduleList, setSelectedScheduleList] = useState<[]>([]);

  return (
    <CreateVendorContext.Provider
      value={{
        vendor,
        setVendor,
        menuItem,
        setMenuItem,
        menuItemList,
        setMenuItemList,
        selectedScheduleList,
        setSelectedScheduleList,
      }}
    >
      {props.children}
    </CreateVendorContext.Provider>
  );
}
