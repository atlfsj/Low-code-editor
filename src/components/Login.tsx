import {Button, Form, Input, Checkbox, Modal} from "antd";
import {useEffect} from "react";
import useUserStore, {fetchUserInfo, login, registerAndLogin, logout} from "../store/userStore";
import useGlobalStore from "../store/globalStore";

export default function Login() {
    const {isLogin, name} = useUserStore();
    const loading = useGlobalStore((state) => state.loading);

    useEffect(() => {
        fetchUserInfo();
    }, []);
    if (loading) {
        return null;
    }
    if(isLogin){
        return (
            <Button style={{float: "right", marginTop: 16}} onClick={logout}>
                {name}退出登录
            </Button>
        );
    } else {

    const onFinish = (
        {
            name,
            password,
            register_login,
        } : {
            name: string;
            password: string;
            register_login: boolean;
        }
    ) => {
        if(register_login){
            registerAndLogin({name, password});
            console.log("register_login："+ name + "," + password);
        } else {
            login({name, password});
            console.log("login："+ name + "," + password);
        }
    };

    const onFinishFailed = () => {
        console.log('Failed:');
    };

    return (
        <Modal title="注册与登录" open={true} closable={false} footer={[]}>
            <p className="red">登录之后才可使用~</p>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item
                    label="用户名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="register_login"
                    valuePropName="checked"
                    wrapperCol={{offset: 7}}>
                    <Checkbox className="red">注册并登录</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
    }

}

