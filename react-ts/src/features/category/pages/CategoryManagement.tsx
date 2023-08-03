import { useGetCategoriesQuery } from "../../../api/categoryApi";
import Skeleton from "react-loading-skeleton";
import TableC from "../components/Table";

const CategoryManagement = () => {
    const {data:items,isLoading,error} = useGetCategoriesQuery()

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
        <TableC items={items} />
    </div>
  )
}

export default CategoryManagement