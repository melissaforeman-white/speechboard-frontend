import React, { useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SpeechBoardAPI from '../api/SpeechBoardAPI'
import PexelsAPI from '../api/PexelsAPI'
import Board from '../components/Board/Board'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from '../contexts/UserContext'

function CreateBoardPage(props) {

    let navigate = useNavigate()
    let params = useParams();
    // get board size with params
    let boardSize = parseInt(params.size)
    // contexts
    let { authTokens } = useContext(UserContext)
    // create initial state for cards data
    const createCardsTemplate = () => {
        let cards = []
        for (let i = 1; i < boardSize + 1; i++) {
            cards.push({
                'cardNum': i,
                'title': '',
                'image': '',
                'video': ''
            })
        }
        return cards
    }
    // state for board title, cards data and selected card
    const [boardTitle, setBoardTitle] = useState('Title Goes Here')
    const [cardsData, setCardsData] = useState(createCardsTemplate())
    const [selectedCard, setSelectedCard] = useState('')
    const [selectedMediaType, setSelectedMediaType] = useState('')

    // returns url with query from API 
    const getMedia = async (query, mediaType) => {
        if (mediaType === 'image') {
            const response = await PexelsAPI.fetchImage(query)
            const imgURL = response.photos[0].src.tiny
            setCardsData(cardsData.map((card) => {
                return card.cardNum === selectedCard ? {...card, 'image': imgURL} : {...card}
            }))
        }
        else if (mediaType === 'video') {
            const response = await PexelsAPI.fetchVideo(query)
            const videoURL = response.videos[0]['video_files'][2].link
            setCardsData(cardsData.map((card) => {
                return card.cardNum === selectedCard ? {...card, 'video': videoURL} : {...card}
            }))
        }
    }

    // handles submit of form
    const handleSubmit = async (e) => {
        const token = authTokens.access
        e.preventDefault()
        SpeechBoardAPI.addBoard({'title': boardTitle, 'cards': cardsData}, token)
        navigate('/boards')
    }

    // handles user changing board title, card title, and card image/video
    const handleChange = async (e) => {
        e.preventDefault()

        if (e.target.id === 'cardName') {
            setCardsData(cardsData.map((card) => {
                return  (
                    card.cardNum === selectedCard ? {...card, "title": e.target.value} : {...card}
                )
            }))
        }
        else if (e.target.id === 'cardMedia') {
            return await getMedia(e.target.value, selectedMediaType)
        }
    }

    // displays preview of board and cards
    const createPreviewBoard = () => {
        return (
            <Board boardData= {{'title':boardTitle, 'cards':cardsData, 'selectedCard': selectedCard, 'setSelectedCard': setSelectedCard}}></Board>
        )
    }

    // renders form for creating board
    const displayForm = () => {
        return (
            <div className="mt-5 w-50 bg-light">
                <Form className="m-5" onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="boardName" onChange={(e) => setBoardTitle(e.target.value)}>
                        <Form.Label>Enter Board Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter board title" />
                        {/* <Form.Text className="text-muted" id='boardTitle'>
                            Edit the Board Title Here
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cardName" onChange={(e) => handleChange(e)}>
                        <Form.Label>Enter Card Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter card name" />
                        {/* <Form.Text className="text-muted">
                            Click on Card Below to Edit This Field. This is what will talk when clicked.
                        </Form.Text> */}
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

                    <Button variant="primary" type="submit">
                        Create Board
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
export default CreateBoardPage;

// refactored code to work on later

// import React, { useState} from 'react';
// import { useParams, useNavigate } from "react-router-dom"
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import SpeechBoardAPI from '../api/SpeechBoardAPI'
// import PexelsAPI from '../api/PexelsAPI'
// import Board from '../components/Board/Board'
// import 'bootstrap/dist/css/bootstrap.min.css';

// function CreateBoardPage(props) {
//     let navigate = useNavigate()
//     let params = useParams();
//     // get board size with params
//     let boardSize = parseInt(params.size)

//     // create initial state for cards data
//     const createCardsTemplate = () => {
//         let cards = []
//         for (let i = 1; i < boardSize + 1; i++) {
//             cards.push({
//                 'cardNum': i,
//                 'title': '',
//                 'image': '',
//                 'video': ''
//             })
//         }
//         return cards
//     }
//     // state for board title, cards data and selected card
//     const [boardTitle, setBoardTitle] = useState('Title Goes Here')
//     const [cardsData, setCardsData] = useState(createCardsTemplate())
//     const [selectedCard, setSelectedCard] = useState('')
//     const [selectedMediaType, setSelectedMediaType] = useState('')

//     // returns url with query from API 
//     const getMedia = async (query, mediaType) => {
//         if (mediaType === 'image') {
//             const response = await PexelsAPI.fetchImage(query)
//             const imgURL = response.photos[0].src.tiny
//             setCardsData(cardsData.map((card) => {
//                 return card.cardNum === selectedCard ? {...card, 'image': imgURL} : {...card}
//             }))
//         }
//         else if (mediaType === 'video') {
//             const response = await PexelsAPI.fetchVideo(query)
//             const videoURL = response.videos[0]['video_files'][2].link
//             setCardsData(cardsData.map((card) => {
//                 return card.cardNum === selectedCard ? {...card, 'video': videoURL} : {...card}
//             }))
//         }
//     }

//     // handles submit of form
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         SpeechBoardAPI.addBoard({'title': boardTitle, 'cards': cardsData})
//         navigate('/boards')
//     }

//     // handles user changing board title, card title, and card image/video
//     const handleChange = async (e) => {
//         e.preventDefault()

//         if (e.target.id === 'cardName') {
//             setCardsData(cardsData.map((card) => {
//                 return  (
//                     card.cardNum === selectedCard ? {...card, "title": e.target.value} : {...card}
//                 )
//             }))
//         }
//         else if (e.target.id === 'cardMedia') {
//             return await getMedia(e.target.value, selectedMediaType)
//         }
//     }

//     // displays preview of board and cards
//     const createPreviewBoard = () => {
//         return (
//             <Board boardData= {{'title':boardTitle, 'cards':cardsData, 'selectedCard': selectedCard, 'setSelectedCard': setSelectedCard}}></Board>
//         )
//     }

//     // renders form for creating board
//     const displayForm = () => {
//         return (
//             <div className="mt-5 w-50 bg-light">
//                 <Form className="m-5" onSubmit={(e) => handleSubmit(e)}>
//                     <Form.Group className="mb-3" controlId="boardName" onChange={(e) => setBoardTitle(e.target.value)}>
//                         <Form.Label>Enter Board Title</Form.Label>
//                         <Form.Control type="text" placeholder="Enter board title" />
//                         {/* <Form.Text className="text-muted" id='boardTitle'>
//                             Edit the Board Title Here
//                         </Form.Text> */}
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="cardName" onChange={(e) => handleChange(e)}>
//                         <Form.Label>Enter Card Name</Form.Label>
//                         <Form.Control type="text" placeholder="Enter card name" />
//                         {/* <Form.Text className="text-muted">
//                             Click on Card Below to Edit This Field. This is what will talk when clicked.
//                         </Form.Text> */}
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="cardMedia" >
//                         <Form.Select id="mediaType" onChange={(e) => setSelectedMediaType(e.target.value)}>
//                             <option>Select Image or Video</option>
//                             <option value="image">Image</option>
//                             <option value="video">Video</option>
//                         </Form.Select>
//                         { selectedMediaType && <Form.Control type="text" placeholder="Search for image or video here" onChange={(e) => handleChange(e)}/> }
//                         { selectedMediaType && <Form.Text className="text-muted">
//                         Click on Card Below to Edit This Field. This is the {selectedMediaType} that will be displayed.
//                         </Form.Text>
//                         }
                    
//                     </Form.Group>

//                     <Button variant="primary" type="submit">
//                         Create Board
//                     </Button>
//                 </Form>
//             </div>
//         )
//     }

//     return (
//         <Container className="board" direction="horizontal" gap={5}>
//             <Row>
//                 <Col>{ displayForm() }</Col>
//             </Row>
//             <Row>
//                 <Col>{ createPreviewBoard() }</Col>
//             </Row>
//         </Container>
//     )
// }
// export default CreateBoardPage;

