import React from 'react';
import { useQuery } from '@apollo/client';
import { Button as Btn } from "antd";
import 'antd/dist/antd.css';

// import PostList from '../components/PostList';
// import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>
      MAKE A LANDING PAGE LATER
    </main>
  );
};

export default Home;
