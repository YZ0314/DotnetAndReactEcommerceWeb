import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from '@mui/material'
import React from 'react'
import { Product } from '../../app/models/product'
import { Link } from 'react-router-dom';

interface Props {
    products: Product;
}
export default function ProductCard({ products }: Props) {
    return (
        <>
            <Card >
                <CardHeader avatar={
                <Avatar sx={{bgcolor:'secondary.main'}}>
                    {products.name.charAt(0).toUpperCase()}
                </Avatar>}
                    title={products.name}
                    titleTypographyProps={{sx:{fontWeight:'bold',color:'primary.main'}}}
                >

                </CardHeader>
                <CardMedia 
                    sx={{ height: 140,backgroundSize:'contain' ,bgcolor:'primary.light'}}
                    image={products.pictureUrl}
                    title={products.name}
                />
                <CardContent>
                    <Typography gutterBottom color='secondary' variant="h5" >
                        {products.brand}/{products.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${(products.price/100).toFixed(2)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Add to cart</Button>
                    <Button size="small" component={Link} to={`/catalog/${products.id}`}>View</Button>
                </CardActions>
            </Card>
        </>
    )
}
