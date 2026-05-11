// Reducer.ts
import {
  SET_USER,
  LOGOUT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
  SET_CONTACT_FORM,
  RESET_CONTACT_FORM,
  SET_MESSAGE_SENT,
  SET_ADMIN_SELECTED,
  SET_ADMIN_FORM,
  SET_ADMIN_MESSAGE,
} from './Actions';

export type User = { name: string } | null;

// HARDVER SPECIFIKUS TERMÉK STRUKTÚRA
export type Product = {
  _id: string;
  name: string;      // pl. Intel Core i9-14900K
  brand: string;     // pl. Intel, AMD, Nvidia
  category: string;  // pl. CPU, GPU, RAM, Motherboard
  series?: string;   // pl. RTX 40-series, Ryzen 7000
  socket?: string;   // pl. LGA1700, AM5
  cores?: string;    // pl. 24 Cores (8P + 16E)
  clockSpeed?: string; // pl. 5.2 GHz
  vram?: string;     // pl. 16GB GDDR6X (GPU esetén)
  ramType?: string;  // pl. DDR5 (RAM esetén)
  tdp?: string;      // pl. 125W
  price: number;
  stock?: number;
  url?: string;      // Gyártói weboldal link
  description?: string; // Rövid leírás
  capacity?: string;   // <--- Ezt add hozzá
  interface?: string;  // <--- Ezt add hozzá
  wattage?: string;    // <--- Ezt add hozzá
  efficiency?: string; // <--- Ezt add hozzá
  
};

export type State = {
  user: User;
  products: Product[];
  contactForm: ContactForm;
  messageSent: boolean;
  admin: AdminState;
};

export type AdminState = {
  selectedId: string;
  price: string;
  stock: string;
  message: string;
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export type Action =
  | { type: typeof SET_USER; payload: User }
  | { type: typeof LOGOUT }
  | { type: typeof SET_PRODUCTS; payload: Product[] }
  | { type: typeof UPDATE_PRODUCT; payload: Product }
  | { type: typeof SET_CONTACT_FORM; payload: ContactForm }
  | { type: typeof RESET_CONTACT_FORM }
  | { type: typeof SET_MESSAGE_SENT; payload: boolean }
  | { type: typeof SET_ADMIN_SELECTED; payload: string }
  | { type: typeof SET_ADMIN_FORM; payload: { price: string; stock: string } }
  | { type: typeof SET_ADMIN_MESSAGE; payload: string };

export const initialState: State = {
  user: null,
  products: [],
  contactForm: {
    name: '',
    email: '',
    message: '',
  },
  messageSent: false,
  admin: {
    selectedId: '',
    price: '',
    stock: '',
    message: '',
  },
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case LOGOUT:
      return { ...state, user: null };

    case SET_PRODUCTS:
      return { ...state, products: action.payload };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p,
        ),
      };

    case SET_CONTACT_FORM:
      return { ...state, contactForm: action.payload };

    case RESET_CONTACT_FORM:
      return {
        ...state,
        contactForm: { name: '', email: '', message: '' },
      };

    case SET_MESSAGE_SENT:
      return { ...state, messageSent: action.payload };

    case SET_ADMIN_SELECTED:
      return {
        ...state,
        admin: {
          ...state.admin,
          selectedId: action.payload,
        },
      };

    case SET_ADMIN_FORM:
      return {
        ...state,
        admin: {
          ...state.admin,
          price: action.payload.price,
          stock: action.payload.stock,
        },
      };

    case SET_ADMIN_MESSAGE:
      return {
        ...state,
        admin: {
          ...state.admin,
          message: action.payload,
        },
      };
    default:
      return state;
  }
}