import statsData from '../../Data/stats.json';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

export default function Roster() {
    return (
      <div style={{backgroundColor: "#333366"}}>
        <Container style={{backgroundColor: "white", paddingBottom: "15px"}}>
          <h1 style={{padding: "15px 0"}}>Roster</h1>
          <Stack gap={3}>
            {statsData.sort((a, b) => a.Name.localeCompare(b.Name)).map((player, index) =>
              <Card key={index}>
                <Card.Body>
                  <Card.Title>{`#${player.JerseyNumber} ${player.Name}`}</Card.Title>
                </Card.Body>
              </Card>
            )}
          </Stack>
        </Container>
      </div>
    );
  }
  