// import { useEffect, useState } from "react";
// import API, { endpoints } from "../configs/API";
// import { Spinner } from "react-bootstrap";
// import { useParams } from "react-router-dom";

const FoodDetails = () => {
    // const [details, setDetails] = useState(null)
    // const {foodId} = useParams()

    // useEffect(() => {
    //     const loadDetails = async () => {
    //         let res = await API.get(endpoints['details'](foodId))
    //         setDetails(res.data)
    //     }
        
    //     loadDetails()
    // }, [])

    // if (details === null)
    //     return <Spinner animation="grow" variant="primary"/>

    return (
        <>
            <h1 className="text-center text-info">Chi tiết món ăn</h1>
            {/* <ul>
                {details.map(d => <li>{d.name}</li>)}
            </ul> */}
        </>
    )
}

export default FoodDetails;