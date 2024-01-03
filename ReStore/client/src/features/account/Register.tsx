import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { error } from 'console';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import { useState } from 'react';
import { Pattern } from '@mui/icons-material';
import { toast } from 'react-toastify';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface ErrorMessages {
  [key: string]: string[];
}

export default function Register() {
  const navigate= useNavigate();
  const { register, handleSubmit,setError, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'onTouched'
  });
 
  function handleApiErrors(errors: any){
    

    if(errors){
      const errorsAnnotation: ErrorMessages = errors;
      
      for (const [errorType,messages] of Object.entries(errorsAnnotation)){
    for ( const message of messages) {
      if(message.includes('Password')){
        setError('password',{message:message})
      }else if(message.includes('Email')){
        setError('email',{message:message})
      }else if(message.includes('Username')){
        setError('username',{message:message})
      }

      };
    }
  }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(data => agent.Account.register(data)
          .then(()=>{
            toast.success('Registration successful - you can now login')
            navigate('/login')
          })
            .catch(errors => handleApiErrors(errors.data.errors)))} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              autoFocus
              {...register('email', { required: 'Email is required',
            pattern:{
              value:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message:'Not a valid email address' 
            }
            })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />

            <TextField
              margin="normal"
              required
              fullWidth

              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' 
              })}
              error={!!errors.password}
              helperText={errors?.password?.message as string}


            />

            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>

              <Grid item>
                <Link to='/login'>
                  {"Already have an account? Log in "}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}