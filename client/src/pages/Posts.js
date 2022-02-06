import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries.js';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { Spin as Loading, Breadcrumb } from 'antd';

const Posts = () => {

    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    return (
        <main>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Posts</Breadcrumb.Item>
                {/* <Breadcrumb.Item>{posts ? (data.title) : ('')}</Breadcrumb.Item> */}
            </Breadcrumb>
            <div className="site-layout-content">
                <PostForm />
                <div>
                    {loading ? (
                        <div style={{ textAlign: 'center' }}><Loading /></div>
                    ) : (
                        <PostList posts={posts}/>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Posts;