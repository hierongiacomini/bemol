import { useState } from "react"
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import Field from "../components/form/Field"

const Signup = () => {

    const [fields, setFields] = useState({})
    const [disableCep, setDisableCep] = useState(false)
    const [disableAddress, setDisableAddress] = useState(true)
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [sending, setSending] = useState(false)

    const handleChange = ({target}) => {

        let value = target.value

        if(target.id === 'nome'){

            value = target.value.substring(0,100)

        }
        else if(target.id === 'cpf'){

            value = value.replace(/[^0-9]/gm, '')
            value = value.substring(0,11)
            value = value.substring(0,3) + 
                    (value.length > 3 ? '.' : '') + value.substring(3,6) + 
                    (value.length > 6 ? '.' : '') + value.substring(6,9) +
                    (value.length > 9 ? '-' : '') + value.substring(9,11)
        }
        else if(target.id === 'telefone'){

            value = value.replace(/[^0-9]/gm, '')
            value = value.substring(0,10)
            value = (value.substring(0,2).length > 1 ? '(' : '') + value.substring(0,2) + 
                    (value.length > 2 ? ') ' : '') + value.substring(2, 6) +
                    (value.length > 6 ? '-' : '') + value.substring(6)

        }
        else if(target.id === 'celular'){

            value = value.replace(/[^0-9]/gm, '')
            value = value.substring(0,11)
            value = (value.substring(0,2).length > 1 ? '(' : '') + value.substring(0,2) + 
                    (value.length > 2 ? ') ' : '') + value.substring(2, 7) +
                    (value.length > 7 ? '-' : '') + value.substring(7)

        }
        else if(target.id === 'email'){

            value = value.replace(/[ ]/gm, '')
            value = value.substring(0,100)

        }
        else if(target.id === 'senha'){

            value = value.substring(0,35)

        }
        else if(target.id === 'repetir_senha'){
            value = value.substring(0,35)
        }
        else if(target.id === 'endereco_cep'){

            value = value.replace(/[^0-9]/gm, '')
            value = value.substring(0,8)

            if(value.length < 8){
                setDisableAddress(true)
                setFields(fields => ({
                    ...fields,
                    endereco_numero: '',
                    endereco_complemento: '',
                    endereco_bairro: '',
                    endereco_logradouro: '',
                    endereco_estado: '',
                    endereco_cidade: ''
                }))
            }
            if(value.length === 8){
                searchCep(value)
            }

            value = value.substring(0,5) + (value.length > 5 ? '-' : '') + value.substring(5)


        }
        else if(target.id === 'endereco_numero'){

            value = value.replace(/[ ]/gm, '')
            value = value.substring(0,20)

        }
        else if(target.id === 'endereco_complemento'){
            value = value.substring(0,200)
        }

        setFields(fields => ({
            ...fields,
            [target.id]: value
        }))
        
    }

    const handleSubmit = async (event) => {

        setSending(true)
        setFieldsErrors({})
        event.preventDefault()
        event.stopPropagation()

        if(fields.senha !== fields.repetir_senha){
            setFieldsErrors(erros => ({
                ...erros,
                repetir_senha: 'As senhas estão diferentes.'
            }))

            setSending(false)

            return
        }

        let response = null
        try {
            response = await fetch((process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/users' : '/api/users'), {
                method: 'POST',
                body: JSON.stringify({
                    ...fields,
                    contato_por_whatsapp: fields.contato_por_whatsapp ? 'Sim' : 'Não',
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }, {
                mode: 'no-cors'
            })

        }
        catch(Error){
            return
        }

        setSending(false)

        const {success, validationErrors, error} = await response.json()

        if(success){
            setShowModal(true)
        }
        else {
            if(validationErrors){

                const errors = {}

                validationErrors.forEach( item => {
                    errors[item.campo] = item.erro
                })

                setFieldsErrors(errors)

            }
        }

    }

    const searchCep = async (cep) => {

        setDisableCep(true)
        let response = null
        try {
            response = await fetch((process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/ceps?cep=' : '/api/ceps?cep=') + cep, {}, {
                method: 'GET',
                mode: 'no-cors'
            })

        }
        catch(Error){
            return
        }

        const {success, data} = await response.json()

        if(success){
            setFields(fields => {

                setDisableCep(false)
                setDisableAddress(false)

                return {
                    ...fields,
                    endereco_bairro: data.bairro,
                    endereco_logradouro: data.logradouro,
                    endereco_estado: data.estado,
                    endereco_cidade: data.cidade
                }
            })
        }

    }

    const firstRow = [
        {
            id: 'nome', 
            label: 'Nome', 
            column: { xl:'6', lg:'6', xs:'12' }
        },
        {
            id: 'cpf', 
            label: 'Cpf', 
            column: { xl:'6', lg:'6', xs:'12' }
        },
        {
            id: 'telefone', 
            label: 'Telefone fixo', 
            column: { xl:'6', lg:'6', xs:'12' }
        },
        {
            id: 'celular', 
            label: 'Telefone celular', 
            column: { xl:'6', lg:'6', xs:'12' }
        },
        {
            id: 'contato_por_whatsapp', 
            label: 'Aceita receber mensagens pelo Whatsapp?', 
            type: 'switch', column: { xl:'12' }
        },
        {
            id: 'email', 
            label: 'E-mail', 
            column: { xl:'12' }
        },
        {
            id: 'senha', 
            label: 'Senha', 
            column: { xl:'6' }
        },
        {
            id: 'repetir_senha', 
            label: 'Repetir a senha', 
            column: { xl:'6' }
        },
    ]

    const secondRow = [
        {
            id: 'endereco_cep', 
            label: 'Cep',
            disabled: disableCep
        },
        {
            id: 'endereco_logradouro', 
            label: 'Logradouro',
            disabled: true
        },
        {
            id: 'endereco_numero', 
            label: 'Número',
            disabled: disableAddress
        },
        {
            id: 'endereco_bairro', 
            label: 'Bairro',
            disabled: true
        },
        {
            id: 'endereco_cidade', 
            label: 'Cidade',
            disabled: true
        },
        {
            id: 'endereco_estado', 
            label: 'Estado',
            disabled: true
        },
        {
            id: 'endereco_complemento', 
            label: 'Complemento',
            disabled: disableAddress,
            column: { xs:'12', lg: '12', xl: '12'}
        },
    ]

    return (
        <>
            <Modal show={showModal} centered={true}>
                <Modal.Header>
                    <Modal.Title>Usuário cadastrado com sucesso.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={() => {
                        window.navigation.reload()
                    }}>Fechar</Button>
                </Modal.Body>
            </Modal>
            <Container className="d-flex flex-column align-items-center mt-5 mb-5">
                <div className="fw-bold fs-5">Cadastro</div>
                <Card style={{ width: 'min(700px, 100%)' }}>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <div className="fw-semibold fs-6 mb-2">Dados</div>
                            <Row>
                                { firstRow.map(component => (
                                    <Col {...component.column } key={component.id}>
                                        <Field {...component} value={fields[component.id]} onChange={handleChange} validation={fieldsErrors[component.id]}/>
                                    </Col>
                                ))}
                            </Row>
                            <hr/>
                            <div className="fw-semibold fs-6 mb-2">Endereço</div>
                            <Row>
                                { secondRow.map(component => (
                                    <Col xl= '4' lg='6' xs='12' {...component.column} key={component.id}>
                                        <Field {...component} value={fields[component.id]} onChange={handleChange} validation={fieldsErrors[component.id]}/>
                                    </Col>
                                ))}
                            </Row>
                            <Row className="justify-content-center">
                                <Button type="submit" style={{width: '250px'}} disabled={sending}>Cadastrar</Button>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )

}

export default Signup