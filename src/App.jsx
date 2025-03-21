import { useEffect, useState } from 'react';
import './App.css'
import './index.css'; 
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {

  // console.log(import.meta.env.VITE_WRITE_URL);
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  },[dispatch]);

  // conditional rendering
  return !loading ? (
    <div className='bg-gray-300'>
      <h1 className='text-red-500'>Hello Developers...</h1>
        <Header/>
        <Footer/>
    </div>
  ) : null;

}
  
export default App
