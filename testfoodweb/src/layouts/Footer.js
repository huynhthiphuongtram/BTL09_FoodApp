import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { Link } from "react-router-dom"

const Footer = () => {
    const [stores, setStores] = useState([])
    useEffect(() => {
        const loadStores = async () => {
            let res = await API.get(endpoints['stores'])
            setStores(res.data)
        }

        loadStores()
    }, [])

    return (
        <>
            <div className="bg-primary text-white mt-2 p-5">
                <h3>Bài Tập Lớn _ Đề Tài 9 &copy; 2023</h3>
                <h4>Danh sách các chi nhánh cửa hàng</h4>
                <p>
                        {stores.map(s => {
                                    let url = `/?storeName=${s.name}`
                                    return <Link className="nav-link" to={url} href="#link" key={s.id}>{s.name}</Link>
                            })}
                </p>
            </div>
            
        </>
    )
}

export default Footer;