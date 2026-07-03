import {describe, it, vi, expect} from 'vitest'
import { AuthService } from './index.ts'

describe("auth", () => {
    it("deberia retornar el usuario si existe", async () => {

        const repository = {
            // el nombre de la funcion debe ser igual al de la clase AuthRepository
            findUserByEmail: vi.fn()
        }

        repository.findUserByEmail.mockResolvedValue({
            id: 1,
            email: "andres@gmail.com"
        })

        const service = new AuthService(repository as any)

        const result = await service.login("andres@gmail.com")

        expect(result.email).toBe("andres@gmail.com")
    })

    it("deberia lanzar un error si el usuario no existe", async () => {

        const repository = {
            // el nombre de la funcion debe ser igual al de la clase AuthRepository
            findUserByEmail: vi.fn()
        }

        repository.findUserByEmail.mockResolvedValue(null)

        const service = new AuthService(repository as any)

        // .rejects.toThrow -> valida que una promesa lance un error
        await expect(service.login("andres@gmail.com")).rejects.toThrow("usuario no encontrado")
    })
})