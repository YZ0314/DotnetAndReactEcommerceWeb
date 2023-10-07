import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { Product } from '../../app/models/product'
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import LoadingButton from '@mui/lab/LoadingButton';
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';

interface Props {
    products: Product;
}
export default function ProductCard({ products }: Props) {
    const [loading, setLoading] = useState(false);
    const {setBasket}=useStoreContext();
    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId, 1)
            .then(basket=>setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }
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
                    <LoadingButton loading={loading} onClick={() => handleAddItem(products.id)} size="small">Add to cart</LoadingButton>
                    <Button size="small" component={Link} to={`/catalog/${products.id}`}>View</Button>
                </CardActions>
            </Card>
        </>
    )
}
