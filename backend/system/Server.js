import express from 'express'
import Router from './Router.js'
import database from './Database.js'

class Server {

    static singleton = true
    static instantiated = false
    static instance = null
    static defaultPort = 80

    initialized = false

    constructor(config = {}){

        if(Server.singleton){
            
            if(Server.instantiated){
                return Server.instance
            }
    
            Server.instantiated = true
            Server.instance = this

        }

        this.port = (config && config.port) ? config.port : Server.defaultPort

    }

    init(){

        if(this.initialized){
            return false
        }

        this.app = express()
        this.setup()
        this.listen()

        this.initialized = true

    }

    setup(){

        this.database = database
        this.router = new Router(this.app)

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log(`Listening server on port ${this.port}`)
        })

    }

}

export default Server