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



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Login() {
    const dispatch=useAppDispatch();

    const navigate=useNavigate();
    const { register, handleSubmit, formState: { isSubmitting,errors,isValid } } = useForm({
        mode:'onTouched'
    });
    async function submitForm(data: FieldValues) {
       
      const islogin=  await dispatch(signInUser(data));
     if(islogin.meta.requestStatus==='fulfilled') navigate('/catalog');
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
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            autoFocus
                            {...register('username',{required:'Username is required'})}
                            error={!!errors.username}
                            helperText={errors?.username?.message as string}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth

                            label="Password"
                            type="password"
                            {...register('password',{required:'Password is required'})}
                            error={!!errors.password}
                            helperText={errors?.password?.message as string}
                            
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <LoadingButton
                            loading={isSubmitting}
                            disabled={!isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </LoadingButton>
                        <Grid container>

                            <Grid item>
                                <Link to='/register'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}