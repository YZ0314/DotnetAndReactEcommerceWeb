import React, { useEffect, useState } from 'react'
import { Product } from '../models/product';
import Catalog from '../../features/Catalog/Catalog';
import { Container, CssBaseline, Switch, ThemeProvider, Typography, createTheme } from '@mui/material';
import Header from '../../features/Catalog/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import { error } from 'console';
import LoadingComponent from './LoadingComponent';




export default function App() {
  const{setBasket}=useStoreContext();
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    if (buyerId){
      agent.Basket.get()
      .then(basket=>setBasket(basket))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
    }
  },[setBasket])

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
