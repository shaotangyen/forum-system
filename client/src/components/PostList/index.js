import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';

import { Typography, List } from 'antd';
import { REMOVE_POST } from '../../utils/mutations';
import { QUERY_POSTS } from '../../utils/queries';

const PostList = ({ posts }) => {

  const { Text, Title } = Typography;
  const [removePost] = useMutation(REMOVE_POST);

  const handleDeletePost = async (postId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log('trying to delete');
      //Need to update cache?
      // https://hasura.io/learn/graphql/typescript-react-apollo/optimistic-update-mutations/3.1-mutation-update-cache/
      await removePost({
        variables: { postId: postId },
        // optimisticResponse: true,
        // update: (cache) => {
        //   const existingPost = cache.readQuery({ query: QUERY_POSTS });
        //   const newPost = existingPost.filter(t => (t.id !== todo.id));
        //   cache.writeQuery({
        //     query: GET_MY_TODOS,
        //     data: { todos: newPost }
        //   });
        // }
      }
      );
      console.log('delete done');
    } catch (err) {
      console.error(err);
    }

  }

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={item => (
        <List.Item actions={
          Auth.loggedIn() && (Auth.getProfile().data.username === item.user) &&
          ([
            //to do: edit/update post
            <a key="list-loadmore-edit">edit</a>,
            <div onClick={handleDeletePost}>delete</div>
          ])
        }>
          <List.Item.Meta
            title={<Link to={`/posts/${item._id}`}><Title level={5}>{item.title}</Title></Link>}
            description={item.content}
          />
          <Text className='list-item-tyle' type="secondary">{item.user}</Text>
          <Text className='list-item-tyle' type="secondary">{item.createdAt}</Text>
        </List.Item>
      )}
    />
  );
};

export default PostList;

// if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//   return <Redirect to="/profile/me" />;
// }