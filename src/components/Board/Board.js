import React, { useRef } from 'react';
import Speech from 'react-speech';
import { Row, Col } from "react-bootstrap";
import { Card, CardMedia, CardContent } from "@mui/material";

const cardStyle = {
    width: "18rem"
};

const cardSelect = {
    boxShadow: "2px 4px 30px 0px rgba(0, 0, 0, 0.75)"
};

function Board(props) {
    // useRef is used to store a reference to a DOM element 
    const refs = useRef([]);

    // destructured board data from props
    const { title, cards, selectedCard, setSelectedCard } = props.boardData

    // plays audio on card click
    const handleClick = (cardNum) => {
        // console.group('the event is ', e)
        // console.log('my element is ', myElement.current)
        console.log('refs ', refs.current[cardNum])
        console.log('card num is ', cardNum)
        setSelectedCard(cardNum)
        // setSelectedCard(refs.current[title].props.text)
        console.log('selected card is ', selectedCard)
        return refs.current[cardNum].play()
        // return refs.current[title].play()

    }

    // display board title
    const displayBoardTitle = () => {
        return (
            <div>
                { title && <h1>{ title }</h1> }
            </div>
        )
    }

    // display cards
    const displayCards = () => {
        console.log('cards data ', cards)
        let cardsData = []
        // console.log('cards inside display cards ', cards)
        // console.log('cards length ', cards.length)
        for (let card of cards) {
            // console.log('loop')
            const { id, cardNum, title, image, video } = card
            cardsData.push(
                <Col>
                    <Card className='m-5' style={{ ...cardStyle, ...(selectedCard === (cardNum || id) && cardSelect) }} onClick={() => handleClick(cardNum ? cardNum : id)}>
                        { image && <CardMedia component='img' image={ image }></CardMedia> }
                        { video && <CardMedia component='video' image={ video } autoPlay muted></CardMedia> }
                        <CardContent>
                            <Speech ref={(element) => {refs.current[cardNum ? cardNum : id] = element}} text={title} rate="0.8" textAsButton="true" disabled='true' voice="Daniel"/>
                        </CardContent>
                    </Card>
                </Col>   
            )
        }
        return (
            <Row>{ cardsData }</Row>
        )
    }

    return (
        <div>
            { displayBoardTitle() }
            { displayCards() }
        </div>
    )
}
export default Board;