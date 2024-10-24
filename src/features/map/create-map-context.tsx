import { createContext } from 'react';
import IVendor from 'shared/interfaces/vendor';

export interface ICreateMapContext {
  vendors: IVendor[];
  fetchVendors: () => Promise<void>;
}

const voidPromise: () => Promise<void> = () => {
  return new Promise<void>((resolve) => {
    resolve();
  });
};
export const CreateMapContext = createContext<ICreateMapContext>({
  vendors: [],
  fetchVendors: voidPromise,
});

// export function CreateMapProvider(props: { children: React.ReactNode }): JSX.Element {
// const [vendors, updateVendors] = useState<IVendor[]>([]);

// const fetchVendors = async () => {
//   try {
//     const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
//       import.meta.env.VITE_BACKEND_PORT
//     }/vendors/search?&lat=28.558811&lon=-81.380120&radius=10`;
//     const res = await axios.get(url);
//     if (res.status >= 200 && res.status < 300) {
//       updateVendors(res.data.data);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// return <CreateMapContext.Provider value={{}}>{props.children}</CreateMapContext.Provider>;
// }
