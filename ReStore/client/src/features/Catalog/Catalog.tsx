import { useEffect } from 'react'
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFilters, fetchProductsAsync, productSelectors } from './catalogSlice';
import { Product } from '../../app/models/product';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, TextField } from '@mui/material';


const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price -Low to high' },

]
export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded, status, filtersLoaded,brands,types} = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch();


  /**
   * fetch the products dtat from .net web api 
   */
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())

  }, [productsLoaded, dispatch])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());

  }, [filtersLoaded, dispatch])

  if (status.includes('pending')) return <LoadingComponent message='Loading products...' />

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField
            label='Search products'
            variant='outlined'
            fullWidth
          />

        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <RadioGroup>
              {sortOptions.map(({ value, label }) => (<FormControlLabel value={value} control={<Radio />} label={label} key={value} />))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{mb: 2, p: 2 }}>
          <FormGroup>
            {brands.map(brands=>(<FormControlLabel control={<Checkbox />} label={brands} key={brands} />))}
          </FormGroup>
        </Paper>

        <Paper sx={{mb: 2, p: 2 }}>
          <FormGroup>
            {types.map(types=>(<FormControlLabel control={<Checkbox />} label={types} key={types} />))}
          </FormGroup>
        </Paper>




      </Grid>
      <Grid item xs={9}>
        <ProductList products={products as Product[]}></ProductList>

      </Grid>


    </Grid>
  )
}
