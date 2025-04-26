import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: white;
`;

const Nav = styled.nav`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border-bottom: 1px solid #dee2e6;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const ContainerFluid = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const NavbarBrand = styled(Link)`
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
  color: #333;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: none;
    color: #0056b3;
  }
`;

const NavbarToggler = styled.button`
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  @media (min-width: 576px) {
    display: none;
  }
`;

const TogglerIcon = styled.span`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`;

const NavbarCollapse = styled.div`
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;

  @media (max-width: 575.98px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
  }

  @media (min-width: 576px) {
    display: flex !important;
  }
`;

const NavbarNav = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;

  @media (min-width: 576px) {
    flex-direction: row;
  }
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 0.5rem 0;
  color: #212529;
  text-decoration: none;

  &:hover,
  &:focus {
    color: #0056b3;
  }

  @media (min-width: 576px) {
    padding: 0.5rem;
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <Nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow">
        <ContainerFluid>
          <NavbarBrand to="/">JC_LMS</NavbarBrand>
          <NavbarToggler type="button" onClick={toggleNavbar}>
            <TogglerIcon />
          </NavbarToggler>
          <NavbarCollapse isOpen={isOpen}>
            <NavbarNav className="flex-grow-1">
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/home/privacy">Privacy</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/courses">강의</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/notice">공지사항</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/qna">질문과 답변</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/data">자료실</NavLink>
              </NavItem>
            </NavbarNav>
          </NavbarCollapse>
        </ContainerFluid>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
