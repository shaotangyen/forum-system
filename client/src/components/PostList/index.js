import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';

import { Typography, List, Space, Avatar } from 'antd';
import { UPDATE_POST, REMOVE_POST } from '../../utils/mutations';

import { getTextFromHtml } from "../../utils/plaintextConvert.js";

const { Text, Title } = Typography;

const PostList = ({ posts }) => {
  const [removePost] = useMutation(REMOVE_POST, {
  });

  const [updatePost] = useMutation(UPDATE_POST);

  const handleDeletePost = async (event) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const postId = event.target.value;

    try {
      await removePost({
        variables: { postId: postId },
      });
      // console.log('delete done');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  const handleUpdatePost = async (event) => {
    const postId = event.target.value;
    //Redirect to the edit page
  }

  if (!posts.length) {
    return <h4>You do not have any posts so far. <Link to="/posts">Make one</Link> now.</h4>;
  }

  const getContent = (str) => {
    //get plain text from the html content and get the first 10 words out of it
    const firstTen = getTextFromHtml(str).split(' ').slice(0, 10).join(' ') + "  ...";

    return { __html: `${firstTen}` };
  }

  return (
    <div>
      <h3>All posts</h3>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={item => (
          <List.Item className="list-item">
            <List.Item.Meta className="list-meta"
              // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={
                <div className="list-title">
                  <Link to={`/posts/${item._id}`}><Title level={5}>{item.title}</Title></Link>
                </div>
              }
              description={
                <div className="list-desc">
                  <span dangerouslySetInnerHTML={getContent(item.content)} />
                  <Link
                    className="ant-typography ant-typography-secondary"
                    to={`/posts/${item._id}`}>
                    Read more
                  </Link>
                </div>
              }
            />
            <div className="list-tool">
              {Auth.loggedIn() &&
                (Auth.getProfile().data.username === item.user) && <div className="list-edit">
                  <button className='ant-btn ant-btn-link' onClick={handleUpdatePost} value={item._id}>edit</button></div>}
              {Auth.loggedIn() &&
                (Auth.getProfile().data.username === item.user) && <div className="list-delete">
                  <button className='ant-btn ant-btn-text ant-btn-dangerous' onClick={handleDeletePost} value={item._id}>delete</button></div>}
              <div className="list-user"><Text type="secondary">{item.user}</Text></div>
              <div className="list-date"><Text type="secondary">{item.createdAt}</Text></div>
            </div>
          </List.Item>
        )}
      />

    </div>
  )
};

export default PostList;