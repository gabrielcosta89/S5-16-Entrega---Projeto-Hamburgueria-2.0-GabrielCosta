import { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

interface IcartProps {
  children: ReactNode;
}
interface IcartContext {
  logOutUser: () => void;
  burguers: IburguerList[];
  addToCart: (data: IburguerList) => void;
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCartModal: boolean;
  cartBurguers: IburguerList[];
  removeAllFromCart: () => void;
  removeFromCart: (data: IburguerList) => void;
}

interface IburguerList {
  id: number;
  category: string;
  price: number;
  img: string;
  name: string;
}
export const cartContext = createContext({} as IcartContext);

export const CartProvider = ({ children }: IcartProps) => {
  const [burguers, setBurguers] = useState<IburguerList[]>([]);
  const [cartBurguers, setCartBurguers] = useState<IburguerList[]>([]);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const navigate = useNavigate();

  function addToCart(data: IburguerList) {
    if (!cartBurguers.includes(data)) {
      setCartBurguers([...cartBurguers, data]);
      toast.success('Adicionado ao carrinho', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      toast.info('Produto já adicinado', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }
  function removeFromCart(data: IburguerList) {
    const filtered = cartBurguers.filter((burguer) => burguer !== data);

    setCartBurguers(filtered);
  }
  function removeAllFromCart() {
    setCartBurguers([]);
  }

  useEffect(() => {
    async function getBurguerList() {
      const token = JSON.parse(localStorage.getItem('@TOKEN') as string);
      if (token) {
        try {
          const request = await api.get('/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBurguers(request.data);
        } catch (error) {
          toast.error(`${error}`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      }
    }
    getBurguerList();
  }, []);

  async function logOutUser() {
    localStorage.clear();
    navigate('/');
  }
  return (
    <cartContext.Provider
      value={{
        logOutUser,
        burguers,
        addToCart,
        setShowCartModal,
        showCartModal,
        cartBurguers,
        removeAllFromCart,
        removeFromCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
