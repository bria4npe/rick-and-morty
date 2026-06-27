import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

vi.mock("axios");

import { findCharacters, findCharacterById } from "./charactersService.js";

const rawCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  origin: { name: "Earth (C-137)" },
  location: { name: "Citadel of Ricks" },
  episode: ["ep1", "ep2"],
};

beforeEach(() => vi.clearAllMocks());

describe("findCharacters", () => {
  it("devuelve lista paginada con campos resumidos", async () => {
    axios.get.mockResolvedValue({
      data: {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [rawCharacter],
      },
    });

    const result = await findCharacters({ name: "rick", page: 1 });

    expect(result.info.count).toBe(1);
    expect(result.results[0]).toEqual({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      image: rawCharacter.image,
    });
  });

  it("devuelve lista vacía si la API responde 404", async () => {
    const error = new Error("Not Found");
    error.response = { status: 404 };
    axios.isAxiosError = vi.fn().mockReturnValue(true);
    axios.get.mockRejectedValue(error);

    const result = await findCharacters({ name: "xyzabc" });

    expect(result.results).toEqual([]);
    expect(result.info.count).toBe(0);
  });

  it("propaga errores que no son 404", async () => {
    const error = new Error("Server Error");
    error.response = { status: 500 };
    axios.isAxiosError = vi.fn().mockReturnValue(true);
    axios.get.mockRejectedValue(error);

    await expect(findCharacters()).rejects.toThrow("Server Error");
  });
});

describe("findCharacterById", () => {
  it("devuelve el detalle del personaje", async () => {
    axios.get.mockResolvedValue({ data: rawCharacter });

    const result = await findCharacterById(1);

    expect(result).toEqual({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      gender: "Male",
      image: rawCharacter.image,
      origin: "Earth (C-137)",
      location: "Citadel of Ricks",
      episodeCount: 2,
    });
  });

  it("propaga el error si la API falla", async () => {
    axios.get.mockRejectedValue(new Error("Not Found"));

    await expect(findCharacterById(99999)).rejects.toThrow("Not Found");
  });
});
