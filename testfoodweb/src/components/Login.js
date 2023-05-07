import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import API, { authAPI, endpoints } from "../configs/API";
import cookie from "react-cookies"
import UserContext from "../configs/Context";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(UserContext)

    const login = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let res = await API.post(endpoints['login'], {
                    "grant_type": "password",
                    "username": username,
                    "password": password,
                    "client_id": "8nWMcHloiAXvPVXcoHMY9idwcanDdshibONCse5Z",
                    "client_secret": "yZJHqLKyiXJ2kl51tIeA5xAvaCW1jxXduyHLl3KiNXePdk7jUGS8rq4j6ByYLOU56Nq4avxEuXLmsOYCDEQQ0L8bleOgDJGclpDZKSymkoPGzzu0iPivizDFiK26kcWf"
                }, {headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }})

                cookie.save('access-token', res.data.access_token)

                let user = await authAPI().get(endpoints['current-user'])

                cookie.save('current-user', user.data)

                console.info(user.data)

                dispatch({
                    "type": "login",
                    "payload": user.data
                })
            } catch {

            }
            finally {
                
            }
        }

        process()
    }

    if (user !== null)
        return <Navigate to="/" />

    return (
        <>
            <h1 className="text-center text-success">Form Đăng nhập</h1>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" 
                                value={username}
                                onChange={e => setUsername(e.target.value)} 
                                placeholder="Tên đăng nhập..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Mật khẩu..." />
                </Form.Group>

                <Button variant="primary" type="submit">Đăng nhập</Button>
                
            </Form>
        </>
    )
}

export default Login;