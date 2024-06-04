import statsData from '../../Data/stats.json';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';

export default function Stats() {
  const [combinedStats, setCombinedStats] = useState([]);
  const [statType, setStatType] = useState("Hitting");

  useEffect(() => {
    let tempStats = [];
  
    statsData.forEach(player => {
      let combinedPlayer = {};
      combinedPlayer.Name = player.Name;
      combinedPlayer.JerseyNumber = player.JerseyNumber;
      combinedPlayer.Positions = player.Positions;

      combinedPlayer.Hitting = {
        PA: 0,
        AB: 0,
        R: 0,
        H: 0,
        "2B": 0,
        "3B": 0,
        HR: 0,
        RBI: 0,
        SB: 0,
        CS: 0,
        BB: 0,
        HBP: 0,
        SO: 0,
        TB: 0
      };

      combinedPlayer.Pitching = {
        IP: 0,
        H: 0,
        R: 0,
        ER: 0,
        BB: 0,
        SO: 0,
        HR: 0,
        HBP: 0,
        WP: 0,
        BK: 0,
        SB: 0,
        LOB: 0,
        ERA: 0,
        WHIP: 0,
        BAA: 0
      };

      combinedPlayer.Fielding = {
        Putouts: 0,
        Assists: 0,
        Errors: 0
      };

      player.GameLog.forEach(game => {
        if (game.Hitting) {
          combinedPlayer.Hitting.PA += game.Hitting.PA;
          combinedPlayer.Hitting.AB += game.Hitting.AB;
          combinedPlayer.Hitting.R += game.Hitting.R;
          combinedPlayer.Hitting.H += game.Hitting["1B"] + game.Hitting["2B"] + game.Hitting["3B"] + game.Hitting.HR;
          combinedPlayer.Hitting["2B"] += game.Hitting["2B"];
          combinedPlayer.Hitting["3B"] += game.Hitting["3B"];
          combinedPlayer.Hitting.HR += game.Hitting.HR;
          combinedPlayer.Hitting.RBI += game.Hitting.RBI;
          combinedPlayer.Hitting.SB += game.Hitting.SB;
          combinedPlayer.Hitting.CS += game.Hitting.CS;
          combinedPlayer.Hitting.BB += game.Hitting.BB;
          combinedPlayer.Hitting.HBP += game.Hitting.HBP;
          combinedPlayer.Hitting.SO += game.Hitting.SO;
          combinedPlayer.Hitting.TB += game.Hitting["1B"] + (game.Hitting["2B"] * 2) + (game.Hitting["3B"] *3) + (game.Hitting.HR * 4);
        }

        if (game.Pitching) {
          combinedPlayer.Pitching.IP += game.Pitching.IP;
          combinedPlayer.Pitching.H += game.Pitching.H;
          combinedPlayer.Pitching.R += game.Pitching.R;
          combinedPlayer.Pitching.ER += game.Pitching.ER;
          combinedPlayer.Pitching.BB += game.Pitching.BB;
          combinedPlayer.Pitching.SO += game.Pitching.SO;
          combinedPlayer.Pitching.HR += game.Pitching.HR;
          combinedPlayer.Pitching.HBP += game.Pitching.HBP;
          combinedPlayer.Pitching.WP += game.Pitching.WP;
          combinedPlayer.Pitching.BK += game.Pitching.BK;
          combinedPlayer.Pitching.SB += game.Pitching.SB;
          combinedPlayer.Pitching.LOB += game.Pitching.LOB;
        }

        if (game.Fielding) {
          combinedPlayer.Fielding.Putouts += game.Fielding.Putouts;
          combinedPlayer.Fielding.Assists += game.Fielding.Assists;
          combinedPlayer.Fielding.Errors += game.Fielding.Errors;
        }
      });

      combinedPlayer.Hitting.AVG = combinedPlayer.Hitting.H / combinedPlayer.Hitting.AB;
      combinedPlayer.Hitting.OBP = (combinedPlayer.Hitting.H + combinedPlayer.Hitting.BB + combinedPlayer.Hitting.HBP) / combinedPlayer.Hitting.PA;
      combinedPlayer.Hitting.SLG = combinedPlayer.Hitting.TB / combinedPlayer.Hitting.AB;
      combinedPlayer.Hitting.OPS = parseFloat(combinedPlayer.Hitting.OBP + combinedPlayer.Hitting.SLG).toFixed(3);
      combinedPlayer.Hitting.AVG = parseFloat(combinedPlayer.Hitting.AVG).toFixed(3);
      combinedPlayer.Hitting.OBP = parseFloat(combinedPlayer.Hitting.OBP).toFixed(3);
      combinedPlayer.Hitting.SLG = parseFloat(combinedPlayer.Hitting.SLG).toFixed(3);
      
      let innings = Math.floor(combinedPlayer.Pitching.IP);
      let partialInning = combinedPlayer.Pitching.IP % 1;
      let partialInningInThirds = (partialInning * 10) / 3;
      let totalInnings = innings + partialInningInThirds;

      combinedPlayer.Pitching.ERA = parseFloat((combinedPlayer.Pitching.ER / totalInnings) * 9).toFixed(3);
      combinedPlayer.Pitching.WHIP = parseFloat((combinedPlayer.Pitching.BB + combinedPlayer.Pitching.H) / totalInnings).toFixed(3);
      combinedPlayer.Pitching.BAA = parseFloat(combinedPlayer.Pitching.H / (innings * 3 + partialInning)).toFixed(3);

      tempStats.push(combinedPlayer);
    });
    console.log("tempStats", tempStats);

    setCombinedStats(tempStats);
  }, []);

  return (
    <div style={{backgroundColor: "#333366"}}>
      <Container style={{backgroundColor: "white", paddingBottom: "15px"}}>
        <h1 style={{padding: "15px 0"}}>2024 Stats</h1>
        <Dropdown style={{marginBottom: "10px"}}>
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {statType}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => setStatType("Hitting")}>Hitting</Dropdown.Item>
            <Dropdown.Item onClick={(e) => setStatType("Pitching")}>Pitching</Dropdown.Item>
            <Dropdown.Item onClick={(e) => setStatType("Fielding")}>Fielding</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        { statType === "Hitting" &&
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th title="Jersey Number">#</th>
                <th title="Player Name">Name</th>
                <th title="Plate Appearances">PA</th>
                <th title="At Bats">AB</th>
                <th title="Hits">H</th>
                <th title="Batting Average">AVG</th>
                <th title="On Base Percentage">OBP</th>
                <th title="Slugging">SLG</th>
                <th title="On Base Plus Slugging">OPS</th>
                <th title="Runs">R</th>
                <th title="Runs Batted In">RBI</th>
                <th title="Stolen Bases">SB</th>
                <th title="Walk">BB</th>
                <th title="Hit By Pitch">HBP</th>
                <th title="Struck Out">SO</th>
              </tr>
            </thead>
            <tbody>
              {combinedStats?.filter(player => player.Hitting.PA > 0).map((player, index) => 
              <tr key={index}>
                <td>{player.JerseyNumber}</td>
                <td>{player.Name}</td>
                <td>{player.Hitting.PA}</td>
                <td>{player.Hitting.AB}</td>
                <td>{player.Hitting.H}</td>
                <td>{player.Hitting.AVG}</td>
                <td>{player.Hitting.OBP}</td>
                <td>{player.Hitting.SLG}</td>
                <td>{player.Hitting.OPS}</td>
                <td>{player.Hitting.R}</td>
                <td>{player.Hitting.RBI}</td>
                <td>{player.Hitting.SB}</td>
                <td>{player.Hitting.BB}</td>
                <td>{player.Hitting.HBP}</td>
                <td>{player.Hitting.SO}</td>
              </tr>
              )}
            </tbody>
          </Table>
        }
        { statType === "Pitching" &&
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th title="Jersey Number">#</th>
                <th title="Player Name">Name</th>
                <th title="Innings Pitched">IP</th>
                <th title="Stikeouts">K</th>
                <th title="Hits Allowed">H</th>
                <th title="Runs Allowed">R</th>
                <th title="Earned Runs Allowed">ER</th>
                <th title="Earned Runs Allowed">ERA</th>
                <th title="Walks + Hits Per Inning">WHIP</th>
                <th title="Batting Average Against">BAA</th>
                <th title="Earned Run Average">BB</th>
                <th title="Home Runs Allowed">HR</th>
                <th title="Walks Allowed">BB</th>
                <th title="Hit By Pitch">HBP</th>
                <th title="Wild Pitches">WP</th>
              </tr>
            </thead>
            <tbody>
              {combinedStats?.filter(player => player.Pitching.IP > 0).map((player, index) => 
              <tr key={index}>
                <td>{player.JerseyNumber}</td>
                <td>{player.Name}</td>
                <td>{player.Pitching.IP}</td>
                <td>{player.Pitching.SO}</td>
                <td>{player.Pitching.H}</td>
                <td>{player.Pitching.R}</td>
                <td>{player.Pitching.ER}</td>
                <td>{player.Pitching.ERA}</td>
                <td>{player.Pitching.WHIP}</td>
                <td>{player.Pitching.BAA}</td>
                <td>{player.Pitching.BB}</td>
                <td>{player.Pitching.HR}</td>
                <td>{player.Pitching.BB}</td>
                <td>{player.Pitching.HBP}</td>
                <td>{player.Pitching.WP}</td>
              </tr>
              )}
            </tbody>
          </Table>
        }
        { statType === "Fielding" &&
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th title="Jersey Number">#</th>
                <th title="Player Name">Name</th>
                <th title="Positions">Positions</th>
                <th title="Putouts">Putouts</th>
                <th title="Assists">Assists</th>
                <th title="Errors">Errors</th>
              </tr>
            </thead>
            <tbody>
              {combinedStats?.map((player, index) => 
              <tr key={index}>
                <td>{player.JerseyNumber}</td>
                <td>{player.Name}</td>
                <td>{player.Positions}</td>
                <td>{player.Fielding.Putouts}</td>
                <td>{player.Fielding.Assists}</td>
                <td>{player.Fielding.Errors}</td>
              </tr>
              )}
            </tbody>
          </Table>
        }
      </Container>
    </div>
  );
}
