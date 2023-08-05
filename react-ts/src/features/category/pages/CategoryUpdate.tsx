import { Button, Form, Input, Skeleton, message } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../../../api/categoryApi";

type FieldType = {
    name?: string;
};

const CategoryUpdate = () => {
    const { id } = useParams();
    
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryByIdQuery(
        id || ""
    );

    const [updateProduct, { isLoading: isUpdateLoading }] = useUpdateCategoryMutation();

    useEffect(()=>{
        form.setFieldsValue(categoryData);
    },[categoryData])
    const onFinish = (values: any) => {
        updateProduct({ ...values, id:id })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Cập nhật danh mục thành công. Hãy chờ một chút",
                });
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
                <h2 className="text-2xl">Cập nhật danh mục</h2>
            </header>
            {isCategoryLoading ? (
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

export default CategoryUpdate;