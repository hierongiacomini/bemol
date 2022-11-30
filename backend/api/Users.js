
import Sequelize from 'sequelize'
import Models from './../system/Models/index.js'
import crypto from 'crypto-js'

class Users {

    async post(request, response){

        const data = request.body

        try {

            const user = new Models.Users()
            const userAddress = new Models.UsersAddress()
    
            user.set({
                nome: data.nome,
                senha: data.senha ? crypto.MD5(data.senha).toString() : null,
                email: data.email,
                cpf: data.cpf,
                telefone: data.telefone,
                celular: data.celular,
                contato_por_whatsapp: data.contato_por_whatsapp,
            })

            userAddress.set({
                cep: data.endereco_cep,
                logradouro: data.endereco_logradouro,
                bairro: data.endereco_bairro,
                cidade: data.endereco_cidade,
                estado: data.endereco_estado,
                numero: data.endereco_numero
            })

            let errors = []

            try {
                await user.validate()
            }
            catch(Error){
    
                if(Error instanceof Sequelize.ValidationError){
        
                    errors = [...Error.errors].map(error => {
                        return {
                            campo: error.path,
                            erro: error.message
                        }
                    })
        
                }
                else {
                    throw Error    
                }
            }

            try {
                await userAddress.validate() 
            }
            catch(Error){
    
                if(Error instanceof Sequelize.ValidationError){
        
                    errors = [...errors, ...[...Error.errors].map(error => {
                        return {
                            campo: 'endereco_' + error.path,
                            erro: error.message
                        }
                    })]
        
                }
                else {
                    throw Error    
                }
            }

            if(errors.length){

                response.json({
                    success: false,
                    validationErrors: errors
                })

                return
            }

            await user.save()

            userAddress.set({
                usuario: user.id
            })

            await userAddress.save()

            response.json({
                success: true,
                data: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    cpf: user.cpf,
                    telefone: user.telefone,
                    celular: user.celular,
                    contato_por_whatsapp: user.contato_por_whatsapp,
                    endereco: {
                        cep: userAddress.cep,
                        numero: userAddress.numero,
                        logradouro: userAddress.logradouro,
                        bairro: userAddress.bairro,
                        cidade: userAddress.cidade,
                        estado: userAddress.estado
                    }
                }
            })
    
        }
        catch(Error){

            if(Error instanceof Sequelize.ValidationError){
        
                const errors = [...Error.errors].map(error => {
                    return {
                        campo: error.path,
                        erro: error.message
                    }
                })

                response.json({
                    success: false,
                    validationErrors: errors
                })
    
            }
            else {

                response.json({
                    success: false,
                    error: 'Falha na adição de usuário.'
                })
            }
    

        }

    }

}

export default Users