import { useEffect, useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from '../../features/Catalog/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { setBasket } from '../../features/basket/BasketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';




export default function App() {
 const dispatch=useAppDispatch();
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    dispatch(fetchCurrentUser());
    if (buyerId){
      agent.Basket.get()
      .then(basket=>dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
    }
    else{
      setLoading(false);
    }
  },[dispatch])

  const [darkMode,setDarkMode]=useState(false);
  const palettetype=darkMode?'dark':'light';
 const theme=createTheme({
  palette:{
    mode:palettetype
  }
 })

 function changeTheme(){
  setDarkMode(!darkMode)
 }

 if(loading) return<LoadingComponent message='Initialising App...'/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'></ToastContainer>
    <CssBaseline/>
     <Header darkMode={darkMode} changeTheme={changeTheme}></Header>
     <Container>
      <Outlet/>
    </Container>
    </ThemeProvider>
    
  )
}
