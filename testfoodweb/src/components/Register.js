import { useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import InputItem from "../layouts/InputItem"
import API, { endpoints } from "../configs/API"

const Register = () => {
    const [user, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "username": "",
        "email": "",
        "password": "",
        "confirmPassword": ""
    })

    const register = (evt) => {
        evt.preventDefault()

        const process = async () => {
            let form = new FormData()
            form.append("first_name", user.firstName)
            form.append("last_name", user.lastName)
            form.append("email", user.email)
            form.append("username", user.username)
            form.append("password", user.password)
            form.append("userrole", user.userrole)
            form.append("cmnd", user.cmnd)
            if (avatar.current.files.length > 0)
                form.append("avatar", avatar.current.files[0])

            let res = await API.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.info(res.data)
        }
        process()
    }

    const avatar = useRef()

    return (
        <>
            <h1 className="text-center">ĐĂNG KÝ NGƯỜI DÙNG HỆ THỐNG</h1>
            <Form onSubmit={register}>
                <InputItem label="Tên" value={user.firstName} controlId="firstName" type="text"
                    setValue={(e) => setUser({ ...user, "firstName": e.target.value })} />
                <InputItem label="Họ và chữ lót" value={user.lastName} controlId="lastName" type="text"
                    setValue={(e) => setUser({ ...user, "lastName": e.target.value })} />
                <InputItem label="Tên đăng nhập" value={user.username} controlId="username" type="text"
                    setValue={(e) => setUser({ ...user, "username": e.target.value })} />
                <InputItem label="Email" value={user.email} controlId="email" type="text"
                    setValue={(e) => setUser({ ...user, "email": e.target.value })} />
                <InputItem label="Mật khẩu" value={user.password} controlId="password" type="password"
                    setValue={(e) => setUser({ ...user, "password": e.target.value })} />
                <InputItem label="Xác nhận mật khẩu" value={user.confirmPassword} controlId="confirmPassword"
                    setValue={(e) => setUser({ ...user, "confirmPassword": e.target.value })} />

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Ảnh đại diện</Form.Label>
                    <Form.Control type="file" ref={avatar} />
                </Form.Group>

                <Button variant="primary" type="submit">Đăng ký</Button>
            </Form>
        </>
    )
}

export default Register