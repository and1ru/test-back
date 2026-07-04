import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
    async login(password:string, hash:string) {
        const isValid = await bcrypt.compare(password, hash)

        if(!isValid){
            throw new Error("la contraseña es incorrecta")
        }

        const token = jwt.sign({
            userId: 1
        }, "hola")

        return token
    }

}