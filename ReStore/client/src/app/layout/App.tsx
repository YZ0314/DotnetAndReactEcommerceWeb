import React, { useEffect, useState } from 'react'
import { Product } from '../models/product';
import Catalog from '../../features/Catalog/Catalog';
import { Container, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import Header from '../../features/Catalog/Header';





export default function App() {
  const [darkMode,setDarkMode]=useState(false);
  const palettetype=darkMode?'dark':'light';
 const theme=createTheme({
  palette:{
    mode:palettetype
  }
 })
 
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
     <Header></Header>
     <Container>
      <Catalog/>
    </Container>
    </ThemeProvider>
    
  )
}
