import { useContext, useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../configs/Context";

const Header = () => {
    const [categories, setCategories] = useState([])
    const [kw, setKw] = useState("")
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)

    useEffect(() => {
        const loadCategories = async () => {
            let res = await API.get(endpoints['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, [])

    const search = (evt) => {
        evt.preventDefault()
        nav(`/?kw=${kw}`)
    }

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    let userInfo = (
        <>
            <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>
        </>
    )

    if (user !== null)
        userInfo = (
            <>
                <Link to="/" className="nav-link text-success">
                        <img src={user.image} width="40" className="rounded-circle" />
                        Welcome {user.username}!
                </Link>
                <button onClick={logout} className="btn btn-success">Đăng xuất</button>
            </>
        )

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Hệ thống đặt món</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Trang chủ</Nav.Link>
                        {categories.map(c => {
                            let url = `/?cateId=${c.id}`
                            return <Link className="nav-link" to={url} href="#link" key={c.id}>{c.name}</Link>
                    })}

                    {userInfo}
                    </Nav>

                    <Form className="d-flex" onSubmit={search}>
                        <Form.Control type="search" placeholder="Tên món ăn..." className="me-2" aria-label="Tìm"
                                    value={kw} onChange={(e) => setKw(e.target.value)}
                        />
                        <Button type="submit" variant="outline-success">Tìm</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
        
    )
}
export default Header;