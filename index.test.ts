import { describe, it, vi, expect, beforeEach } from "vitest";
import { AuthRepository, AuthService } from "./index.ts";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import type { Mock } from "vitest";

vi.mock("bcrypt", () => ({
  default: {
    compare: vi.fn(),
  },
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn()
  }
}))

describe("login", () => {

  it("deberia retornar un error de usuario no encontrado", async () => {
    const repository = {
      findUserByEmail: vi.fn()
    }

    repository.findUserByEmail.mockResolvedValue(undefined)

    const service = new AuthService(repository)

    const result = service.login("andres@gmail.com", "123456789")

    await expect(result).rejects.toThrow("usuario no encontrado")

  })

  it("deberia retornar un error de contraseña no valida", async () => {

    (bcrypt.compare as Mock).mockResolvedValue(false);

    const repository = {
      findUserByEmail: vi.fn()
    }

    repository.findUserByEmail.mockResolvedValue({
      email: "andres@gmail.com",
      id: 1,
      password: "123456789"
    })

    const service = new AuthService(repository)

    const result = service.login("andres@gmail.com", "123456789")

    // toHaveBeenCalledWith() -> verifica que a una funcion se le pasaron los datos correctamente
    // Ejemplo:
    // repository.findUserByEmail(123456789) ❌
    // expect(repository.findUserByEmail).toHaveBeenCalledWith("andres@gmail.com")
    // El test fallará porque se llamó con 123456789 y no con "andres@gmail.com".
    //
    // repository.findUserByEmail("andres@gmail.com") ✅
    // expect(repository.findUserByEmail).toHaveBeenCalledWith("andres@gmail.com")
    // El test pasará porque los argumentos coinciden.
    expect(repository.findUserByEmail).toHaveBeenCalledWith("andres@gmail.com")
    await expect(result).rejects.toThrow("la contraseña es incorrecta")
  })

  it("deberia retornar un token y el usuario", async () => {

    (bcrypt.compare as Mock).mockResolvedValue(true);
    (jwt.sign as Mock).mockResolvedValue("FAKE_TOKEN");

    const repository = {
      findUserByEmail: vi.fn()
    }

    repository.findUserByEmail.mockResolvedValue({
      email: "andres@gmail.com",
      id: 1,
      password: "123456789"
    })

    const service = new AuthService(repository)

    const result = await service.login("andres@gmail.com", "123456789")

    expect(result).toBe("FAKE_TOKEN")
  })

});
