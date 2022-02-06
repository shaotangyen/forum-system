import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Auth from '../../utils/auth';

const { Header } = Layout;

const Navig = () => {

  //set menu item selected to change the style
  const [itemSelected, setItemSelected] = useState();

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
        <Menu.Item key="posts"><Link to="/posts">Posts</Link></Menu.Item>

        {Auth.loggedIn() ? (
          <>
            <Menu.Item key="profile"><Link to="/profile/me">{Auth.getProfile().data.username}'s profile</Link></Menu.Item>
            <Menu.Item key="logout"><div onClick={logout}>Logout</div></Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login"><Link to="/login"> Login</Link></Menu.Item>
            <Menu.Item key="signup"><Link to="/signup">Signup</Link></Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default Navig;
