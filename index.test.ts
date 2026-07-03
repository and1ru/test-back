import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'vitest'

describe("auth", () => {
    // pueden haber describers anidados
    describe("login",() => {
        beforeAll(() => {
            console.log("se ejecuta antes del test, solo una vez")
        })

        beforeEach(() => {
            console.log("se ejecuta antes de cada test")
        })

        afterEach(() => {
            console.log("se ejecuta despues de cada test")
        })

        afterAll(() => {
            console.log("se ejecuta despues del test, solo una vez")
        })

        it("test 1", () => {
            console.log("test 1")
        })

        it("test 2", () => {
            console.log("test 2")
        })
    })

    describe("register",() => {
        expect(1+1).toBe(2)

        // usar toEqual en vez de toBe porque toBe compara la referencias y en objetos nunca seran iguales en cambio toEqual compara solo el valor
        expect({nombre:"andres"}).toEqual({nombre:"andres"})

        // toBeTruthy -> valida que el valor sea truthy
        expect(true).toBeTruthy()

        // toBeFalsy -> valida que el valor sea falsy
        expect(false).toBeFalsy()

        // toThrow -> valida que una funcion lance un error
        expect(() => {
            throw new Error("error")
        }).toThrow()
    })
})