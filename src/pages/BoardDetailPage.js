import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import SpeechBoardAPI from '../api/SpeechBoardAPI'
import Board from '../components/Board/Board'
import UserContext from '../contexts/UserContext'
// import { Button } from "react-bootstrap";

function BoardDetailPage (props) {
    //states
    const [board, setBoard] = useState(null)
    const [selectedCard, setSelectedCard] = useState('')
    //router props
    const params = useParams()
    //contexts
    let { authTokens } = useContext(UserContext)
    //effects
    useEffect(() => {
        const getBoard = async() => {
            const token = authTokens.access
            const data = await SpeechBoardAPI.fetchBoardByID(params.id, token)
            if (data) {
                setBoard(data)
            }
        }
        getBoard()
    }, [params.boardID])

    //render 
    const renderBoard = () => {
        if (!board) {
            return null
        }
        return (
            <Board boardData= {{ ...board, 'selectedCard': selectedCard, 'setSelectedCard': setSelectedCard}}/>
        )
    }

    return (
        <div>
            { renderBoard() }
            <Link to="edit/" state={{ boardData: board }}>Edit Board</Link>
        </div>
    )
}

export default BoardDetailPage;


// this is what i am working on refactoring after i submit the project - don't want to mess anything up lol
// import { useState, useEffect, useContext } from 'react'
// import { Link, useParams, useNavigate } from 'react-router-dom'
// import SpeechBoardAPI from '../api/SpeechBoardAPI'
// import Board from '../components/Board/Board'
// import UserContext from '../contexts/UserContext'
// // import { Button } from "react-bootstrap";

// function BoardDetailPage (props) {
//     // use navigate
//     let navigate = useNavigate()
//     //states
//     const [board, setBoard] = useState(null)
//     const [selectedCard, setSelectedCard] = useState('')
//     //router props
//     const params = useParams()
//     //contexts
//     let { authTokens } = useContext(UserContext)
//     //effects
//     useEffect(() => {
//         const getBoard = async() => {
//             const token = authTokens.access
//             const data = await SpeechBoardAPI.fetchBoardByID(id, token)
//             // const data = await SpeechBoardAPI.fetchBoardByID(board.id, token)
//             if (data) {
//                 setBoard(data)
//             }
//         }
//         getBoard()
//     }, [params.boardID])

//     //render 
//     const renderBoard = () => {
//         if (!board) {
//             return null
//         }
//         return (
//             <Board boardData= {{ ...board, 'selectedCard': selectedCard, 'setSelectedCard': setSelectedCard}}/>
//         )
//     }
//     const handleDelete = () => {
//         const token = authTokens.access
//         // SpeechBoardAPI.deleteBoard(board.id, token)
//         SpeechBoardAPI.deleteBoard(id, token)
//         navigate('/boards')
//     }

//     return (
//         <div>
//             { renderBoard() }
//             <Link to="edit/" state={{ boardData: board }}>Edit Board</Link>
//             {/* <Link to="/CRUD" state={{ action: "edit", boardData: board }}>Edit Board</Link>
//             <Button className="m-3" variant="danger" onClick={() => handleDelete()}>Delete Board</Button> */}
//         </div>
//     )
// }

// export default BoardDetailPage;