import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import UpdateForm from '../components/UpdateForm';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { UPDATE_POST } from '../utils/mutations';
import { Spin as Loading, Breadcrumb, Alert } from 'antd';

import Auth from '../utils/auth';


const SinglePostUpdate = (props) => {
    const {  useParam } = useParams();
    // console.log(userParam);

    const [updatePost] = useMutation(UPDATE_POST);

    const handleUpdatePost = async (event) => {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <main>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                {/* {!userParam && ( */}
                    <div>
                        {/* A form to fill in all values and make update when submit */}
                    <UpdateForm postId={useParam}/>
                    </div>
                {/* )} */}
            </div>
        </main>
    );
};

export default SinglePostUpdate;