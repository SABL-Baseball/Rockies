import Logo from '../../Logo.jpeg';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

export default function Home() {
  return (
    <div style={{backgroundColor: "#333366"}}>
      <Container style={{backgroundColor: "white", paddingBottom: "15px"}}>
        <Container style={{textAlign: "center", paddingTop: "15px"}}>
          <Image src={Logo} className="d-inline-block align-top" alt="SABL Rockies Logo" fluid />
        </Container>
        <Container>
          <h1>About</h1>
          <p>
            The Rockies are a passionate group of players who love the game of baseball. They compete in the Sioux Amateur Baseball League, striving for victory and camaraderie on the field. Whether it's a sunny day or under the stadium lights, the Rockies give their all, representing Sioux Falls with pride. Feel free to catch a game and cheer them on! <br />
            Manager: Andrew Halling<br />
            Team Captain: Javier Gomez
          </p>
        </Container>
      </Container>
    </div>
  );
}
  