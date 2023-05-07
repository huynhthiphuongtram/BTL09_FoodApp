import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { Button, ButtonGroup, Card, Col, Row, Spinner } from "react-bootstrap"
import { Link, useSearchParams } from "react-router-dom"

const Foods = () => {
    const [foods, setFoods] = useState(null)
    const [page, setPage] = useState(1)
    const [kw] = useSearchParams()

    useEffect(() => {
        const loadFoods = async () => {
            try{
                let e  = `${endpoints['foods']}?page=${page}`
                
                let k = kw.get("kw")
                if (k !== null)
                    e += `&kw=${k}`
                
                let c = kw.get("cateId")
                if (c !== null)
                    e += `&category_id=${c}`

                let res = await API.get(e)
                setFoods(res.data.results)
            }
            catch(ex) {
                setPage(1)
            }

        }

        loadFoods()
    }, [page, kw])

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)

    if (foods == null)
        return <Spinner animation="border" variant="primary" />

    return (
        <>
            <Row>
                {foods.map(f => {
                    let url = `/foods/${f.id}/`
                    return (
                        <Col md={3} xs={12} className="p-2">
                            <Card>
                                <Card.Img variant="top" src={f.image} />
                                <Card.Body>
                                    <Card.Title>{f.name}</Card.Title>
                                    <Card.Text>{f.price}</Card.Text>
                                    <Link to={url} className="btn btn-primary m-2">Xem chi tiết  </Link>
                                
                                    <Link  className="btn btn-primary">Thêm vào giỏ</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <ButtonGroup aria-label="Paginator" className="p-2">
                <Button  onClick={prevPage} variant="success">Trang trước</Button>
            </ButtonGroup>
            <ButtonGroup>
                 <Button  onClick={nextPage} variant="success">Trang sau</Button>
            </ButtonGroup>

        </>
    )
}

export default Foods;