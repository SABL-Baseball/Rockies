import statsData from '../../Data/stats.json';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export default function Stats() {
  return (
    <div style={{backgroundColor: "#333366"}}>
      <Container style={{backgroundColor: "white", paddingBottom: "15px"}}>
        <h1 style={{padding: "15px 0"}}>2024 Stats</h1>
        <h2 style={{padding: "15px 0"}}>Batting</h2>
        <Table striped>
          <thead>
            <tr>
              <th title="Jersey Number">#</th>
              <th title="Player Name">Name</th>
              <th title="Plate Appearances">PA</th>
              <th title="At Bats">AB</th>
              <th title="Runs">R</th>
              <th title="Hits">H</th>
              <th title="Doubles">2B</th>
              <th title="Triples">3B</th>
              <th title="Home Runs">HR</th>
              <th title="Runs Batted In">RBI</th>
              <th title="Stolen Bases">SB</th>
              <th title="Caught Stealing">CS</th>
              <th title="Walk">BB</th>
              <th title="Hit By Pitch">HBP</th>
              <th title="Struck Out">SO</th>
              <th title="Total Bases">TB</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((player, index) => 
            <tr key={index}>
              <td>{player.JerseyNumber}</td>
              <td>{player.Name}</td>
            </tr>
            )}
          </tbody>
        </Table>
        <h2 style={{padding: "15px 0"}}>Pitching</h2>
        <Table striped>
          <thead>
            <tr>
              <th title="Jersey Number">#</th>
              <th title="Player Name">Name</th>
              <th title="Innings Pitched">IP</th>
              <th title="Hits Allowed">H</th>
              <th title="Runs Allowed">R</th>
              <th title="Earned Runs Allowed">ER</th>
              <th title="Walks Allowed">BB</th>
              <th title="Stikeouts">SO</th>
              <th title="Home Runs Allowed">HR</th>
              <th title="Hit By Pitch">HBP</th>
              <th title="Wild Pitches">WP</th>
              <th title="Balks">BK</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((player, index) => 
            <tr key={index}>
              <td>{player.JerseyNumber}</td>
              <td>{player.Name}</td>
            </tr>
            )}
          </tbody>
        </Table>
        <h2 style={{padding: "15px 0"}}>Fielding</h2>
        <Table striped>
          <thead>
            <tr>
              <th title="Jersey Number">#</th>
              <th title="Player Name">Name</th>
              <th title="Putouts">Putouts</th>
              <th title="Assists">Assists</th>
              <th title="Errors">Errors</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((player, index) => 
            <tr key={index}>
              <td>{player.JerseyNumber}</td>
              <td>{player.Name}</td>
            </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
