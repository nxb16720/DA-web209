import { Link } from "react-router-dom"
import { useRemoveProductMutation } from "../../../api/productApi"
import { Button } from "../../../component"
import {message, Popconfirm} from 'antd'
import { AiOutlineLoading } from "react-icons/ai";
// import { useGetCategoriesQuery} from "../../../api/categoryApi";
type Props = {
    items: any
}

const text = 'Bạn có chắc muốn xóa?';
const description = 'Xóa sản phẩm';


const Table = ({items}: Props) => {
    const [removeProduct,{isLoading:isLoadingRemoveProduct}] = useRemoveProductMutation()
    // const {data:category} = useGetCategoriesQuery()

    const confirm = (id:any) => {
        removeProduct(id).unwrap().then(()=>{
            message.info('Xóa thành công.');
        })
      
    };
  return (
    <div>
        <div className="p-2"><Button type="primary"><Link to={`add`}>Add</Link></Button></div>
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
            <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
                </th>
                {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Category
                </th> */}
                <th className="px-4 py-2">Action</th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {items?.map((item:any,index:number)=>{
                    return (<tr key={item?.id} className="text-center">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {index+1}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item?.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">${item?.price}</td>
                                {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.categoryId}</td> */}
                                <td className="whitespace-nowrap px-4 py-2 grid grid-cols-2 gap-2">
                                <div className="grid justify-items-end"><Link
                                    to={`${item.id}/update`}
                                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                >
                                    Update
                                </Link></div>
                                <div className="grid justify-items-start">
                                    <Popconfirm
                                        placement="topLeft"
                                        title={text}
                                        description={description}
                                        onConfirm={()=>confirm(item.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="danger">
                                        {isLoadingRemoveProduct ? (
                            <AiOutlineLoading className="animate-spin" />
                        ) : (
                            "Delete"
                        )}
                                        </Button>
                                    </Popconfirm>
                                    
                                    </div>
                                </td>
                            </tr>)
                            
                })}


            </tbody>
        </table>
        </div>
    </div>
  )
}

export default Table