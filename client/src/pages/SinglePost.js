import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CommentForm from '../components/CommentForm';
import { QUERY_SINGLE_POST } from '../utils/queries';
import { Spin as Loading, Breadcrumb, Typography, Divider, Comment, Tooltip, List } from 'antd';

const { Title, Text, Paragraph } = Typography;

const SinglePost = () => {
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { _id: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div className="site-layout-content" style={{ textAlign: 'center' }}>
      <Loading />
    </div>;
  }

  const getContent = () => {
    return { __html: post.content };
  }

  return (
    <main>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/posts">Posts</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Post title and content */}
      <div className="site-layout-content">
        <Title level={2}>{post.title}</Title>
        <Divider />
        <Paragraph>
          {/* React's way to use innerHTML */}
          <div dangerouslySetInnerHTML={getContent()} />
        </Paragraph>
        <Paragraph className='space-before-author'>
          <Text strong>{post.user}</Text> <Text type="secondary">{post.createdAt}</Text>
        </Paragraph>
      </div>

      {/* Comment section */}
      <div className="site-layout-content">
        <Title level={4} className='primary-color'>Comments</Title>
        <List
          className="comment-list"
          header={`${post.comments.length} replies`}
          itemLayout="horizontal"
          dataSource={post.comments}
          renderItem={item => (
            <li>
              <Comment
                author={item.user}
                content={item.content}
                datetime={item.createdAt}
              />
            </li>
          )}
        />
      </div>

      {/* Comment Form */}
      <CommentForm postId={post._id} />

    </main>
  );
};

export default SinglePost;
