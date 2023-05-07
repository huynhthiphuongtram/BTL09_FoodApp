import { Form } from "react-bootstrap"

const InputItem = ({label, value, setValue, controlId, type}) => {
    return (
        <>
            <Form.Group className="mb-3" controlId="controlId">
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} value={value}
                        onChange={setValue} 
                        placeholder={label} />
            </Form.Group>
        </>
    )
}

export default InputItem