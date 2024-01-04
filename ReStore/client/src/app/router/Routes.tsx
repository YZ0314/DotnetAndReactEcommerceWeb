import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/homePage";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";

export const router =createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {element:<RequireAuth/>, children:[
                {path:'checkout',element:<CheckoutPage></CheckoutPage>},
            ]},
            {path:'',element:<HomePage></HomePage>},
            {path:'catalog',element:<Catalog></Catalog>},
            {path:'catalog/:id',element:<ProductDetails></ProductDetails>},
            {path:'about',element:<AboutPage></AboutPage>},
            {path:'contact',element:<ContactPage></ContactPage>},
            {path:'basket',element:<BasketPage></BasketPage>},

            {path:'login',element:<Login></Login>},
            {path:'register',element:<Register></Register>},
            {path:'*',element:<Navigate replace to='/not-found'/>}
        ]
    }
])