import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setactiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setactiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="black">
      <Menu.Item name={user.username} active as={Link} to="/"></Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} as={Link} to="/login">
          로그아웃
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="black">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        홈
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          로그인
        </Menu.Item>
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        >
          가입
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
