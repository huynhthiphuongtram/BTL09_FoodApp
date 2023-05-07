import { useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import InputItem from "../layouts/InputItem"
import API, { endpoints } from "../configs/API"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [user, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "username": "",
        "password": "",
        "email": "",
        "confirmPassword": ""
    })

    const [err, setErr] = useState()

    const nav = useNavigate()
    
    const register = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("first_name", user.firstName)
                form.append("last_name", user.lastName)
                form.append("email", user.email)
                form.append("username", user.username)
                form.append("password", user.password)
                if (avatar.current.files.length > 0)
                    form.append("avatar", avatar.current.files[0])

                let res = await API.post(endpoints['register'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (res.status === 201)
                    nav("/login")
                else
                    setErr("Hệ thống đang bị lỗi! Vui lòng quay lại sau!")

            } catch {
                setErr("Username đã tồn tại")
            } finally {

            }
        }

        if (user.username === "" || user.password === "")
            setErr("Username hoặc password không được rỗng!");
        else if (user.password !== user.confirmPassword)
            setErr("Mật khẩu không khớp!")
        else {
            process()
        }
    }
    
    const avatar = useRef()

    return (
        <>
            <h1 className="text-center">ĐĂNG KÝ NGƯỜI DÙNG HỆ THỐNG</h1>
            {err?<div className="alert alert-danger">{err}</div>:""}

            <Form onSubmit={register}>
                <InputItem label="Tên" value={user.firstName} controlId="firstName" type="text"
                            setValue={(e) => setUser({...user, "firstName": e.target.value})} />

                <InputItem label="Họ và chữ lót" value={user.lastName} controlId="lastName" type="text"
                            setValue={(e) => setUser({...user, "lastName": e.target.value})} />

                <InputItem label="Email" type="email" value={user.email} controlId="em"
                            setValue={e => setUser({...user, "email": e.target.value})} />

                <InputItem label="Tên đăng nhập" value={user.username} controlId="username" type="text"
                            setValue={(e) => setUser({...user, "username": e.target.value})} />

                <InputItem label="Mật khẩu" value={user.password} controlId="password" type="password"
                            setValue={(e) => setUser({...user, "password": e.target.value})} />

                <InputItem label="Xác nhận mật khẩu" value={user.confirmPassword} controlId="confirmPassword"
                            setValue={(e) => setUser({...user, "confirmPassword": e.target.value})} />
                
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

// import { useRef, useState } from "react"
// import { Button, Form } from "react-bootstrap"
// import { useNavigate, Link } from "react-router-dom"
// import API, { endpoints } from "../configs/API"
// import InputItem from "../layouts/InputItem"
// // import Loading from "../layouts/Loading"

// const Register = () => {
//     const [user, setUser] = useState({
//         "firstName": "",
//         "lastName": "",
//         "email": "",
//         "username": "",
//         "password": "",
//         "confirmPassword": "",
//         "userrole": "",
//         "cmnd": ""
//     })
//     const avatar = useRef()
//     // const [loading, setLoading] = useState(false)
//     const [err, setErr] = useState()
//     const nav = useNavigate()

//     const register = (evt) => {
//         evt.preventDefault()

//         const process = async () => {
//             try {
//                 let form = new FormData()
//                 form.append("first_name", user.firstName)
//                 form.append("last_name", user.lastName)
//                 form.append("email", user.email)
//                 form.append("username", user.username)
//                 form.append("password", user.password)
//                 form.append("userrole", user.userrole)
//                 form.append("cmnd", user.cmnd)
//                 if (avatar.current.files.length > 0)
//                     form.append("avatar", avatar.current.files[0])
    
//                 let res = await API.post(endpoints['register'], form, {
//                     headers: {
//                         "Content-Type": "multipart/form-data"
//                     }
//                 })
//                 if (res.status === 201)
//                     nav("/login")
//                 else
//                     setErr("Hệ thống bị lỗi! Vui lòng quay lại sau")
//             } catch (ex) {
//                 let e = ''
//                 for (let d of Object.values(ex.response.data))
//                     e += `${d} <br />`
               
//                 setErr(e)
//             } finally {
//                 // setLoading(false)
//             }
            
//         }

//         if (user.username === "" || user.password === "")
//             setErr("Username hoặc password phải nhập!")
//         else if (user.password !== user.confirmPassword)
//             setErr("Mật khẩu KHÔNG khớp!")
//         else {
//             // setLoading(true)
//             process()
//         }
        
//     }

//     return (
//         <>
//             <div class="row justify-content-center">
//                 <div class="col-md-10 col-lg-10 col-xl-9">
//                     <div class="card mt-4">
//                         <div class="card-header text-center p-4 bg-success">
//                             <h4 class="text-white mb-0 mt-0">HỆ THỐNG QUẢN LÝ GIAO HÀNG</h4>
                            
//                         </div>
//                         <div class="card-body">
//                             <div class="text-center"> 
//                                 <h5 >Đăng ký tài khoản mới</h5>
//                             </div>
//                             {err?<div className="alert alert-danger" dangerouslySetInnerHTML={{__html: err}}></div>:""}
//                             <Form onSubmit={register}>
//                                 <InputItem label="Tên người dùng" type="text" value={user.firstName} controlId="fn"
//                                         setValue={e => setUser({...user, "firstName": e.target.value})} />

//                                 <InputItem label="Họ và tên lót" type="text" value={user.lastName} controlId="ln"
//                                         setValue={e => setUser({...user, "lastName": e.target.value})} />

//                                 <InputItem label="Tên đăng nhập" type="text" value={user.username} controlId="un"
//                                         setValue={e => setUser({...user, "username": e.target.value})} />

//                                 <InputItem label="Email" type="email" value={user.email} controlId="em"
//                                         setValue={e => setUser({...user, "email": e.target.value})} />

//                                 <InputItem label="Mật khẩu" type="password" value={user.password}  controlId="pa"
//                                         setValue={e => setUser({...user, "password": e.target.value})} />

//                                 <InputItem label="Xác nhận mật khẩu" type="password" value={user.confirmPassword} controlId="cf"
//                                         setValue={e => setUser({...user, "confirmPassword": e.target.value})} />
                                
//                                 <InputItem label="cmnd" type="text" value={user.cmnd} controlId="cm"
//                                 setValue={e => setUser({...user, "cmnd": e.target.value})} />

//                                 <Form.Label>Bạn đăng ký sử dụng với vai trò gì?</Form.Label>
//                                 <Form.Select style={{width: '100%', height: 'calc(1.5em + .75rem + 2px)', border:'1px solid #ced4da', borderRadius:'0.25rem', marginBottom: '20px'}} aria-label="Default select example" 
//                                 controlId="ro" value={user.userrole}  onChange={e => setUser({...user, "userrole": e.target.value})}>
//                                     <option value ={2}>Người dùng</option>
//                                     <option value ={3}>Shipper</option>
//                                 </Form.Select>
                            
                                
//                                 <InputItem type="file" ref={avatar} label="Ảnh điện diện" />
                            
//                                 <div class="form-group row text-right mt-4 mb-4">
//                                     <div class="col-12">
//                                         <Button variant="success" type="submit">Đăng ký</Button>
//                                     </div>
//                                 </div>
//                                 <div class="form-group row mb-0">
//                                     <div class="col-sm-12 text-center">
//                                         Tôi đã có tài khoản? <Link to="/login" className="nav-link text-danger" > Đăng nhập</Link>
//                                     </div>
//                                 </div>      
//                             </Form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Register