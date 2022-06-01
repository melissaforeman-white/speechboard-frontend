import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"


function AppNav(props) {
    // router props
    const navigate = useNavigate()
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Nav.Link href="/">SpeechBoard</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/boards/">My Boards</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNav;