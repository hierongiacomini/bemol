import { searchCep } from "../system/Services/ceps.js"

class Ceps {

    async get(request, response){

        const params = request.query

        if(!params.hasOwnProperty('cep')){
            response.json({
                success: false,
                error: 'Cep é obrigatório'
            })
            return
        }
        else if(!/[0-9]{8}/.test(params.cep)){
            response.json({
                success: false,
                error: 'Cep deve possuir 8 dígitos sem traço.'
            })
            return
        }

        try {

            const data = await searchCep(params.cep)

            response.json({
                success: true,
                data: {
                    cep: data.cep,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf
                }
            })

        }
        catch(Error){
            response.json({
                success: false,
                error: 'Falha na consulta do cep.'
            })
            return
        }

    }

}

export default Ceps