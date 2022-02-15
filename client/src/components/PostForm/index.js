import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import { Form, Input, Button, Alert, Space, Row, Radio } from 'antd';

import JoditEditor from "jodit-react";


const PostForm = () => {
  const [form] = Form.useForm();

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!'
  };

  const editor = useRef(null);
  const [content, setContent] = useState('');
  // console.log(content);
  //for editor, all options from https://xdsoft.net/jodit/doc/

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

      // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, posts: [...me.posts, addPost] } },
      // });
    },
  });

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
          <h3>Create post</h3>

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
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              />
            </Form.Item>
            <Form.Item>
              <Row justify='end'>
                <Radio.Group value="public">
                  <Radio value="private">Private (WIP)</Radio>
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
            className='warning-content'
            message="You need to be logged in to make a post."
            type="warning"
            showIcon
            action={
              <div className="warning-action">
                <div className="warning-action-item">
                  <Button size="small" type="ghost">
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
                <div className="warning-action-item">
                  <Button size="small" type="ghost">
                    <Link to="/signup">Signup</Link>
                  </Button>
                </div>
              </div>
            }
            closable
          />
        </div>
      )}
    </div>
  );
};

export default PostForm;