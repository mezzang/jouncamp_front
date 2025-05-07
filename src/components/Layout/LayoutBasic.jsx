// src/components/Layout/LayoutBasic.jsx
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/style.css"; // (기존 site.css 위치에 맞춰 조정)

function LayoutBasic() {
  return (
    <>
      {/* Header */}
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              JC_LMS
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
            <div
              className="collapse navbar-collapse d-sm-inline-flex justify-content-between"
              id="navbarNav"
            >
              <ul className="navbar-nav flex-grow-1">
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/privacy">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <div className="container">
        <main role="main" className="pb-3">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-top footer text-muted">
        <div className="container">
          &copy; 2024 - JC_LMS - <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </>
  );
}

export default LayoutBasic;
