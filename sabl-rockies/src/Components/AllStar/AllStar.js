import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, push, update } from "firebase/database";

export default function AllStar() {
  const [players, setPlayers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const selectPlayer = (player) => {
    let newVotes = [...votes];
    if (votes.includes(player)) {
        newVotes = newVotes.filter(vote => vote !== player);
        setVotes(newVotes);
    } else if (votes.length < 3) {
      newVotes.push(player);
      setVotes(newVotes);
    } else {
      alert("You can only vote for 3 players, you must first unselect a player to vote for another.");
    }
  };

  const submitVotes = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyBm_8Kd9okK-rG67eBL2OIw1Cu_WC2N48Q",
      authDomain: "sabl-rockies.firebaseapp.com",
      databaseURL: "https://sabl-rockies-default-rtdb.firebaseio.com",
      projectId: "sabl-rockies",
      storageBucket: "sabl-rockies.appspot.com",
      messagingSenderId: "819552489554",
      appId: "1:819552489554:web:77e31bc917bb3697e60f8b",
      measurementId: "G-EJPXMDQPK0"
    };
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const today = (new Date()).toISOString();
    const postData = {
        Votes: votes.join(', '),
        Date: today
    };

    const newPostKey = push(child(ref(db), `/AllStarVote/2024`)).key;

    const updates = {};
    updates[`/AllStarVote/2024/${newPostKey}`] = postData;

    update(ref(db), updates);

    localStorage.setItem("2024AllStarVote", true);
    
    setVotes([]);
    setVoteSubmitted(true);
  };

  useEffect(() => {
    setVoteSubmitted(localStorage.getItem("2024AllStarVote"));
    // Fetch Schedule
    let data = localStorage.getItem("Data");
    if (!data) {
      setTimeout(() => {
        let data = localStorage.getItem("Data");
        let parsedPlayers = JSON.parse(data);
        parsedPlayers = Object.values(parsedPlayers.Roster);
        setPlayers(parsedPlayers);
      }, 2000);
    }

    if (data) {
      let parsedPlayers = JSON.parse(data);
      parsedPlayers = Object.values(parsedPlayers.Roster);
      setPlayers(parsedPlayers);
    }
  }, []);

  return (
    <div style={{backgroundColor: "#333366"}}>
      <Container style={{backgroundColor: "white", paddingBottom: "15px"}}>
        <h1 style={{padding: "15px 0"}}>2024 All-Star Vote</h1>
        { voteSubmitted ?
            <Alert variant="success">"Your 2024 All-Star Votes Have Been Successfully Submitted!"</Alert> :
            <Form>
                <Alert variant="info">"You can vote for up to 3 players for the 2024 All-Star game. To learn more about players statistics, you can go to the Stats page."</Alert>
                <Stack gap={3}>
                {players.map((player, index) =>
                    <Card key={index}>
                        <Card.Title style={{display: "flex", margin: "5px"}}>
                            <Form.Check
                                type="checkbox"
                                id={index}
                                onChange={() => selectPlayer(player.Name)}
                                checked={votes.includes(player.Name)}
                                style={{marginRight: "10px"}}
                            />
                            {`#${player.Number} ${player.Name}`}
                        </Card.Title>
                        <Card.Body>
                            <Card.Text>
                                Positions: {player.Position}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}
                </Stack>
                <Button variant="primary" style={{marginTop: "15px"}} disabled={votes.length === 0} onClick={() => submitVotes()}>Submit</Button>
            </Form>
        }
      </Container>
    </div>
  );
}
