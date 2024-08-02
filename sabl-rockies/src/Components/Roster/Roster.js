import PlayerProfiles from '../../Data/playerProfiles.json';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Roster() {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState('profile');
  const [player, setPlayer] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (newPlayer) => {
    setShow(true);
    setPlayer(newPlayer)
  };

  return (
    <div style={{backgroundColor: "#333366"}}>
      <Container style={{backgroundColor: "white", paddingBottom: "15px"}}>
        <h1 style={{padding: "15px 0"}}>Roster</h1>
        <Stack gap={3}>
          {PlayerProfiles.sort((a, b) => a.Name.localeCompare(b.Name)).map((player, index) =>
            <Card key={index} onClick={() => handleShow(player)} style={{cursor: "pointer"}}>
              <Card.Body>
                <Card.Title>{`#${player.JerseyNumber} ${player.Name}`}</Card.Title>
              </Card.Body>
            </Card>
          )}
        </Stack>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{`${player.Name} #${player.JerseyNumber}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body scrollable>
              { player.Photo &&
                <Image src={require(`../../Assets/PlayerPhotos/${player.Photo}`)} className="d-inline-block align-top" alt="SABL Rockies Logo" fluid />
              }
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="profile" title="Profile">
                  <ListGroup>
                    <ListGroup.Item>
                      <h5>Test</h5>
                      <p>Cras justo odio</p>
                    </ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                </Tab>
                <Tab eventKey="stats" title="Stats">
                  Tab content for Profile
                </Tab>
                <Tab eventKey="facts" title="Fun Facts">
                  Tab content for Contact
                </Tab>
              </Tabs>
            </Modal.Body>
          </Modal>
      </Container>
    </div>
  );
}
  