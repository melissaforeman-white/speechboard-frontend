import { useState, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SpeechBoardAPI from '../api/SpeechBoardAPI'
import PexelsAPI from '../api/PexelsAPI'
import Board from '../components/Board/Board'
import UserContext from '../contexts/UserContext'

function EditBoard(props) {
    let navigate = useNavigate()
    const location = useLocation()

    // contexts
    let { authTokens } = useContext(UserContext)

    const { id, title, cards } = location.state.boardData
    const [boardTitle, setBoardTitle] = useState(title)
    const [cardsData, setCardsData] = useState(cards)
    const [selectedCard, setSelectedCard] = useState('')
    const [selectedMediaType, setSelectedMediaType] = useState('')

    // returns url with query from API 
    const getMedia = async (query, mediaType) => {
        if (mediaType === 'image') {
            const response = await PexelsAPI.fetchImage(query)
            const imgURL = response.photos[0].src.tiny
            setCardsData(cardsData.map((card) => {
                return card.id === selectedCard ? {...card, 'image': imgURL} : {...card}
            }))
        }
        else if (mediaType === 'video') {
            const response = await PexelsAPI.fetchVideo(query)
            const videoURL = response.videos[0]['video_files'][2].link
            setCardsData(cardsData.map((card) => {
                return card.id === selectedCard ? {...card, 'video': videoURL} : {...card}
            }))
        }
    }
    // handles Submit of the edited form
    const handleEdit = async (e) => {
        e.preventDefault()
        const token = authTokens.access
        const boardObject = {
            id: id,
            title: boardTitle,
            cards: cardsData
        }
        SpeechBoardAPI.editBoard(boardObject, token)
        navigate('/boards')
    }

    const handleDelete = () => {
        const token = authTokens.access
        SpeechBoardAPI.deleteBoard(id, token)
        navigate('/boards')
    }

    const handleChange = async (e) => {
        e.preventDefault()

        if (e.target.id == 'cardName') {
            setCardsData(cardsData.map((card) => {
                return  (
                    card.id === selectedCard ? {...card, "title": e.target.value} : {...card}
                )
            }))
        }
 
        else if (e.target.id === 'cardMedia') {
            return await getMedia(e.target.value, selectedMediaType)
        }
    }

    const createPreviewBoard = () => {
        return (
            <Board boardData= {{'id': id, 'title':boardTitle, 'cards':cardsData, 'selectedCard': selectedCard, 'setSelectedCard': setSelectedCard, 'selectedMediaType': selectedMediaType, 'setSelectedMediaType': setSelectedMediaType}}></Board>
        )
    }

    const previewCardName = () => {
        for (let card of cardsData) {
            if (card.id === selectedCard) {
                return card.title
            }
        }
    }

    const displayForm = () => {
        return (
            <div className="mt-5 w-50 bg-light">
                <Form className="m-5" onSubmit={(e) => handleEdit(e)} >
                    <Form.Group className="mb-3" controlId="boardName">
                        <Form.Label>Enter Board Title</Form.Label>
                        <Form.Control type="text" value={ boardTitle } onChange={(e) => setBoardTitle(e.target.value)}/>
                        <Form.Text className="text-muted" id='boardTitle'>
                            Edit the Board Title Here
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cardName">
                        <Form.Label>Enter Card Name</Form.Label>
                        <Form.Control type="text" value={ previewCardName() } onChange={(e) => handleChange(e)}/>
                        <Form.Text className="text-muted">
                            Edit Card Name Here, This is what will talk when clicked.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cardMedia" >
                        <Form.Select id="mediaType" onChange={(e) => setSelectedMediaType(e.target.value)}>
                            <option>Select Image or Video</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </Form.Select>
                        { selectedMediaType && <Form.Control type="text" placeholder="Search for image or video here" onChange={(e) => handleChange(e)}/> }
                        { selectedMediaType && <Form.Text className="text-muted">
                        Click on Card Below to Edit This Field. This is the {selectedMediaType} that will be displayed.
                        </Form.Text>
                        }
                    </Form.Group>

                    <Button className="m-3" variant="primary" type="submit">
                        Save Board
                    </Button>
                    <br />
                    <Button className="m-3" variant="danger" onClick={() => handleDelete()}>
                        Delete Board
                    </Button>
                </Form>
            </div>
        )
    }

    return (
        <Container className="board" direction="horizontal" gap={5}>
            <Row>
                <Col>{ displayForm() }</Col>
            </Row>
            <Row>
                <Col>{ createPreviewBoard() }</Col> 
            </Row>
        </Container>
    )
}

export default EditBoard;
