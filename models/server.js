import express from 'express'
import 'dotenv/config'
import dbConection from '../dataBase/configuracion.js'
import { getEmpleado, postEmpleado, putEmpleado, deleteEmpleado } from '../controllers/EmpleadoController.js'

export default class Server{
    constructor(){
        this.app = express()
        this.listen()
        this.dbConnect()
        this.pathEmpleado = '/api/empleado' //link publico de la api
        this.route()
    }

    //escuchar el servidor y especificar el puerto
    listen(){ 
        this.app.listen(process.env.PORT, ()=> {
            console.log(`Server is running in PORT ${process.env.PORT}`)
        })
    }

    async dbConnect(){
        await dbConection()
    }

    route(){
        this.app.use(express.json()) //convertir data a json
        this.app.get(this.pathEmpleado, getEmpleado)
        this.app.post(this.pathEmpleado, postEmpleado)
        this.app.put(this.pathEmpleado, putEmpleado)
        this.app.delete(this.pathEmpleado+'/:id', deleteEmpleado)
    }
}
