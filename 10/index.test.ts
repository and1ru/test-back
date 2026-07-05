import request from 'supertest'
import app from '.'
import { describe, it, expect } from 'vitest'

// a diferencia de un test unitario donde no se usa la base de datos real
// en un test de integracion si usa la base de datos real

// en un test de integracion verificas el resultado
describe("POST / login", () => {
  it("deberia de iniciar sesion correctamente", async () => {
    // no se llama al controller 
    // se hace una peticion real a la ruta donde esta el controller
    // se le pasan los datos que necesita para que trabaje correctamente
    const response = await request(app).post("/auth/login").send({email:"andres@gmail.com", password: "hash"})

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("se obtuvo el usuario")
    // no incluye el id porque puede cambiar
    expect(response.body.result).toMatchObject({email:"andres@gmail.com", password:"hash"})
  })

  it("deberia de retornar un status 400 y un mensaje de error diciendo 'los campos son requeridos'", async () => {
    const response = await request(app).post("/auth/login").send({email:"", password: ""})

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("los campos son requeridos")

  }) 

  it("deberia de retornar un status 500 y un mensaje de error diciendo 'error interno del servidor'", async () => {
    // aqui lanzara el error ya sea porque la contraseña no coincide o porque no encuentra a un usuario con el email
    const response = await request(app).post("/auth/login").send({email:"usuario@gmail.com", password: ""})

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("los campos son requeridos")
  })

})