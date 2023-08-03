import {Navigate,createBrowserRouter} from 'react-router-dom'
import LayoutClient from './layout/LayoutClient'
import LayoutAdmin from './layout/LayoutAdmin'
import ProductPage from './features/product/pages/ProductPage'

import Dashboard from './features/product/pages/Dashboard'
import ProductManagement from './features/product/pages/ProductManagement'
import CategoryManagement from './features/category/pages/CategoryManagement'

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<LayoutClient/>,
        children:[
            {index:true,element: <div>Homepage</div>},
            {path:'about',element: <div>About</div>},
            {path:'products',element: <ProductPage/>},
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