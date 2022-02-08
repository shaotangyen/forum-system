import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';
import { Form, Input, Button, Alert, Space, Row, Typography, Divider } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const CommentForm = ({ postId }) => {
  const [form] = Form.useForm();

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!'
  };

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async ({ content }) => {
    try {
      const { data } = await addComment({
        variables: {
          postId,
          content,
          user: Auth.getProfile().data.username,
        },
      });

      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="site-layout-content">
      <Divider />
      <Title level={4} className='primary-color'>Leave a Comment</Title>

      {Auth.loggedIn() ? (
        <>
          <Form
            form={form}
            layout='vertical'
            name="nest-messages"
            onFinish={handleFormSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item name="content" rules={[{ required: true }]}>
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Row justify='start'>
                <Button type="primary" htmlType="submit">Leave Comment</Button>
              </Row>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className='warning'>
          <Alert
            message="You need to be logged in to leave a comment."
            type="warning"
            showIcon
            action={
              <Space>
                <Button size="small" type="ghost">
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="small" type="ghost">
                  <Link to="/signup">Signup</Link>
                </Button>
              </Space>
            }
            closable
          />
        </div>
      )}
    </div>
  );
};

export default CommentForm;
