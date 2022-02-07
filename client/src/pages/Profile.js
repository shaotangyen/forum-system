import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Spin as Loading, Breadcrumb, Alert } from 'antd';

import Auth from '../utils/auth';

const Profile = () => {
    const { userParam } = useParams();
    console.log("userParam",userParam);

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    console.log(loading, data);
    
    const user = data?.me || data?.user || {};
    // redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/profile/me" />;
    }

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
                {!userParam && (
                    <div>
                        <PostForm />
                    </div>
                )}
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