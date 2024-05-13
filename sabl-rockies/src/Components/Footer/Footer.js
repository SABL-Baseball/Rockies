import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
      <div style={{backgroundColor: "black", color: "white", padding: "15px 0"}}>
        <Container style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span>&#169;2024 SABL Rockies</span>
            <a href="https://www.youtube.com/@SABLRockies" target="_blank" rel="noopener noreferrer" style={{ color: "white", paddingLeft: "10px"}}>
                <FontAwesomeIcon icon={faYoutube} className="fa-2x" />
            </a>
            <a href="https://m.facebook.com/people/SABL-Rockies/61559200163089/" target="_blank" rel="noopener noreferrer" style={{color: "white", paddingLeft: "10px"}}>
                <FontAwesomeIcon icon={faFacebookSquare} className="fa-2x" />
            </a>
            <a href="https://www.instagram.com/sablrockies25/" target="_blank" rel="noopener noreferrer" style={{color: "white", paddingLeft: "10px"}}>
              <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
            </a>
        </Container>
      </div>
    );
}