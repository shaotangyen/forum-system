import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Spin as Loading, Breadcrumb } from 'antd';

import Auth from '../utils/auth';

const Profile = () => {
    const { username: userParam } = useParams();

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
            <h4>
                You need to be logged in to see this.
            </h4>
        );
    }

    return (
        <div>
            <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                </h2>

                <div className="col-12 col-md-10 mb-5">
                    <PostList
              posts={user.posts}
            />
                </div>
                {!userParam && (
                    <div>
                        <PostForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;