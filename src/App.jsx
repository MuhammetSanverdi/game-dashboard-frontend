import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { PacmanLoader } from 'react-spinners'
import Spinner from './pages/Spinner'
import BuildingTable from './components/BuildingsTable'
import MainPage from './pages/MainPage'


function App() {
  const [count, setCount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading,setIsLoading] = useState(false)


  useEffect(() => {
    const checkAuthenticated = async () => {
      const token = sessionStorage.getItem('Token');
      const expiration = sessionStorage.getItem('Expiration');
      
      if (token != null && new Date(expiration) > new Date()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthenticated();
  }, []);

  if (isAuthenticated === null) {
    return <></>
  }

  if (!isAuthenticated) {
    console.log(isLoading);
    
    return (
      <>
        <Routes>
          <Route path='/login' element={<Login setIsLoading={setIsLoading}  setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/register' element={<Register setIsLoading={setIsLoading} />} />
          <Route path='/*' element={<Navigate to='/login' />} />
        </Routes>
        <Spinner isLoading={isLoading} />
        <ToastContainer
        position="bottom-right"
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme="light"/>
      </>
    );
  } else {
    return (
      <>
      <Routes>
      <Route path='/home' element={<MainPage setIsLoading={setIsLoading} setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path='/*' element={<Navigate to='/home' />} />
      </Routes>      
       <Spinner isLoading={isLoading} />
       <ToastContainer
        position="bottom-right"
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme="light"/>
      </>
    );
  }

  
}

export default App
