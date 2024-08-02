import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../Logo.jpeg';

export default function MainNav() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="#/home">
                        <img
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="SABL Rockies Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto" style={{color: "white"}}>
                            <Nav.Link href="#/home">Home</Nav.Link>
                            <Nav.Link href="#/schedule">Schedule</Nav.Link>
                            <Nav.Link href="#/roster">Roster</Nav.Link>
                            <Nav.Link href="#/stats">Stats</Nav.Link>
                            <Nav.Link href="#/locations">Locations</Nav.Link>
                            <Nav.Link href="#/allstar">All-Star Vote</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
