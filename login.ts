import { Router, type Request, type Response } from "express";
import { pool } from "./myDb.ts";

export class AuthRepository {
    async findUserByEmail(email: string) {
        const [rows] = await pool.query("SELECT * FROM  usuarios WHERE email = ?",[email])

        return rows[0] ?? null
    }
}

export class AuthService {
    constructor(private repository:AuthRepository){}
    login = async (email:string, password:string) => {

        const result = await this.repository.findUserByEmail(email)

        if(!result){
            throw new Error("no hay un usuario con ese email")
        }

        if(result.password !== password){
            throw new Error("las contraseñas no coinciden")
        }

        return result
    }
}

export class AuthController {
    constructor(private service:AuthService){}

    login = async (req:Request, res:Response) => {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message:"los campos son requeridos"})
        }

        try {
            const result = await this.service.login(email, password)

            return res.status(200).json({message:"se obtuvo el usuario", result})

        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"error interno del servidor"})
        }
    }
}

const repository = new AuthRepository()
const service = new AuthService(repository)
const controller = new AuthController(service)

const routes = Router()

routes.post("/login", controller.login )

export default routes