import {Navigate,createBrowserRouter} from 'react-router-dom'
import LayoutClient from './layout/LayoutClient'
import LayoutAdmin from './layout/LayoutAdmin'
import ProductPage from './features/product/pages/ProductPage'
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
            {path:'dashboard',element:<div>Dashboard page</div>},
            {path:'products',element:<div>Product management page</div>},
        ]
    },
    {path:"*",element:<div>Not Found Page</div>}
])