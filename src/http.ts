import express from "express"
import {createServer} from "http"
import {Server, Socket} from "socket.io"
import path from "path"/*O path módulo fornece utilitários para 
                        trabalhar com caminhos de arquivo e diretório*/

import "./database"//importando arquivo index.ts
import {routes} from "./routes"

const app = express()

//Criando e configurando caminho da pasta public
app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

//Rota para renderizar a página html
app.get("/pages/client", (request, response) =>{
    return response.render("html/client.html")
})

const http = createServer(app)//Criando protocolo http
const io = new Server(http) //Criando protocolo websocket(ws)

io.on("connection", (socket: Socket) => {
    //console.log("Se conectou", socket.id)
})

app.use(express.json())
app.use(routes)

export{http, io}