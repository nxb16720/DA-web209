import {Navigate,createBrowserRouter} from 'react-router-dom'
import LayoutClient from './layout/LayoutClient'
import LayoutAdmin from './layout/LayoutAdmin'
import ProductPage from './features/product/pages/ProductPage'

import Dashboard from './features/product/pages/Dashboard'
import ProductManagement from './features/product/pages/ProductManagement'
import CategoryManagement from './features/category/pages/CategoryManagement'

import ProductDetail from './features/product/pages/ProductDetail'
import CategoryDetail from './features/category/pages/CategoryDetail'
import HomePage from './features/home/page/HomePage'

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<LayoutClient/>,
        children:[
            {index:true,element: <HomePage/>},
            {path:'about',element: <div>About</div>},
            {path:'products',element: <ProductPage/>},
            {path:'products/:id',element: <ProductDetail/>},
            {path:'/:id/category',element: <CategoryDetail/>},
        ]
    },
    {
        path:'/admin',
        element:<LayoutAdmin/>,
        children:[
            {index:true,element: <Navigate to='dashboard'/>},
            {path:'dashboard',element:<Dashboard/>},
            {path:'products',element:<ProductManagement/>},
            {path:'category',element:<CategoryManagement/>},
            
        ]
    },
    {path:"*",element:<div>Not Found Page</div>}
])