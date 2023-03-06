import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useState, ReactNode } from 'react';
import api from '../services/api';

interface teddste {
  email: string;
  name: string;
  id: number;
}

interface IUser {
  accessToken: string;
  user: teddste;
}

interface IUserContext {
  user: IUser | null;
  loginUser: (data: loginData) => void;
  registerUser: (data: RegisterData) => void;
}

interface IUserProviderProps {
  children: ReactNode;
}

interface loginData {
  email: string;
  password: string;
}
interface RegisterData {
  email: string;
  password: string;
  name: string;
}
export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  async function loginUser(data: loginData) {
    try {
      const request = await api.post('/login', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setUser(request.data);
      toast.success('Logado com sucesso', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      localStorage.setItem('@TOKEN', JSON.stringify(request.data.accessToken));
      localStorage.setItem('@USER', JSON.stringify(request.data.user));
      navigate('/shop');
    } catch (error) {
      toast.error('Email ou senha inválidos', {
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
  async function registerUser(data: RegisterData) {
    try {
      await api.post('/users', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Cadastrado com sucesso', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      navigate('/');
    } catch (error) {
      toast.error('Email já existe', {
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
  return (
    <UserContext.Provider value={{ user, loginUser, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};
