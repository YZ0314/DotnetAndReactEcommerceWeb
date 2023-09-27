import React, { useEffect, useState } from 'react'
import { Product } from '../models/product';
import Catalog from '../../features/Catalog/Catalog';
import { Container, CssBaseline, Switch, ThemeProvider, Typography, createTheme } from '@mui/material';
import Header from '../../features/Catalog/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'




export default function App() {
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
