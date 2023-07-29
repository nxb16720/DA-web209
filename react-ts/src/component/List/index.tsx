import React from 'react'
import ProductItem from '../Item'

type Props = {}

const ProductList = (props: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className="h-32 rounded-lg bg-gray-100"><ProductItem/></div>
        <div className="h-32 rounded-lg bg-gray-100"><ProductItem/></div>
        <div className="h-32 rounded-lg bg-gray-100"><ProductItem/></div>
        <div className="h-32 rounded-lg bg-gray-100"><ProductItem/></div>  
    </div>
  )
}

export default ProductList