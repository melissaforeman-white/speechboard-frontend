import { useState, useEffect, useContext } from 'react'
import SpeechBoardAPI from '../api/SpeechBoardAPI'
import BoardList from  '../components/Board/BoardList'
import UserContext from '../contexts/UserContext'

function MyBoards(props) {
    //states 
    const [boards, setBoards] = useState([])
    
    // contexts
    let { authTokens } = useContext(UserContext)

    // effects 
    useEffect(() => {
        const getBoards = async () => {
            console.log('token ', authTokens)
            const token = authTokens.access
            const data = await SpeechBoardAPI.fetchBoards(token)
            if (data) {
                console.log('the data.boards is ', data)
                setBoards(data)
            }
        }
        getBoards()
    }, [])

    return (
        <div>
            <BoardList boards={boards}/>
        </div>
    )
}

export default MyBoards;