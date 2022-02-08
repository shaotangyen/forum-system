import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import PostList from '../components/PostList';
import { Spin as Loading, Breadcrumb, Alert } from 'antd';


const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);
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