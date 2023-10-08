import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/homePage";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router =createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {path:'',element:<HomePage></HomePage>},
            {path:'catalog',element:<Catalog></Catalog>},
            {path:'catalog/:id',element:<ProductDetails></ProductDetails>},
            {path:'about',element:<AboutPage></AboutPage>},
            {path:'contact',element:<ContactPage></ContactPage>},
            {path:'basket',element:<BasketPage></BasketPage>},
            {path:'checkout',element:<CheckoutPage></CheckoutPage>}
        ]
    }
])