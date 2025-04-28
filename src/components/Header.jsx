import { Link } from "react-router-dom";

function Header({ isLoggedIn }) {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
          <Link to="/">JounCamp LMS</Link>
        </h1>
        {/* <Link to="/" className="logo me-auto">
          <img src="/assets/img/logo.png" alt="" className="img-fluid" />
        </Link> */}

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="dropdown">
              <Link to="/Mypage">
                <span>내 강의실</span>
              </Link>
              <ul>
                <li>
                  <Link to="/Mypage">현재 교육과정</Link>
                </li>
                <li>
                  <Link to="/Mypage/Certificates">수료증</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/Courses">교과과정</Link>
            </li>
            <li>
              <Link to="/Teacher">강사</Link>
            </li>

            <li className="dropdown">
              <Link to="/Notice">
                <span>커뮤니티</span>
              </Link>
              <ul>
                <li>
                  <Link to="/Notice">공지사항</Link>
                </li>
                <li>
                  <Link to="/Qna">질문과 답변</Link>
                </li>
                <li>
                  <Link to="/Data">자료실</Link>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <Link to="/About">
                <span>LMS 소개</span>
              </Link>
              <ul>
                <li>
                  <Link to="/About">JounCamp LMS</Link>
                </li>
                <li>
                  <Link to="/About/Privacy">개인정보보호방침</Link>
                </li>
                <li>
                  <Link to="/About/Contact">오시는길</Link>
                </li>
              </ul>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>

        {isLoggedIn ? (
          <>
            <span id="timeout_sp"></span>
            <Link to="/Member/Logout" className="get-started-btn">
              Logout
            </Link>
          </>
        ) : (
          <Link to="/Member/Login" className="get-started-btn">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
