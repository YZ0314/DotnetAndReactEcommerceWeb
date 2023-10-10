import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from '@mui/material'
import { Product } from '../../app/models/product'
import { Link } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync } from '../basket/BasketSlice';

interface Props {
    products: Product;
}
export default function ProductCard({ products }: Props) {
    const{status}=useAppSelector(s=>s.basket);
    const dispatch=useAppDispatch();
   
    return (
        <>
            <Card >
                <CardHeader avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {products.name.charAt(0).toUpperCase()}
                    </Avatar>}
                    title={products.name}
                    titleTypographyProps={{ sx: { fontWeight: 'bold', color: 'primary.main' } }}
                >

                </CardHeader>
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                    image={products.pictureUrl}
                    title={products.name}
                />
                <CardContent>
                    <Typography gutterBottom color='secondary' variant="h5" >
                        {products.brand}/{products.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       {currencyFormat(products.price)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton loading={status.includes('pendingAdditem'+products.id)} onClick={() => dispatch(addBasketItemAsync({productId: products.id}))} size="small">Add to cart</LoadingButton>
                    <Button size="small" component={Link} to={`/catalog/${products.id}`}>View</Button>
                </CardActions>
            </Card>
        </>
    )
}
