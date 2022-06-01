import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import SpeechBoardAPI from '../api/SpeechBoardAPI'
import BoardList from  '../components/Board/BoardList'

function MyBoards(props) {
    let navigate = useNavigate();

    //states 
    const [boards, setBoards] = useState([])

    // effects 
    useEffect(() => {
        const getBoards = async () => {
            const data = await SpeechBoardAPI.fetchBoards()
            if (data) {
                console.log('the data.boards is ', data)
                setBoards(data)
            }
        }
        getBoards()
    }, [])

    const createBoardButton = () => {
        return (
            <Card border="secondary" className='m-3' style={{ width: '18rem' }} onClick={() => navigate("/boards/new")}>
                <Card.Body>
                    <Card.Title>Create a Board</Card.Title>
                </Card.Body>
            </Card>
        )
    }

    return (
        <div>
            <Container className="boards" direction="horizontal" gap={5}>
                <Row>
                    { createBoardButton() }
                </Row>
            </Container>
            <BoardList boards={boards}/>
        </div>
    )
}

export default MyBoards;