import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SpeechBoardAPI from '../api/SpeechBoardAPI'
import Board from '../components/Board/Board'

function BoardDetailPage (props) {
    //states
    const [board, setBoard] = useState(null)

    //router props
    const params = useParams()

    //effects
    useEffect(() => {
        const getBoard = async() => {
            const data = await SpeechBoardAPI.fetchBoardByID(params.id)
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
        console.log('board is ', board)
        return board.cards.map((card, index) => {
            console.log('card ', card)
            return (
                <Board card={card}></Board>
            )
        })
    }


    return (
        <div>
            <h1>{ board ? board.title : "Title Goes Here" }</h1>
            <hr />
            { renderBoard() }
        </div>
    )
}

export default BoardDetailPage