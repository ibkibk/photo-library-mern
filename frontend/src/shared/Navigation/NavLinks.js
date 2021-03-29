import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  const [user, setUser] = useState(false);

  const logout = () => {
    setUser(true);
  };

  return (
    <ul className="nav-links">
      <li>
        {user && (
          <div>
            <NavLink to="/user/profile">Profile</NavLink>
          </div>
        )}
      </li>
      <li>
        <NavLink to="/" exact>
          All Posts
        </NavLink>
      </li>
      <li>
        <NavLink to="/posts/new">Add Image</NavLink>
      </li>
      <li>
        {user ? (
          <div>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </li>
    </ul>
  );
};

export default NavLinks;
