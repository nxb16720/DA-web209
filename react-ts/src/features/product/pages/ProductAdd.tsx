import { Button, Form, Input, message,Select } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../api/productApi";
import { useGetCategoriesQuery } from "../../../api/categoryApi";

type FieldType = {
    name?: string;
    price?: number;
    categoryId?:number
};
const { Option } = Select;
const AdminProductAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addProduct, { isLoading: isAddProductLoading }] = useAddProductMutation();
    const {data:category} = useGetCategoriesQuery()

    const onFinish = (values: any) => {
        addProduct(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Thêm sản phẩm thành công. Xin đợi giây lát",
                });
                form.resetFields();
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
                <h2 className="text-2xl">Thêm sản phẩm</h2>
            </header>
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
                        { min: 3, message: "Tên sản phẩm quá ngắn" },
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
                        {isAddProductLoading ? (
                            <AiOutlineLoading className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AdminProductAdd;