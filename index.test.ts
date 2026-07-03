import {describe, expect, it} from 'vitest'
import {sum} from './index.ts'

// decribe -> organiza los test por grupos
describe("sum funcion", () => {
    // it -> es un caso de prueba, puede ser positivo o negativo
    it("deberia retornar 3",() => {
        // expect -> dice que esperamos como resultado
        expect(sum(1,2)).toBe(3)
    })
})