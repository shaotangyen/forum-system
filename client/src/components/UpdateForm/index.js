import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { UPDATE_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_SINGLE_POST } from '../../utils/queries';

import Auth from '../../utils/auth';
import { Form, Input, Button, Alert, Space, Row, Radio, Spin as Loading } from 'antd';

import JoditEditor from "jodit-react";


const UpdateForm = (props) => {
  const { postId } = useParams();
  // console.log(postId); Got the post ID
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { _id: postId },
  });

  const post = data?.post || {};

  const [form] = Form.useForm();

  const editor = useRef(null);
  console.log("post.title", post.title); //Wwrks
  console.log("post.content", post.content); //works

  // console.log("content",content); For some reason not working
  const [content, setContent] = useState(post.content);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 800
  };

  const handleUpdate = (event) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!'
  };

  const [updatePost] = useMutation(UPDATE_POST);

  useEffect(() => {
    setContent(post.content);
  }, [post, setContent]);

  if (loading) {
    return <div style={{ textAlign: 'center' }}><Loading /></div>;
  }
  
  const handleFormSubmit = async ({ titleItem, contentItem }) => {
    console.log(titleItem);
    console.log(contentItem);
    try {
      await updatePost({
        variables: {
          postId: postId,
          title: titleItem,
          content: contentItem,
        },
      });
      // not sure what's the react way to redirect to a different link
      //using window.location for now
      window.location.href = "/posts/"+postId;
    } catch (err) {
      console.error(err);
    }
  };

  // const handleFormSubmit = async ({ titleItem, contentItem }) => {
  //   try {
  //     await addPost({
  //       variables: {
  //         title: titleItem,
  //         content: contentItem,
  //         user: Auth.getProfile().data.username,
  //       },
  //     });
  //     //reset all fields in the form
  //     form.resetFields();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
              <Input
                defaultValue={post.title}
              />
            </Form.Item>
            <Form.Item name="contentItem" label="Content" rules={[{ required: true }]}>
              {/* <Input.TextArea /> */}
              <JoditEditor
                ref={editor}
                value={content} //Not working for some reason
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={handleUpdate} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              /><div></div>
              {/* <textarea>
                { post.content}
              </textarea> */}
            </Form.Item>
            <Form.Item>
              <Row justify='end'>
                <Radio.Group value="public">
                  <Radio value="private">Private</Radio>
                  <Radio value="public">Public</Radio>
                </Radio.Group>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row justify='end'>
                <Space>
                  <Button type="secondary" htmlType="submit">
                    {/* Shuold go to the previous page */}
                  <Link to={`/posts/`}>Cancel</Link>
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Update Post
                  </Button>
                </Space>
              </Row>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className='warning'>
          <Alert
            message="You need to be logged in to update your post."
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
