import statsData from '../../Data/stats.json';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';

export default function Stats() {
  const [combinedStats, setCombinedStats] = useState([]);
  const [statType, setStatType] = useState("Hitting");
  const [sortType, setSortType] = useState(["AVG", "IP", "Putouts"]);

  const setSort = (index, sort) => {
    let tempSort = [...sortType];
    tempSort[index] = sort;
    setSortType(tempSort);
  }

  useEffect(() => {
    let tempStats = [];
  
    statsData.forEach(player => {
      let combinedPlayer = {};

      combinedPlayer.Hitting = {
        Name: player.Name,
        JerseyNumber: player.JerseyNumber,
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
        Name: player.Name,
        JerseyNumber: player.JerseyNumber,
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
        Name: player.Name,
        JerseyNumber: player.JerseyNumber,
        Positions: player.Positions,
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
      combinedPlayer.Pitching.BAA = parseFloat(combinedPlayer.Pitching.H / (innings * 3 + partialInning + combinedPlayer.Pitching.H)).toFixed(3);
      combinedPlayer.Pitching.IP = innings + ((partialInning * 10) % 3) / 10;

      tempStats.push(combinedPlayer);
    });

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
                <th title="Jersey Number" onClick={() => setSort(0, "JerseyNumber")}>#</th>
                <th title="Player Name" onClick={() => setSort(0, "Name")}>Name</th>
                <th title="Plate Appearances" onClick={() => setSort(0, "PA")}>PA</th>
                <th title="At Bats" onClick={() => setSort(0, "AB")}>AB</th>
                <th title="Hits" onClick={() => setSort(0, "H")}>H</th>
                <th title="Batting Average" onClick={() => setSort(0, "AVG")}>AVG</th>
                <th title="On Base Percentage" onClick={() => setSort(0, "OBP")}>OBP</th>
                <th title="Slugging" onClick={() => setSort(0, "SLG")}>SLG</th>
                <th title="On Base Plus Slugging" onClick={() => setSort(0, "OPS")}>OPS</th>
                <th title="Runs" onClick={() => setSort(0, "R")}>R</th>
                <th title="Runs Batted In" onClick={() => setSort(0, "RBI")}>RBI</th>
                <th title="Stolen Bases" onClick={() => setSort(0, "SB")}>SB</th>
                <th title="Walk" onClick={() => setSort(0, "BB")}>BB</th>
                <th title="Hit By Pitch" onClick={() => setSort(0, "HBP")}>HBP</th>
                <th title="Struck Out" onClick={() => setSort(0, "SO")}>SO</th>
              </tr>
            </thead>
            <tbody>
              {combinedStats?.filter(player => player.Hitting.PA > 0).sort((a, b) => b.Hitting[sortType[0]] - a.Hitting[sortType[0]]).map((player, index) => 
              <tr key={index}>
                <td>{player.Hitting.JerseyNumber}</td>
                <td>{player.Hitting.Name}</td>
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
                <th title="Jersey Number" onClick={() => setSort(1, "JerseyNumber")}>#</th>
                <th title="Player Name" onClick={() => setSort(1, "Name")}>Name</th>
                <th title="Innings Pitched" onClick={() => setSort(1, "IP")}>IP</th>
                <th title="Stikeouts" onClick={() => setSort(1, "SO")}>K</th>
                <th title="Hits Allowed" onClick={() => setSort(1, "H")}>H</th>
                <th title="Runs Allowed" onClick={() => setSort(1, "R")}>R</th>
                <th title="Earned Runs Allowed" onClick={() => setSort(1, "ER")}>ER</th>
                <th title="Earned Runs Average" onClick={() => setSort(1, "ERA")}>ERA</th>
                <th title="Walks + Hits Per Inning" onClick={() => setSort(1, "WHIP")}>WHIP</th>
                <th title="Batting Average Against" onClick={() => setSort(1, "BAA")}>BAA</th>
                <th title="Walks Allowed" onClick={() => setSort(1, "BB")}>BB</th>
                <th title="Hit By Pitch" onClick={() => setSort(1, "HBP")}>HBP</th>
                <th title="Wild Pitches" onClick={() => setSort(1, "WP")}>WP</th>
              </tr>
            </thead>
            <tbody>
              {combinedStats?.filter(player => player.Pitching.IP > 0).sort((a, b) => b.Pitching[sortType[1]] - a.Pitching[sortType[1]]).map((player, index) => 
              <tr key={index}>
                <td>{player.Pitching.JerseyNumber}</td>
                <td>{player.Pitching.Name}</td>
                <td>{player.Pitching.IP}</td>
                <td>{player.Pitching.SO}</td>
                <td>{player.Pitching.H}</td>
                <td>{player.Pitching.R}</td>
                <td>{player.Pitching.ER}</td>
                <td>{player.Pitching.ERA}</td>
                <td>{player.Pitching.WHIP}</td>
                <td>{player.Pitching.BAA}</td>
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
                <th title="Jersey Number" onClick={() => setSort(2, "JerseyNumber")}>#</th>
                <th title="Player Name" onClick={() => setSort(2, "Name")}>Name</th>
                <th title="Positions" onClick={() => setSort(2, "Positions")}>Positions</th>
                <th title="Putouts" onClick={() => setSort(2, "Putouts")}>Putouts</th>
                <th title="Assists" onClick={() => setSort(2, "Assists")}>Assists</th>
                <th title="Errors" onClick={() => setSort(2, "Errors")}>Errors</th>
              </tr>
            </thead>
            <tbody>
              {combinedStats?.sort((a, b) => b.Fielding[sortType[2]] - a.Fielding[sortType[2]]).map((player, index) => 
              <tr key={index}>
                <td>{player.Fielding.JerseyNumber}</td>
                <td>{player.Fielding.Name}</td>
                <td>{player.Fielding.Positions}</td>
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
