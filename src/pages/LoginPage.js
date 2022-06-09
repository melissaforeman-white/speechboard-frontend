import { Form, Button } from 'react-bootstrap'
// import AccountsAPI from '../api/AccountsAPI'
import React, {useContext} from 'react'
import UserContext from '../contexts/UserContext'

function LoginPage(props) {

    let {loginUser} = useContext(UserContext)
    
    return (
        <div>
            <h1>SpeechBoard Login</h1>
            <Form className="m-5 w-50 bg-light" onSubmit={(e) => {loginUser(e);}}>
                <Form.Group className="mb-3" name= "username" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" name="password" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
    
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginPage;



// const handleLogin = async (e) => {
//     e.preventDefault();
//     const username = e.target[0].value
//     const password = e.target[1].value
//     const response = await AccountsAPI.accountLogin(username, password)
//     console.log('API response is ', response)
//     props.handleLogin(response)
// }