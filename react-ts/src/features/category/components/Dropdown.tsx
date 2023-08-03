import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useGetCategoriesQuery } from '../../../api/categoryApi';
import { Link } from 'react-router-dom';
 
const DropdownCate = () => {
    const {data} = useGetCategoriesQuery()
    const newData = data?.map(((item:any)=>({key:item?.id,label:(<Link to={`${item?.id}/category`}>{item?.name}</Link>)})))
    const items: MenuProps['items'] = newData
  return (
    <div>
        <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Category
      </Space>
    </a>
  </Dropdown>
    </div>
  )
}

export default DropdownCate