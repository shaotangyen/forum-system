import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';

import { Typography, List, Button } from 'antd';
import { UPDATE_POST, REMOVE_POST } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const PostList = ({ posts }) => {
  const [removePost] = useMutation(REMOVE_POST, {
    // refetchQueries: [{ query: QUERY_USER}],
  });

  const [updatePost] = useMutation(UPDATE_POST);

  const handleDeletePost = async (event) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const postId = event.target.value;
    console.log(event.target);
    console.log(event.target.value);

    try {
      //Need to update cache?
      // https://hasura.io/learn/graphql/typescript-react-apollo/optimistic-update-mutations/3.1-mutation-update-cache/
      const mutationResponse = await removePost({
        variables: { _id: postId },
        // optimisticResponse: true,
        // update: (cache) => {
        //   const existingPost = cache.readQuery({ query: QUERY_POSTS });
        //   const newPost = existingPost.filter(t => (t.id !== todo.id));
        //   cache.writeQuery({
        //     query: GET_MY_TODOS,
        //     data: { todos: newPost }
        //   });
        // }
      });
      console.log('delete done');
    } catch (err) {
      console.error(err);
    }
  }

  const handleUpdatePost = async (event) => {
    console.log(event.target);
    console.log(event.target.value);
    const postId = event.target.value;

    //Redirect to the edit page


  }

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>All posts</h3>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={item => (
          <List.Item actions={
            Auth.loggedIn() && (Auth.getProfile().data.username === item.user) &&
            ([
              //to do: edit/update post, delete still not working
              <Button onClick={handleUpdatePost} value={item._id}>edit</Button>,
              <Button onClick={handleDeletePost} value={item._id}>delete</Button>
            ])
          }>
            <List.Item.Meta
              title={<Link to={`/posts/${item._id}`}><Title level={5}>{item.title}</Title></Link>}
            />
            {/* <Link to={`/profile/${item.user}`}> */}
              <Text className='list-item-tyle' type="secondary">
                {item.user}
              </Text>
            {/* </Link> */}
            <Text className='list-item-tyle' type="secondary">{item.createdAt}</Text>
          </List.Item>
        )}
      />

    </div>
  )
};

export default PostList;

// if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//   return <Redirect to="/profile/me" />;
// }