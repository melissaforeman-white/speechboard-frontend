import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';

function AppNav(props) {
    let {user, logoutUser} = useContext(UserContext);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Nav.Link href="/">SpeechBoard</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    { user && <Nav.Link href="/boards/">My Boards</Nav.Link>}
                    { user && <Nav.Link href="/boards/new">+ Create Board</Nav.Link> }
                    { user ? <Nav.Link onClick={() => logoutUser()}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link> }
                </Nav>
                </Navbar.Collapse>
                { user && <Nav>Hello, { user.username }</Nav>}
            </Container>
        </Navbar>
    )
}

export default AppNav;