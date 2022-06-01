import { Card } from 'react-bootstrap';
import React, { useRef } from 'react';
import Speech from 'react-speech';


function Board(props) {
    const myElement = useRef(null);
    console.log('props data ', props)
    const cardData = props.card

    const handleClick = (e) => {
        return myElement.current.play()
    }

    return (
        <div className="board">
            <Card style={{ width: '18rem' }} onClick={(e) => handleClick(e)} >
                <Card.Img variant="top" src={ cardData ? cardData.image : "https://cdn.pixabay.com/photo/2017/05/28/18/59/group-2351896_1280.png"} />
                <Card.Body>
                <Card.Text>
                    <Speech ref={myElement} text={ cardData ? cardData.title : "Welcome to Speech Board"} rate="0.8" textAsButton="true" disabled='true'/>
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Board;
// onClick={() => handleClick(myText)}