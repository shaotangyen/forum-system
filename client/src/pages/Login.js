import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Form, Input, Button, Checkbox, Breadcrumb, Row, Col, Alert, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const Login = (props) => {
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // submit form
    const handleFormSubmit = async ({ emailItem, passwordItem }) => {
        try {
            const { data } = await login({
                variables: {
                    email: emailItem,
                    password: passwordItem,
                },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <main>
            <Row>
                <Col xs={2} sm={4} md={6} lg={8} xl={9}></Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Log in</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        {data ? (
                            <p>
                                Heading back to <Link to="/">the homepage.</Link>
                            </p>
                        ) : (
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={handleFormSubmit}
                            >
                                <Form.Item
                                    name="emailItem"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input
                                        prefix={<MailOutlined className="site-form-item-icon" />}
                                        type="email"
                                        placeholder="Email"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="passwordItem"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Space>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>
                                        <Link to="/Login">Forgot password</Link>
                                    </Space>
                                </Form.Item>

                                <Form.Item>
                                    <Space>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>
                                        or <Link to="/signup">Sign up now!</Link>
                                    </Space>
                                </Form.Item>
                            </Form>
                        )}
                        {error && (
                            <Alert message={error.message} type="error" />
                        )}
                    </div>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={9}></Col>
            </Row>
        </main>
    );
};

export default Login;