import scheduleData from '../../Data/schedule.json';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

export default function Schedule() {
  return (
    <div style={{backgroundColor: "#333366"}}>
      <Container style={{backgroundColor: "white", paddingBottom: "15px"}}>
        <h1 style={{padding: "15px 0"}}>2024 Schedule</h1>
        <Stack gap={3}>
          {scheduleData.map((game, index) =>
            <Card style={{backgroundColor: game.Result === "W" ? "green" : game.Result === "L" ? "red" : "", color: game.Result && game.Result !== "" && "white"}} key={index}>
              <Card.Body>
                <Card.Title>Wk {index + 1} - {game.Bye ? game.Team : `${game.Date} @ ${game.Time}`}</Card.Title>
                {
                  game.Result && game.Result !== "" &&
                  <Card.Subtitle className="mb-2">{`${game.Result} - ${game.Score}`}</Card.Subtitle>
                }
                {
                  !game.Bye &&
                  <Card.Text>
                    {game.Home ? "vs" : "@"} {game.Team}, {game.Location}
                  </Card.Text>
                }
              </Card.Body>
            </Card>
          )}
        </Stack>
      </Container>
    </div>
  );
}
