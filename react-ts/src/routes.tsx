import { Navigate, createBrowserRouter, useNavigate, Outlet } from 'react-router-dom'
import LayoutClient from './layout/LayoutClient'
import LayoutAdmin from './layout/LayoutAdmin'
import ProductPage from './features/product/pages/ProductPage'

import Dashboard from './features/product/pages/Dashboard'
import ProductManagement from './features/product/pages/ProductManagement'
import CategoryManagement from './features/category/pages/CategoryManagement'

import ProductDetail from './features/product/pages/ProductDetail'
import CategoryDetail from './features/category/pages/CategoryDetail'
import HomePage from './features/home/page/HomePage'
import AdminProductAdd from './features/product/pages/ProductAdd'
import AdminProductUpdate from './features/product/pages/ProductUpdate'
import CategoryAdd from './features/category/pages/CategoryAdd'
import CategoryUpdate from './features/category/pages/CategoryUpdate'
import AboutPage from './features/home/page/AboutPage'
import PageNotFound from './features/home/page/PageNotFound'

import Signin from './features/auth/signin'
import Signup from './features/auth/signup'

import { useEffect } from "react";
const PrivateRoute = ({ isAuth }: any) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/signin");
        }
    }, [isAuth]);

    return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <LayoutClient />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'products', element: <ProductPage /> },
            { path: 'products/:id', element: <ProductDetail /> },
            { path: '/:id/category', element: <CategoryDetail /> },

            { path: 'signin', element: <Signin /> },
            { path: 'signup', element: <Signup /> },

        ]
    },

    {
        path: '/admin',
        element: <PrivateRoute isAuth={true} />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    { index: true, element: <Navigate to='dashboard' /> },
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'products', element: <ProductManagement /> },
                    { path: 'products/add', element: <AdminProductAdd /> },
                    { path: 'products/:id/update', element: <AdminProductUpdate /> },
                    { path: 'category', element: <CategoryManagement /> },
                    { path: 'category/add', element: <CategoryAdd /> },
                    { path: 'category/:id/update', element: <CategoryUpdate /> },
                ]
            }
        ]
    },
    { path: "*", element: <PageNotFound /> }
])