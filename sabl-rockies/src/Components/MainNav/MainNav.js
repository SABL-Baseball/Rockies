import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../Logo.jpeg';

export default function MainNav() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="SABL Rockies Logo"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#/schedule">Schedule</Nav.Link>
                        <Nav.Link href="#/roster">Roster</Nav.Link>
                        <Nav.Link href="#/stats">Stats</Nav.Link>
                        <Nav.Link href="#/locations">Locations</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
