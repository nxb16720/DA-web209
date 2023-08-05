import { Button, Form, Input, message } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "../../../api/categoryApi";

type FieldType = {
    name?: string;
    
};

const CategoryAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [addCategory, { isLoading: isAddCategoryLoading }] = useAddCategoryMutation();
    const onFinish = (values: any) => {
        addCategory(values)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Thêm danh mục thành công. Xin đợi giây lát",
                });
                form.resetFields();
                setTimeout(() => {
                    navigate("/admin/category");
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
                <h2 className="text-2xl">Thêm danh mục</h2>
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
                <Form.Item<FieldType>
                    label="Tên danh mục"
                    name="name"
                    rules={[
                        { required: true, message: "Tên danh mục không được để trống!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        {isAddCategoryLoading ? (
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

export default CategoryAdd;