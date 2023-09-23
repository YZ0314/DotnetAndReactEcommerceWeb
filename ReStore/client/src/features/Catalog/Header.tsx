import { AppBar, Toolbar,Typography } from '@mui/material'
import React from 'react'

export default function Header() {
  return (
    <AppBar position='static' sx={{mb:4}}>
      <Toolbar>
        <Typography variant='h6'> RE-STORE </Typography>
      </Toolbar>
    </AppBar>
  )
}
