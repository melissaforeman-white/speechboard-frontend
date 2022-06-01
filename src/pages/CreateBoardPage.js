import { useRef, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Speech from 'react-speech';
import SpeechBoardAPI from '../api/SpeechBoardAPI'
// import Board from '../components/Board/Board

function CreateBoard(props) {
    let params = useParams();
    console.log('params ', typeof parseInt(params.size))

    const myElement = useRef(null);
    const [board, setBoard] = useState([])
    const [boardTitle, setBoardTitle] = useState([])
    const [cardTitle, setCardTitle] = useState([])
    const [media, setMedia] = useState([])

    const handleClick = (e) => {
        return myElement.current.play()

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const boardObject = {
            title: e.target[0].value,
            cards: [{
                title: e.target[1].value,
                image: e.target[2].value,
                video: null
            }]
        }
        SpeechBoardAPI.addBoard(boardObject)
    }

    const handleChange = (e) => {
        e.preventDefault()
        // console.log('the event is ', e.target.value)
        if (e.target.id == 'boardName') {
            setBoardTitle(e.target.value)
        }
        else if (e.target.id == 'cardName') {
            setCardTitle(e.target.value)
        }
        else {
            setMedia(e.target.value)
        }

    }

    const displayBoardTitle = () => {
        return (
            <div>
                { boardTitle && <h1>{ boardTitle }</h1> }
                { !boardTitle && <h1>Board Name Goes Here</h1> }
            </div>
        )
    }

    const displayPreviewButtons = () => {
        let buttons = []
        for (let i = 0; i < params.size; i++) {
            buttons.push(
                <Col>
                    <Card className='m-5' style={{ width: '18rem' }} onClick={(e) => handleClick(e)} >
                        { media && <Card.Img variant="top" src={`${media}`} /> }
                        { !media && <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/05/28/18/59/group-2351896_1280.png" /> }
                        <Card.Body>
                        <Card.Text>
                            { cardTitle && <Speech ref={myElement} text={ cardTitle } rate="0.8" textAsButton="true" disabled='true'/> }
                            { !cardTitle && <Speech ref={myElement} text='Text Goes Here' rate="0.8" textAsButton="true" disabled='true'/>}
                            {/* { !cardTitle && <Speech ref={myElement} text='Text Goes Here' rate="0.8" textAsButton="true" play='false' disabled='true'/>} */}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                // <Board board={board}></Board>
            )
        }
        return (
            <Row>{ buttons }</Row>
        )
    }

    const displayForm = () => {
        return (
            <Form className="mt-5" onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleChange(e)}>
                <Form.Group className="mb-3" controlId="boardName">
                    <Form.Label>Enter Board Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter board title" />
                    <Form.Text className="text-muted" id='boardTitle'>
                        Edit the Board Title Here
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="cardName">
                    <Form.Label>Enter Card Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter card name" />
                    <Form.Text className="text-muted">
                        This is what will talk when clicked.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="cardImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Select an image" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Button
                </Button>
            </Form>
        )
    }

    return (
        <Container className="board" direction="horizontal" gap={5}>
            <Row>
                <Link to="/boards">Go to Boards</Link>
            </Row>
            <Row>
                <Col>{ displayForm() }</Col>
            </Row>
            <Row>
                <div>{ displayBoardTitle() }</div>
            </Row>
            { displayPreviewButtons() } 
        </Container>
    )
}

export default CreateBoard;