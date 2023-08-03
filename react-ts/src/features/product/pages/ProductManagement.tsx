
import { useGetProductsQuery } from '../../../api/productApi';
import Table from '../components/Table'
import Skeleton from "react-loading-skeleton";

const ProductManagement = () => {
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
    <div>
        <Table items={items} />
    </div>
  )
}

export default ProductManagement