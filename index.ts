const usuarios = [
  { "id": 1, "email": "alejandro.gomez@example.com" },
  { "id": 2, "email": "sofia.rodriguez@example.com" },
  { "id": 3, "email": "mateo.fernandez@example.com" },
  { "id": 4, "email": "valeria.lopez@example.com" },
  { "id": 5, "email": "lucas.martinez@example.com" },
  { "id": 6, "email": "camila.perez@example.com" },
  { "id": 7, "email": "diego.sanchez@example.com" },
  { "id": 8, "email": "valentina.gomez@example.com" },
  { "id": 9, "email": "nicolas.diaz@example.com" },
  { "id": 10, "email": "isabella.torres@example.com" }
]

export class AuthRepository {
    async findUserByEmail(email: string) {
        return usuarios.find((user) => user.email === email)
    }
}

export class AuthService {
    constructor(private authRepository: AuthRepository) {

    }

    async login(email: string) {
        const user = await this.authRepository.findUserByEmail(email)

        if (!user) {
            throw new Error("usuario no encontrado")
        }

        return user
    }

}