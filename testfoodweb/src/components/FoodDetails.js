import { useEffect, useState } from "react";
import API, { authAPI, endpoints } from "../configs/API";
import { Badge, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const FoodDetails = () => {
    const [details, setDetails] = useState(null)
    const { foodId } = useParams()

    useEffect(() => {
        const loadDetails = async () => {
            let res = await authAPI().get(endpoints['fooddetails'](foodId))
            console.info(res.data)
            setDetails(res.data)
        }
        loadDetails()
    }, [])

    if (details === null)
        return <Spinner animation="grow" variant="primary" />

    return (
        <>
            <h1 className="text-center text-info">Chi tiết món ăn</h1>
            <div className="d-flex content-around">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={details.image} />
                    <Card.Body>
                        <Card.Title>{details.name}</Card.Title>
                        <Button variant="primary">Đặt món</Button>
                    </Card.Body>
                </Card>
            </div>

            <p dangerouslySetInnerHTML={{ __html: details.description }}></p>
            <h6>{details.price}</h6>
            

        </>
    )
}

export default FoodDetails;