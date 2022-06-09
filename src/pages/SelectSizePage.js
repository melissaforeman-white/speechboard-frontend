import { Container, Row, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';

function SelectSize(props) {
    let navigate = useNavigate()

    const handleClick = (e) => {
        const size = e.target.id
        navigate(`/boards/new/${size}`)
    }
    
    const generateSizeButtons = () => {
        let options = [{title:'1 place board', size : 1}, {title:'2 place board', size:2}, {title:'3 place board', size:3}, {title:'6 place board', size: 6}, {title:'9 place board', size: 9}]
        return options.map((sizeObj, idx) => {
            return (
            <Row key={ idx }>
                <div className="d-grid gap-2 mb-5">
                    <Button id={ sizeObj.size } variant="secondary" size="lg" onClick={(e) => handleClick(e)}>
                        { sizeObj.title }
                    </Button>
                </div>
            </Row>
            )
        })
    }
    return (
        <Container>
            { generateSizeButtons()}
        </Container>
    )
}
export default SelectSize;

// refactored code
// import { Container, Row, Button } from "react-bootstrap";
// import { useNavigate, Link } from 'react-router-dom';

// function SelectSize(props) {
//     let navigate = useNavigate()

//     const handleClick = (e) => {
//         const size = e.target.id
//         navigate(`/boards/new/${size}`)
//     }
    
//     const generateSizeButtons = () => {
//         let options = [{title:'1 place board', size : 1}, {title:'2 place board', size:2}, {title:'3 place board', size:3}, {title:'6 place board', size: 6}, {title:'9 place board', size: 9}]
//         return options.map((sizeObj, idx) => {
//             return (
//             <Row key={ idx }>
//                 <div className="d-grid gap-2 mb-5">
//                     <Button id={ sizeObj.size } variant="secondary" size="lg" onClick={(e) => handleClick(e)}>
//                         { sizeObj.title }
//                     </Button>
//                     {/* <Link to="/CRUD" state={{ action: "create", boardSize: sizeObj.size }}>
//                         <Button id={ sizeObj.size } variant="secondary" size="lg">{ sizeObj.title }</Button>
//                     </Link> */}
//                 </div>
//             </Row>
//             )
//         })
//     }
//     return (
//         <Container>
//             { generateSizeButtons()}
//         </Container>
//     )
// }
// export default SelectSize;