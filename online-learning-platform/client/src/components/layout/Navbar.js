import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const authLinks = (
    <>
      <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
      
      {user?.role === 'student' && (
        <Nav.Link as={Link} to="/my-courses">My Courses</Nav.Link>
      )}
      
      {user?.role === 'instructor' && (
        <>
          <Nav.Link as={Link} to="/create-course">Create Course</Nav.Link>
          <Nav.Link as={Link} to="/instructor-courses">My Courses</Nav.Link>
        </>
      )}
      
      <NavDropdown title={user?.name} id="user-dropdown" align="end">
        <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const guestLinks = (
    <>
      <Nav.Link as={Link} to="/register">Register</Nav.Link>
      <Nav.Link as={Link} to="/login">Login</Nav.Link>
    </>
  );

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Online Learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;