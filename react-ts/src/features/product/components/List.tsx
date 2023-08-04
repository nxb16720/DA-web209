
import Skeleton from "react-loading-skeleton";
import { useGetProductsQuery } from "../../../api/productApi"
import ProductItem from "./Item"


const ProductList = () => {

    const {data:items,isLoading,error} = useGetProductsQuery()

    if (isLoading) return <Skeleton count={3} height={35} />;
    if (error) {
        if ('data' in error && 'status' in error) {
            return (
                <div>{error.status}-{JSON.stringify(error.data)}</div>
            )
        }
    };

    return (
      <>
      <header className="pb-4 pt-2">
        <h1 className="text-2xl text-center">Product Page</h1>
      </header>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {items?.map((item:any)=>{
            return (<div key={item.id} className="rounded-lg bg-gray-100"><ProductItem item={item}/></div>)
        })}
 
      </div>
      </>
      
    )
  }
  
  export default ProductList