import React, { useEffect, useState } from 'react'
import { Product } from '../models/product';
import Catalog from '../../features/Catalog/Catalog';
import { Container, CssBaseline, Switch, ThemeProvider, Typography, createTheme } from '@mui/material';
import Header from '../../features/Catalog/Header';





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
    <CssBaseline/>
     <Header darkMode={darkMode} changeTheme={changeTheme}></Header>
     <Container>
      <Catalog/>
    </Container>
    </ThemeProvider>
    
  )
}
