import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import { Form, Input, Button, Alert, Space, Row, Radio } from 'antd';

import JoditEditor from "jodit-react";


const UpdateForm = (props) => {
  console.log(props);
  const [form] = Form.useForm();

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!'
  };

  //TODO: Need to update to updatePost
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

    },
  });

  //TODO: Need to update to updatePost
  const handleFormSubmit = async ({ titleItem, contentItem }) => {
    try {
      await addPost({
        variables: {
          title: titleItem,
          content: contentItem,
          user: Auth.getProfile().data.username,
        },
      });
      //reset all fields in the form
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h3>Update post</h3>

          {/* TODO: Need to update all form fields with post data*/}
          <Form
            form={form}
            layout='vertical'
            name="nest-messages"
            onFinish={handleFormSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item name="titleItem" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="contentItem" label="Content" rules={[{ required: true }]}>
              {/* <Input.TextArea /> */}
              <JoditEditor />
            </Form.Item>
            <Form.Item>
              <Row justify='end'>
                <Radio.Group>
                  <Radio value="private">Private</Radio>
                  <Radio value="public">Public</Radio>
                </Radio.Group>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row justify='end'>
                <Button type="primary" htmlType="submit">Create Post</Button>
              </Row>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className='warning'>
          <Alert
            message="You need to be logged in to make a post."
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

export default UpdateForm;
