import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="test">Test</Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Outlet /> {/* Render the nested components */}
      </div>
    </>
  )
};

export default Layout;