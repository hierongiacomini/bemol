import Server from "./backend/system/Server.js"

const server = new Server({
    port: 5000
})
server.init()
