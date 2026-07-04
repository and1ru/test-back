import { describe, it, vi, expect } from "vitest";
import { AuthController, AuthService } from ".";
import type { Request, Response } from "express";

describe("login", () => {

  it("deberia devolver 200 y el token", async () => {

    const authService = {
      login: vi.fn()
    }

    authService.login.mockResolvedValue("TOKEN")

    // se debe mockear el req con los datos que vienen en el body
    const req:Pick<Request, "body"> = {
      body: {
        email: "andres@gmail.com",
        password: "123456789",
      },
    };

    // se debe mockear el res con los datos que restornara
    const res:Pick<Response, "status" | "json"> = {
      // mockReturnThis() -> hace que la función devuelva el objeto al que pertenece en este caso el res
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const controller = new AuthController(authService as any)


    await controller.login(req as Request, res as Response)

    expect(authService.login).toHaveBeenCalledWith("andres@gmail.com", "123456789")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message: "se inicio sesion",result: "TOKEN"})
  });

});
