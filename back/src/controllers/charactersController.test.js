import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

import { getCharacters, getCharacterById } from "./charactersController.js";

vi.mock("../services/charactersService.js");
vi.mock("axios");

import {
  findCharacters,
  findCharacterById,
} from "../services/charactersService.js";

function mockRes() {
  const res = {};
  res.json = vi.fn().mockReturnValue(res);
  res.status = vi.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("getCharacters", () => {
  it("responde con el resultado del servicio", async () => {
    const payload = { info: {}, results: [] };
    findCharacters.mockResolvedValue(payload);

    const req = { query: { name: "Rick", page: "2" } };
    const res = mockRes();

    await getCharacters(req, res);

    expect(findCharacters).toHaveBeenCalledWith({ name: "Rick", page: 2 });
    expect(res.json).toHaveBeenCalledWith(payload);
  });

  it("usa page=1 y name='' por defecto", async () => {
    findCharacters.mockResolvedValue({ info: {}, results: [] });

    await getCharacters({ query: {} }, mockRes());

    expect(findCharacters).toHaveBeenCalledWith({ name: "", page: 1 });
  });

  it("responde 500 si el servicio lanza un error", async () => {
    findCharacters.mockRejectedValue(new Error("fail"));

    const res = mockRes();
    await getCharacters({ query: {} }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error al obtener personajes." });
  });
});

describe("getCharacterById", () => {
  it("responde con el personaje encontrado", async () => {
    const character = { id: 1, name: "Rick Sanchez" };
    findCharacterById.mockResolvedValue(character);

    const req = { params: { id: "1" } };
    const res = mockRes();

    await getCharacterById(req, res);

    expect(findCharacterById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(character);
  });

  it("responde 404 si el servicio lanza un AxiosError con status 404", async () => {
    const axiosError = { isAxiosError: true, response: { status: 404 } };
    axios.isAxiosError.mockReturnValue(true);
    findCharacterById.mockRejectedValue(axiosError);

    const req = { params: { id: "999" } };
    const res = mockRes();

    await getCharacterById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Personaje con id 999 no encontrado.",
    });
  });

  it("responde 500 si el servicio lanza un error genérico", async () => {
    axios.isAxiosError.mockReturnValue(false);
    findCharacterById.mockRejectedValue(new Error("fail"));

    const res = mockRes();
    await getCharacterById({ params: { id: "1" } }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error al obtener el personaje." });
  });
});
