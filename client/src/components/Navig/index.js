import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import Auth from '../../utils/auth';

const { Header, Content, Footer } = Layout;

const Navig = () => {

  //set menu item selected to change the style
  const [itemSelected, setItemSelected] = useState('home');

  const handleClick = (e) => {
    setItemSelected(e.key);
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" onClick={handleClick} selectedKeys={itemSelected} mode="horizontal">
        <Menu.Item key="home"><Link to="/"></Link>Home</Menu.Item>
        <Menu.Item key="blog"><Link to="/blog">Blog</Link></Menu.Item>

        {Auth.loggedIn() ? (
          <>
            <Menu.Item key="me"><Link to="/">{Auth.getProfile().data.username}'s profile</Link></Menu.Item>
            <Menu.Item key="logout"><button onClick={logout}>Logout</button></Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login"><Link to="/login"> Login</Link></Menu.Item>
            <Menu.Item key="signup"><Link to="/signup">Signup</Link></Menu.Item>
          </>
        )}
      </Menu>
    </Header>
    // <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
    //   <div className="container flex-row justify-space-between-lg justify-center align-center">
    //     <div>
    //       <Link className="text-light" to="/">
    //         <h1 className="m-0">Tech Thoughts</h1>
    //       </Link>
    //       <p className="m-0">Get into the mind of a programmer.</p>
    //     </div>

    //   </div>
    // </header>

  );
};

export default Navig;
