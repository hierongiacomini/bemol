
import { Form } from 'react-bootstrap'

const Field = ({type='text', id, label, value, disabled = false, onChange, validation}) => {

    if(type === 'text'){

        return (
            <Form.Group className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Form.Control disabled={disabled} type="text" id={id} value={value ?? ''} onChange={onChange}/>
                <Form.Text id="passwordHelpBlock" className="text-danger">{validation ?? ''}</Form.Text>
            </Form.Group>
        )

    }
    else if(type === 'switch'){
        return (
            <Form.Check className="mb-4" style={{lineHeight: '1.7'}} type="switch" id={id} label={label} value={value} onChange={onChange}/>
        )
    }
    

}

export default Field