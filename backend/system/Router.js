import express from 'express'
import path from 'path'
import cors from 'cors'
import * as Apis from '../api/index.js'
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

class Router {

    static viewFolder = path.join('frontend','static')
    static apiPrefix = '/api'
    static methods = ['get', 'post', 'put', 'patch', 'delete']

    constructor(app){

        this.app = app

        app.use(cors())

        Object.keys(Apis).forEach(Api => {
           
            const api = new Apis[Api]()
            const path = Router.apiPrefix + '/' + Api.replaceAll('_', '/').toLocaleLowerCase()
            const prototype = api.constructor.prototype

            Router.methods.forEach(method => {

                if(prototype.hasOwnProperty(method)){
                    this.app[method](path, express.json(), api[method])
                }
                
            })

        })

        this.app.all(Router.apiPrefix + '/*', (request, response) => {
            response.json({
                success: false,
                error: 'Api não encontrada.'
            })
        })

        this.app.use(express.static(Router.viewFolder))

        this.app.get('*', (request, response) => {
            response.sendFile(path.join(__dirname, '/../../frontend/static/index.html'))
        })

    }

}

export default Router