'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import { reducer, initialState, Product } from './Reducer';
import {
  SET_USER,
  LOGOUT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
  SET_MESSAGE_SENT,
  RESET_CONTACT_FORM,
} from './Actions';

type GlobalContextType = {
  state: typeof initialState;
  dispatch: React.Dispatch<any>;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  fetchProducts: () => Promise<void>;
  updateProductWithName: (product: Product) => void;
  sendMessage: (data: {
    name: string;
    email: string;
    message: string;
  }) => Promise<boolean>;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Bejelentkezés - Maradt az admin, de a visszajelzés modernebb lehet
  const login = async (password: string) => {
    if (password === 'host') {
      dispatch({ type: SET_USER, payload: { name: 'Hardware Admin' } });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Névgeneráló logika frissítése hardverre
  const generateProductName = (p: Partial<Product>) => {
    return [
      p.brand,
      p.series,
      p.name, // Itt a konkrét modellnév (pl. i9-14900K)
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
  };

  // Update Termék
  const updateProductWithName = (product: Product) => {
    const productWithNewName = {
      ...product,
      name: generateProductName(product),
    };
    dispatch({ type: UPDATE_PRODUCT, payload: productWithNewName });
  };

  // Termékek betöltése - Átmappelve az új hardver mezőkre
  const fetchProducts = async () => {
    try {
      const res = await axios.get<Product[]>(
        'http://localhost:5000/api/products',
      );

      const mappedProducts: Product[] = res.data.map((p) => ({
        ...p,
        // Biztosítjuk, hogy a név konzisztens legyen a brand/series/name alapján
        displayName: `${p.brand} ${p.name}`.trim(),
        // A Reducer-ben lévő új mezők kezelése (biztonsági castolással)
        socket: (p as any).socket,
        cores: (p as any).cores,
        vram: (p as any).vram,
        tdp: (p as any).tdp,
        clockSpeed: (p as any).clockSpeed,
        category: (p as any).category || 'Hardver',
      }));

      dispatch({ type: SET_PRODUCTS, payload: mappedProducts });
    } catch (err) {
      console.error('Hiba a hardverek lekérésekor:', err);
    }
  };

  const sendMessage = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    try {
      await axios.post('http://localhost:5000/api/messages', data);

      dispatch({ type: SET_MESSAGE_SENT, payload: true });
      dispatch({ type: RESET_CONTACT_FORM });

      return true;
    } catch (err) {
      console.error('Műszaki hiba az üzenetküldés során:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        fetchProducts,
        updateProductWithName,
        sendMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobal must be used within GlobalProvider');
  return context;
}