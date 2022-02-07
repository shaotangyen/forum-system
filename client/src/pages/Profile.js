import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Spin as Loading, Breadcrumb, Alert } from 'antd';

import Auth from '../utils/auth';

const Profile = () => {
    // const { userParam } = useParams();

    const { loading, data } = useQuery(QUERY_ME);

    // console.log(loading, data);
    
    const user = data?.me || data?.user || {};

    if (loading) {
        return <div style={{ textAlign: 'center' }}>
            <Loading />
        </div>;
    }

    //Why is this executed many times when loading the page
    if (!user?.username) {
        return (
            <Alert message="You need to be logged in to see this." type='error'></Alert>
        );
    }

    return (
        <main>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                    {loading ? (
                        <div style={{ textAlign: 'center' }}><Loading /></div>
                    ) : (
                        <div>
                            <PostList posts={user.posts} />
                        </div>
                    )}
            </div>

        </main>
    );
};

export default Profile;