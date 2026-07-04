import bcrypt from 'bcrypt'
import { usuarios } from './users'
import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'

export class AuthRepository {
    async findUserByEmail(email: string) {
        return usuarios.find((user) => user.email === email)
    }
}

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async login(email: string, password:string) {
        const user = await this.authRepository.findUserByEmail(email)

        if (!user) {
            throw new Error("usuario no encontrado")
        }

        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid){
            throw new Error("la contraseña es incorrecta")
        }

        const token = jwt.sign({
            id: user.id
        }, "hola")

        return token
    }

}

export class AuthController {
    constructor(private authService:AuthService){}

    async login (req:Request, res:Response){
        const {email, password} = req.body

        const result = await this.authService.login(email, password)

        return res.status(200).json({message:"se inicio sesion", result})
    }
}

interface PayloadJWT {
    id:number
}

export function AuthToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "token requerido" });
  }

  try {
    const verifyToken = jwt.verify(token, "hola") as PayloadJWT;

    req.user = verifyToken;

    next();
  } catch {
    return res.status(401).json({ message: "token no valido" });
  }
}