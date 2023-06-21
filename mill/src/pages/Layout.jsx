import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
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
                <Link className="nav-link" to="about">About</Link>
              </li>
            
              <li className="nav-item">
                <Link className="nav-link" to="test_crud">API CRUD Test</Link>
              </li>
           
              <li className="nav-item">
                <Link className="nav-link" to="tree">Tree</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="tree_crud">Tree CRUD</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="log">Log</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="log_crud">Log CRUD</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="plank">Plank</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="plank_crud">Plank CRUD</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="water">Moisture Check</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="water_crud">Moisture Check CRUD</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="logout">Logout</Link>
              </li>
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
