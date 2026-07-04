import { describe, it, vi, expect, beforeEach } from "vitest";
import { AuthService } from "./index.ts";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import type { Mock } from "vitest";

// vi.mcok() -> mockea una libreria
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
  let service: AuthService

  beforeEach(() => {
    service = new AuthService()
    // limpia las veces que se haya llamado un mock
    // por ejemplo: si en el primer caso donde todo salio bien se llama el mock de jwt pero en el segundo no se llamo igualmente toma como que se llamo
    // pero si se limpia los mocks tomara que no se ha llamado
    vi.clearAllMocks()
  })

  it("deberia devolver un token", async () => {

    // siempre tiene que it al inicio
    // poner siempre un ";" al final 
    (bcrypt.compare as Mock).mockResolvedValue(true);
    (jwt.sign as Mock).mockReturnValue("TOKEN_FAKE");

    const token = await service.login("123456789", "hash")

    expect(token).toBe("TOKEN_FAKE")
  })

  it("deberia lanzar un error", async () => {
    (bcrypt.compare as Mock).mockResolvedValue(false);
    await expect((service.login("123456789", "hash"))).rejects.toThrow("la contraseña es incorrecta")
    // .not.toHaveBeenCalled() -> dice que espera que no se haya llamado/utilizado una funcion
    expect(jwt.sign).not.toHaveBeenCalled()
  })

});
