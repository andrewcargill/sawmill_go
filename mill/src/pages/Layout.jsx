import { Outlet, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useState, useEffect } from "react";
import css from "../styles/Layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";

const Layout = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      <nav
        id={css.nav}
        className="navbar navbar-expand-lg"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <div className="container">
          <Link
            id={css.home}
            className="navbar-brand"
            to="/"
            onClick={handleMenuClose}
          >
            SAWMILL <span>GO!</span>
          </Link>
          <button
            className={css.button}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggleMenu}
          >
          
            <span className={css.toggle}>
              <FontAwesomeIcon icon={faBars} />
            </span>
          </button>
          <div
            className={`navbar-collapse collapse ${css.navExpand}`}
            id="navbarNav"
          >
            <ul id={css.menuItems} className="navbar-nav">
              <li className="nav-item">
                <Link className={css.navLink} to="about">
                  About
                </Link>
              </li>

              {isAuth ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" 
                    id="dropdown-basic"
                    className="dropdown-toggle"
                    >
                      ADMIN
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                    className="dropdown-menu"
                    >
                      <Dropdown.Item as={Link} to="tree_list">
                        Tree
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="log_list">
                        Log
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="plank_list">
                        Plank
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" 
                    id="dropdown-basic"
                    className="dropdown-toggle"
                    >
                      ADD DATA
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                    id="dropdown-menu"
                    >
                      <Dropdown.Item as={Link} 
                      to="mill_home"
                      className="dropbox-item"
                      >
                        Mill Home
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="mill_add_planks">
                        Add Plank
                      </Dropdown.Item>

                      <Dropdown.Item as={Link} to="mill_add_logs">
                        Add Log
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="mill_add_trees">
                        Add Tree
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="mill_add_moisture">
                        Add Moisture Check
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : null}

              <li>{isAuth ? <></> : null}</li>
              <li>
                {isAuth ? (
                  <Link className="nav-link" to="logout">
                    Logout
                  </Link>
                ) : (
                  <Link className={css.navLink} to="login">
                    Login
                  </Link>
                )}
              </li>

              <li className="nav-item"></li>
              <li className="nav-item"></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Outlet /> {/* Render the nested components */}
      </div>
    </>
  );
};

export default Layout;
