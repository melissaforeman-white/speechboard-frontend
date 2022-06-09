import fetchJoke from "../../api/JokeAPI";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function Joke() {
  //states
  const [punSetUp, setPunSetUp] = useState("");
  const [punDelivery, setPunDelivery] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  // effects
  useEffect(() => {
    const getJoke = async () => {
      const response = await fetchJoke();
      console.log("response is ", response);
      setPunSetUp(response.setup);
      setPunDelivery(response.delivery);
    };
    getJoke();
  }, []);

  return (
    <div>
      <h2>Here's a random pun to brighten up your day!</h2>
      <h2>{punSetUp}</h2>
      {showAnswer && <h2 className="lead">{punDelivery}</h2>}
      <Button variant="primary" onClick={() => setShowAnswer(true)}>
        Click Here to See the Answer!
      </Button>
    </div>
  );
}

export default Joke;
