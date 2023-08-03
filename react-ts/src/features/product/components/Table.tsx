import { Link } from "react-router-dom"
import { useAddProductMutation, useRemoveProductMutation, useUpdateProductMutation } from "../../../api/productApi"
import { Button } from "../../../component"
import {message, Popconfirm} from 'antd'
type Props = {
    items: any
}

const text = 'Are you sure to delete this task?';
const description = 'Delete the task';


const Table = ({items}: Props) => {
    const [addProduct] = useAddProductMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [removeProduct] = useRemoveProductMutation()
    const confirm = (id:any) => {
        removeProduct(id)
      message.info('Clicked on Yes.');
    };
  return (
    <div>
        <div className="p-2"><Button type="primary" onClick={()=>addProduct({name:"Product test",price:1234})}>Add</Button></div>
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
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Category
                </th>
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
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">Cate</td>
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
                                        <Button type="danger">Delete</Button>
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