import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import PostList from '../components/PostList';

import { Spin as Loading, Breadcrumb } from 'antd';

const Blog = () => {

    const { loading, data } = useQuery(QUERY_POSTS);
    console.log('loading', loading);
    const posts = data?.posts || [];
    console.log('data', data);
    console.log('posts', posts);

    return (
        <main>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Blog</Breadcrumb.Item>
                {/* <Breadcrumb.Item>{posts ? (data.title) : ('')}</Breadcrumb.Item> */}
            </Breadcrumb>
            <div className="site-layout-content">
                {/* <PostForm /> */}
                FORM TO MAKE A POST HERE!!
                <div>
                    {loading ? (
                        <div style={{ textAlign: 'center' }}><Loading /></div>
                    ) : (
                        <PostList
                          posts={posts}
                          title="Some Feed for Thought(s)..."
                            />
                    )}
                </div>
            </div>
        </main >
    );
    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Blog</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">Blog</div>
        </>

    );
};

export default Blog;