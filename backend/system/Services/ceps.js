import fetch from "node-fetch"

async function searchCep(cep){

    const resposta = await fetch('https://viacep.com.br/ws/'+ cep +'/json/')
    const data = await resposta.json()

    return data

}

export {
    searchCep
}