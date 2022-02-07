import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Home from './pages/Home';
import Navig from './components/Navig';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import SinglePost from './pages/SinglePost';
import SinglePostUpdate from './pages/SinglePostUpdate';
import Login from './pages/Login';
import Signup from './pages/Signup';

const { Content, Footer } = Layout;

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout className="layout">
          <Navig />

          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Content className='content-padding'>
              <Login />
            </Content>
          </Route>
          <Route exact path="/signup">
            <Content className='content-padding'>
              <Signup />
            </Content>
          </Route>
          <Route exact path="/profile/me">
            <Content className='content-padding'>
              <Profile />
            </Content>
          </Route>
          <Route exact path="/profile/:user">
            <Content className='content-padding'>
              <Profile />
            </Content>
          </Route>
          <Route exact path="/posts">
            <Content className='content-padding'>
              <Posts />
            </Content>
          </Route>
          <Route exact path="/posts/:postId">
            <Content className='content-padding'>
              <SinglePost />
            </Content>
          </Route>
          <Route exact path="/posts/:postId/edit">
            <Content className='content-padding'>
              <SinglePostUpdate />
            </Content>
          </Route>

          <Footer style={{ textAlign: 'center' }}>Shao Studio [SS] ©2022 Created by Shao</Footer>
        </Layout>



        {/* <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/me">
              <Profile />
            </Route>
            <Route exact path="/profiles/:username">
              <Profile />
            </Route>
             */}

      </Router>
    </ApolloProvider>
  );
}

export default App;
