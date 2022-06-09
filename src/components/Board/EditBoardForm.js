// import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom"
// import SpeechBoardAPI from '../api/SpeechBoardAPI'
// import PexelsAPI from '../api/PexelsAPI'

// const EditBoardForm = (props) => {
//     let navigate = useNavigate()
//     const { title, cards, selectedCard, setSelectedCard, selectedMediaType, setSelectedMediaType, setBoardTitle, setCardsData } = props.boardData

//     // returns url with query from API 
//     const getMedia = async (query, mediaType) => {
//         if (mediaType === 'image') {
//             const response = await PexelsAPI.fetchImage(query)
//             const imgURL = response.photos[0].src.tiny
//             setCardsData(cardsData.map((card) => {
//                 return card.id === selectedCard ? {...card, 'image': imgURL} : {...card}
//             }))
//         }
//         else if (mediaType === 'video') {
//             const response = await PexelsAPI.fetchVideo(query)
//             const videoURL = response.videos[0]['video_files'][2].link
//             setCardsData(cardsData.map((card) => {
//                 return card.id === selectedCard ? {...card, 'video': videoURL} : {...card}
//             }))
//         }
//     }
//     // handles Submit of the edited form
//     const handleEdit = async (e) => {
//         e.preventDefault()

//         const boardObject = {
//             id: id,
//             title: boardTitle,
//             cards: cardsData
//         }
//         SpeechBoardAPI.editBoard(boardObject)
//         navigate('/boards')
//     }

//     const handleDelete = () => {
//         SpeechBoardAPI.deleteBoard(id)
//         navigate('/boards')
//     }

//     const handleChange = async (e) => {
//         e.preventDefault()

//         if (e.target.id == 'cardName') {
//             setCardsData(cardsData.map((card) => {
//                 return  (
//                     card.id === selectedCard ? {...card, "title": e.target.value} : {...card}
//                 )
//             }))
//         }
    
//         else if (e.target.id === 'cardMedia') {
//             return await getMedia(e.target.value, selectedMediaType)
//         }
//     }
//     const previewCardName = () => {
//         for (let card of cardsData) {
//             if (card.id === selectedCard) {
//                 return card.title
//             }
//         }
//     }
    
//     const displayForm = () => {
//         return (
//             <div className="mt-5 w-50 bg-light">
//                 <Form className="m-5" onSubmit={(e) => handleEdit(e)} >
//                     <Form.Group className="mb-3" controlId="boardName">
//                         <Form.Label>Enter Board Title</Form.Label>
//                         <Form.Control type="text" value={ boardTitle } onChange={(e) => setBoardTitle(e.target.value)}/>
//                         <Form.Text className="text-muted" id='boardTitle'>
//                             Edit the Board Title Here
//                         </Form.Text>
//                     </Form.Group>
    
//                     <Form.Group className="mb-3" controlId="cardName">
//                         <Form.Label>Enter Card Name</Form.Label>
//                         <Form.Control type="text" value={ previewCardName() } onChange={(e) => handleChange(e)}/>
//                         <Form.Text className="text-muted">
//                             Edit Card Name Here, This is what will talk when clicked.
//                         </Form.Text>
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
    
//                     <Button className="m-3" variant="primary" type="submit">
//                         Save Board
//                     </Button>
//                     <br />
//                     <Button className="m-3" variant="danger" onClick={() => handleDelete()}>
//                         Delete Board
//                     </Button>
//                 </Form>
//             </div>
//         )
//     }
//     return (
//         <div>
//             { displayForm() }
//         </div>
//     )
// }

// export default EditBoardForm;