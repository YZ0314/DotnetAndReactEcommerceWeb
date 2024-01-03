import { useCallback, useEffect, useState } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from '../../features/Catalog/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/BasketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice';




export default function App() {
 const dispatch=useAppDispatch();
  const[loading,setLoading]=useState(true);

 const initApp=useCallback(async ()=>{
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
      
    }
  },[dispatch])

  useEffect(()=>{
    initApp().then(()=> setLoading(false))
  },[initApp])

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
