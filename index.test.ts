import { describe, it, vi, expect, type Mock } from "vitest";
import type { Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import { AuthToken } from ".";

vi.mock("jsonwebtoken", () => ({
  default:{
    verify: vi.fn()
  }
}))

describe("login", () => {
  it("deberia retornar un 401 y decir que el token es requerido", () => {

    const req:Pick<Request, "headers"> = {
      headers:{}
    }

    const res:Pick<Response, "status" | "json"> = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const next = vi.fn()

    AuthToken(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({message:"token requerido"})
    expect(next).not.toHaveBeenCalled();

  })

  it("deberia retornar un 401 y decir que el token no es valido", () => {

    // mockImplementation -> dice: "Cuando alguien llame esta función, ejecuta este código."
    (jwt.verify as Mock).mockImplementation(() => {
      throw new Error("token no valido")
    });

    const req:Pick<Request, "headers"> = {
      headers:{
        authorization: "TOKEN"
      }
    }

    const res:Pick<Response, "status" | "json"> = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const next = vi.fn()

    AuthToken(req as Request, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({message:"token no valido"})
    expect(next).not.toHaveBeenCalled();

  })

  it("deberia llegar a la funcion next y que todo salga bien", () => {
    (jwt.verify as Mock).mockReturnValue({id:1});

    const req = {
      headers:{
        authorization: "TOKEN"
      }
    } as Request

    const res:Pick<Response, "status" | "json"> = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    const next = vi.fn()

    AuthToken(req as Request, res as Response, next)

    expect(next).toHaveBeenCalled()
    // verifica que si se haya guardado en la req
    expect(req.user).toEqual({id:1})
  })

});
