import locationData from '../../Data/locations.json';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Ratio from 'react-bootstrap/Ratio';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Locations() {
  return (
    <div style={{backgroundColor: "#333366"}}>
      <Container style={{backgroundColor: "white"}}>
        <h1 style={{padding: "15px 0"}}>Locations</h1>
        <Row>
          {locationData.sort((a, b) => a.Name.localeCompare(b.Name)).map((location, index) =>
            <Col key={index} xs={12} md={6} lg={3} style={{marginBottom: "15px"}}>
              <Card style={{height: "100%"}}>
                <Card.Header>{location.Name}</Card.Header>
                <Card.Body>
                  <Ratio>
                    <iframe title={location.Name} src={location.Source} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </Ratio>
                  <ListGroup variant="flush">
                    {location.Games.map((game, index) =>
                      <ListGroup.Item key={index}>{game}</ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
  