import {describe, it, vi, expect} from 'vitest'

describe("auth", () => {
    it("test 1", () => {
        // vi.fn() -> crea un mock de una funcion, es decir una funcion que no hace nada pero podemos espiar si fue llamada o no
        const myFunction = vi.fn()

        // mockReturnValue -> simula el valor de retorno de una funcion mockeada
        myFunction.mockReturnValue("andres")

        // llamar a la funcion mockeada
        myFunction()

        // toHaveBeenCalled -> valida que una funcion haya sido llamada
        expect(myFunction).toHaveBeenCalled()

        // toHaveBeenCalledTimes -> valida que una funcion haya sido llamada un numero de veces
        expect(myFunction).toHaveBeenCalledTimes(1)
    })

    // necesita que la funcion sea async porque se trabajara con promesas
    it("test 2", async () => {
        const buscarUsuario = vi.fn()

        // mockResolvedValue -> simula el valor de retorno de una funcion mockeada que retorna una promesa
        buscarUsuario.mockResolvedValue({
            nombre: "andres",
            id: 1
        })

        const resultado = await buscarUsuario()
        expect(resultado).toEqual({ nombre: "andres", id: 1 })
    })

    it("test 3", async () => {
        const buscarUsuario = vi.fn()

        // mockRejectedValue -> simula el valor de retorno de una funcion mockeada que retorna una promesa rechazada
        buscarUsuario.mockRejectedValue(new Error("usuario no encontrado"))
    })
})