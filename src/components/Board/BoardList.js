import { Link } from 'react-router-dom'

function BoardList(props) {
    //render
    const renderBoards = () => {
        console.log('boards ', props.boards)
        if (!props.boards) {
            console.log('inside null')
            return null
        }

        return props.boards.map((board) => {
            return (
                <div><Link to={`/boards/${board.id}/`}>{ board.title }</Link></div>
            )
        })
    }
    return (
        <div>
            { renderBoards() }
        </div>
    )
}
export default BoardList