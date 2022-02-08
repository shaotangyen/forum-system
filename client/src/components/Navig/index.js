import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

// export var menuSelected = "home";

// export const updateMenuSelected = (v) => {
//   console.log(v.key);
//   menuSelected = v.key;
// }

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
      <div className="logo">HobbyForm</div>
      <Menu className='menu-align' theme="dark" onClick={handleClick} selectedKeys={itemSelected} mode="horizontal">
        <Menu.Item key="home"><Link to="/"></Link>Home</Menu.Item>
        <Menu.Item key="forum" disabled="true"><Link to="/forum">Forum</Link></Menu.Item>
        <Menu.Item key="posts"><Link to="/posts">Posts</Link></Menu.Item>

        {Auth.loggedIn() ? (
          <>
            <Menu.Item key="profile"><Link to="/profile/me">{Auth.getProfile().data.username}'s profile</Link></Menu.Item>
            <Menu.Item key="logout"><div onClick={logout}>Logout</div></Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login"><Link to="/login"> Login</Link></Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default Navig;