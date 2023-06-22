import { Outlet, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  About
                </Link>
              </li>

              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Test API
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="test_crud">
                    Test CRUD
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="test_gps">
                    Create GPS
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="test_gps_map">
                    Display GPS Map
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              

              <li className="nav-item">
                <Link className="nav-link" to="tree_crud">
                  Tree
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="log_crud">
                  Log
                </Link>
              </li>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Planks
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="plank_crud">
                    All
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <li className="nav-item">
                <Link className="nav-link" to="plank_crud">
                  Plank
                </Link>
              </li>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Moisture Checks
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="water_crud">
                    All
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="moisture_by_planks">
                    By Plank Id
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="water_post">
                    Add New
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="logout">
                  Logout
                </Link>
              </li>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  SAWMILL INPUT SCREENS
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="mill_home">
                    Mill Home
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="mill_add_planks">
                    Add Plank
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="mill_add_logs">
                    Add Log
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
