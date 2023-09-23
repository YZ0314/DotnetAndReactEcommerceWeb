import { AppBar, Switch, Toolbar,Typography } from '@mui/material'
import React from 'react'
import SwitchTheme from './SwitchTheme'

interface Props{
  changeTheme:()=>void;
  darkMode:boolean;

}

export default function Header({changeTheme,darkMode}:Props) {
  return (
    <AppBar position='static' sx={{mb:4}}>
      <Toolbar>
        <Typography variant='h6'> RE-STORE </Typography>
        <SwitchTheme darkMode={darkMode} changeTheme={changeTheme}></SwitchTheme>
      </Toolbar>

      
    </AppBar>
  )
}
