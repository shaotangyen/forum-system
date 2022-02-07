import React from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Form, Input, Button, Checkbox, Breadcrumb, Row, Col, Alert, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const Signup = () => {
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleFormSubmit = async ({ usernameItem, emailItem, passwordItem }) => {
        try {
            const { data } = await addUser({
                variables: {
                    username: usernameItem,
                    email: emailItem,
                    password: passwordItem,
                },
            });

            Auth.login(data.addUser.token);
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
                            <Breadcrumb.Item>Sign up</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-content">
                            {data ? (
                                <p>
                                    Success! Now you can make a post.
                                </p>
                            ) : (
                                <Form
                                    name="normal_signup"
                                    className="signup-form"
                                    initialValues={{ remember: true }}
                                    onFinish={handleFormSubmit}
                                >
                                    <Form.Item
                                        name="usernameItem"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="Username"
                                        />
                                    </Form.Item>
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
                                            <Link to="/signup">Forgot password</Link>
                                        </Space>
                                    </Form.Item>

                                    <Form.Item>
                                        <Space>
                                            <Button type="primary" htmlType="submit" className="signup-form-button">
                                                Sign up
                                            </Button>
                                            or <Link to="/login">Log in now!</Link>
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

export default Signup;