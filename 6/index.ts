import bcrypt from 'bcrypt'
import { usuarios } from './users'
import jwt from 'jsonwebtoken'

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