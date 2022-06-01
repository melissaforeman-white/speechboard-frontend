import { Container, Row, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function SelectSize(props) {
    let navigate = useNavigate()

    const handleClick = (e) => {
        navigate(`/boards/new/${e.target.id}`)
    }
    const generateSizeButtons = () => {
        let options = [{title:'1 place board', size : 1}, {title:'2 place board', size:2}, {title:'4 place board', size:4}, {title:'10 place board', size: 10}, {title:'11 place board', size: 11}, {title:'20 place board', size:20}]
        return options.map((sizeObj, idx) => {
            return (
            <Row key={ idx }>
                <div className="d-grid gap-2 mb-5">
                    <Button id={ sizeObj.size } variant="secondary" size="lg" onClick={(e) => handleClick(e)}>
                        { sizeObj.title }
                    </Button>
                </div>
            </Row>)
        })
    }
    return (
        <Container>
            { generateSizeButtons()}
        </Container>
    )
}

export default SelectSize;