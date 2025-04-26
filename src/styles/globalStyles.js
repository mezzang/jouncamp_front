import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* 기본 스타일 */
  a.navbar-brand {
    white-space: normal;
    text-align: center;
    word-break: break-all;
  }

  a {
    color: #0077cc;
  }

  .btn-primary {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
  }

  .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
  }

  .border-top {
    border-top: 1px solid #e5e5e5;
  }
  
  .border-bottom {
    border-bottom: 1px solid #e5e5e5;
  }

  .box-shadow {
    box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
  }

  button.accept-policy {
    font-size: 1rem;
    line-height: inherit;
  }

  /* 푸터 스타일 */
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    white-space: nowrap;
    line-height: 60px;
  }
  
  /* 기본 본문 스타일 */
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* 컨테이너 스타일 */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  /* 메인 콘텐츠 영역 스타일 */
  main {
    min-height: calc(100vh - 160px); /* 헤더와 푸터를 제외한 최소 높이 */
    padding-bottom: 3rem;
  }
`;

export default GlobalStyles;
