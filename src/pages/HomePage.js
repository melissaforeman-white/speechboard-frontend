import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from '../components/Board/Board.js'
import './HomePage.css';


function HomePage() {

    return (
        <Container direction='horizontal'>
            <Row>
                <Col className="m-5"><Board/></Col>
                <Col className="m-5"><Board/></Col>
                <Col className="m-5"><Board/></Col>
                <Col className="m-5"><Board/></Col>

                {/* <Col className="m-5" lg={5}>
                    <h2>Try me!</h2>
                    <Image src="https://www.jing.fm/clipimg/full/326-3262623_hand-drawn-down-arrow.png" alt='arrow'width='400'/>
                </Col> */}
            </Row>
        </Container>
    )
}

export default HomePage;