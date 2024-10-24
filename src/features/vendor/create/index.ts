export { CreateVendorProvider } from '@/features/vendor/create/create-vendor.context';
export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}
export interface ICreateVendor {
  title: string;
  description?: string;
  tags?: string[];
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  menu: any[];
  schedule: any[];
  catering: boolean;
}

export interface ICreateMenuItem {
  title: string;
  description: string;
  price: string;
  type: string;
}

export interface ICreateMenuItemList {
  menuItems: ICreateMenuItem[];
}

export interface ICreateVendorContext {
  vendor: ICreateVendor;
  setVendor: React.Dispatch<React.SetStateAction<any>>;
  menuItem: ICreateMenuItem;
  setMenuItem: React.Dispatch<React.SetStateAction<any>>;
  menuItemList: ICreateMenuItem[];
  setMenuItemList: React.Dispatch<React.SetStateAction<any>>;
  selectedScheduleList: [];
  setSelectedScheduleList: React.Dispatch<React.SetStateAction<any>>;
}
