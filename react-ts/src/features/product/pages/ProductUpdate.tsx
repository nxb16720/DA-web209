import { Button, Form, Input, Skeleton, message,Select } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../../api/productApi";
import { useEffect } from "react";
import { useGetCategoriesQuery } from "../../../api/categoryApi";

type FieldType = {
    name?: string;
    price?: number;
    categoryId?:number
};
const { Option } = Select;
const AdminProductUpdate = () => {
    const { id } = useParams();
    
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery(
        id || ""
    );

    const [updateProduct, { isLoading: isUpdateLoading }] = useUpdateProductMutation();
    const {data:category} = useGetCategoriesQuery()

    useEffect(()=>{
        form.setFieldsValue(productData);
    },[productData])
    const onFinish = (values: any) => {
        updateProduct({ ...values, id:id })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Cập nhật sản phẩm thành công. Hãy chờ một chút",
                });
                setTimeout(() => {
                    navigate("/admin/products");
                }, 2000);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            {contextHolder}
            <header className="mb-4">
                <h2 className="text-2xl">Cập nhật sản phẩm</h2>
            </header>
            {isProductLoading ? (
                <Skeleton />
            ) : (
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item name="categoryId" label="Danh mục sản phẩm" rules={[{ required: true }]}>
                        <Select
                            placeholder="Danh mục"                   
                            allowClear
                            >
                                {category?.map((item:any)=>(<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            { required: true, message: "Tên sản phẩm không được để trống!" },
                            { min: 3, message: "Tên sản phẩm ít nhất phải 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Giá sản phẩm"
                        name="price"
                        rules={[{ required: true, message: "Hãy nhập giá tiền" }]}
                    >
                        <Input type="Number"/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {isUpdateLoading ? (
                                <AiOutlineLoading className="animate-spin" />
                            ) : (
                                "Cập nhật"
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default AdminProductUpdate;