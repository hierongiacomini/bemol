import Sequelize from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

class Database {

    static singleton = true
    static instantiated = false
    static instance = null
    static defaultDialect = 'mysql'
    static defaultHost = process.env.host
    static defaultPort = process.env.port
    static connected = false

    constructor(){

        if(Database.singleton){
            
            if(Database.instantiated){
                return Database.instance
            }
    
            Database.instantiated = true
            Database.instance = this

        }

        this.dialect = Database.defaultDialect
        this.host = Database.defaultHost
        this.port = Database.defaultPort

    }

    connect(){

        if(Database.connected){
            return
        }

        this.connection = new Sequelize(process.env.database, process.env.user, process.env.password, {
            dialect: this.dialect,
            host: this.host,
            port: this.port,
            logging: false,
            define: {
                freezeTableName: true
            }
        })

        Database.connection = this.connection
        Database.connected = true

    }

    async initialize(){
        await this.connection.sync({ alter: true })
    }

}

const database = new Database()
database.connect()
database.initialize()


export default database