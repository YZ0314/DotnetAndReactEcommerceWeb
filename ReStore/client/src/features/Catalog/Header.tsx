import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'
import SwitchTheme from './SwitchTheme'
import { NavLink } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },

]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },


]

interface Props {
  changeTheme: () => void;
  darkMode: boolean;

}

export default function Header({ changeTheme, darkMode }: Props) {
  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant='h6' component={NavLink} to='/' sx={{color:'inherit',textDecoration:'none'}}> RE-STORE </Typography>
        <SwitchTheme darkMode={darkMode} changeTheme={changeTheme}></SwitchTheme>
        <List sx={{ display: 'flex' }}>{midLinks.map(({ title, path }) => (
          <ListItem component={NavLink} to={path} key={path} sx={{ color: 'inherit', typography: 'h6' }}>{title.toUpperCase()}</ListItem>
        ))}</List>
        <IconButton size='large' edge='start' color='inherit' sx={{mr:2}}>
          <Badge badgeContent='4' color='secondary' >
            <ShoppingCart/>
          </Badge>

        </IconButton>

        <List sx={{ display: 'flex' }}>{rightLinks.map(({ title, path }) => (
          <ListItem component={NavLink} to={path} key={path} sx={{ color: 'inherit', typography: 'h6' }}>{title.toUpperCase()}</ListItem>
        ))}</List>
      </Toolbar>


    </AppBar>
  )
}
