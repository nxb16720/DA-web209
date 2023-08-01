import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hook"
import ProductItem from "./Item"
import { fetchProduct } from "../productSlice"



const ProductList = () => {
    const dispatch = useAppDispatch()
    const {items,isLoading,error} = useAppSelector((state:any)=>state.products)

    useEffect(()=>{
        dispatch(fetchProduct())
    },[])
    console.log(items);

    
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {items?.map((item:any)=>{
            return (<div key={item.id} className="rounded-lg bg-gray-100"><ProductItem item={item}/></div>)
        })}
 
      </div>
    )
  }
  
  export default ProductList