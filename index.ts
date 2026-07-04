import { pool } from "./myDb.ts";

export class AuthRepository {
    async findUserByEmail(email: string) {
        // esta consulta retorna un array
        // si no encuentra el usuario retorna un undefined por defecto
        const [rows] = await pool.query("SELECT * FROM  usuarios WHERE email = ?",[email])
        // obtiene el primer objeto del array
        // si no encuentra nada dice que retorne un null
        return rows[0] ?? null
    }
}

const repository = new AuthRepository()

const result = await repository.findUserByEmail("pedritomelo@gmail.com")

console.log(result)