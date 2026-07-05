import { describe, it, vi, expect, type Mock, beforeEach } from "vitest";
import { pool } from "./myDb";
import { AuthRepository } from ".";

describe("login", () => {
  // cuando se trabaja con base de datos reales siempre se debe eliminar todos los datos de la tabla en la que se va a trabajar
  beforeEach(async () => {
    await pool.query("DELETE FROM usuarios")
  })

  it("deberia mostrar un array basio porque no existe un usuario con el email", async () => {

    // insertarmos un nuevo usuario
    await pool.query("INSERT INTO usuarios(email,password) VALUES (?,?)", ["andres@gmail.com", "hash"])

    const repository = new AuthRepository()

    const user = await repository.findUserByEmail("andres@gmail.com")

    expect(user.email).toBe("andres@gmail.com")

  })

  it("deberia mostrar todos los datos del usuario con el email", async () => {
    // insertarmos un nuevo usuario
    await pool.query("INSERT INTO usuarios(email,password) VALUES (?,?)", ["andres@gmail.com", "hash"])

    const repository = new AuthRepository()

    const user = await repository.findUserByEmail("usuario@gmail.com")

    // toBeNull -> dice que espera que el resultado sea un null
    expect(user).toBeNull()
  })
});
