import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react';

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Fetch Schedule
    let data = localStorage.getItem("Data");
    if (!data) {
      setTimeout(() => {
        let data = localStorage.getItem("Data");
        let parsedSchedule = JSON.parse(data);
        parsedSchedule = Object.values(parsedSchedule.Schedule["2024"]);
        
        parsedSchedule.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        setSchedule(parsedSchedule);
      }, 2000);
    }

    if (data) {
      let parsedSchedule = JSON.parse(data);
      parsedSchedule = Object.values(parsedSchedule.Schedule["2024"]);
      
      parsedSchedule.sort((a, b) => new Date(a.Date) - new Date(b.Date));
      setSchedule(parsedSchedule);
    }
  }, []);

  return (
    <div style={{backgroundColor: "#333366"}}>
      <Container style={{backgroundColor: "white", paddingBottom: "15px"}}>
        <h1 style={{padding: "15px 0"}}>2024 Schedule</h1>
        <Stack gap={3}>
          {schedule && schedule.map((week, index) =>
            <Card style={{backgroundColor: week.Result === "W" ? "green" : week.Result === "L" ? "red" : "", color: week.Result && week.Result !== "" && "white"}} key={index}>
              <Card.Body>
                <Card.Title>{`Week ${index + 1} - ${week.Date} @ ${week.Time}`}</Card.Title>
                {
                  week.Result && week.Result !== "" &&
                  <Card.Subtitle className="mb-2">{`${week.Result} - ${week.Score}`}</Card.Subtitle>
                }
                {
                  <Card.Text>
                    {week.Home ? "vs" : "@"} {week.Team}, {week.Location}
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
