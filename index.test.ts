import {describe, expect, it} from 'vitest'
import {sum} from './index.ts'

describe("sum funcion", () => {
    it("deberia retornar 3",() => {
        expect(sum(1,2)).toBe(3)
    })
})