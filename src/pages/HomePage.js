import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Board from "../components/Board/Board";
import "./HomePage.css";
import Joke from "../components/Joke/Joke";

function HomePage() {
  const [selectedCard, setSelectedCard] = useState("");

  // example board is hard coded for now
  let exampleBoard = {
    title: "",
    cards: [
      {
        id: 1,
        title: "Welcome!",
        image:
          "https://cdn.pixabay.com/photo/2017/05/28/18/59/group-2351896_1280.png",
        video: "",
      },
    ],
  };

  return (
    <div className="background">
      <Container>
        <Row>
          <div className="p-5 mt-3 mb-5 bg-light border m-5">
            <h1>Welcome to Speech Board.</h1>
            <p className="lead">
              Here at SpeechBoard our mission is to provide access to custom
              communication boards, free of charge.{" "}
            </p>
          </div>
        </Row>
        <Row>
          <Col>
            <img
              src="https://cdn.elearningindustry.com/wp-content/uploads/2012/11/free-special-needs-ipad-apps-part-1-1.jpg"
              alt="child using ipad"
            />
          </Col>
          <Col>
            <h3 className="mb-1">Click me for demo!</h3>
            <div style={{ marginLeft: "34px" }}>
              <Board
                boardData={{
                  ...exampleBoard,
                  selectedCard: selectedCard,
                  setSelectedCard: setSelectedCard,
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <div className="p-5 mb-5 bg-light border m-5">{<Joke />}</div>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
