import { describe, it, expect } from "vitest";
import { toSummary, toDetail } from "./characterMapper.js";

const rawCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  origin: { name: "Earth (C-137)" },
  location: { name: "Citadel of Ricks" },
  episode: ["ep1", "ep2", "ep3"],
};

describe("toSummary", () => {
  it("devuelve solo los campos del listado", () => {
    const result = toSummary(rawCharacter);
    expect(result).toEqual({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    });
  });

  it("no incluye campos extras", () => {
    const result = toSummary(rawCharacter);
    expect(result).not.toHaveProperty("species");
    expect(result).not.toHaveProperty("episode");
  });
});

describe("toDetail", () => {
  it("devuelve todos los campos del detalle", () => {
    const result = toDetail(rawCharacter);
    expect(result).toEqual({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      gender: "Male",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      origin: "Earth (C-137)",
      location: "Citadel of Ricks",
      episodeCount: 3,
    });
  });

  it('usa "Unknown" si origin es null', () => {
    const result = toDetail({ ...rawCharacter, origin: null });
    expect(result.origin).toBe("Unknown");
  });

  it('usa "Unknown" si location es null', () => {
    const result = toDetail({ ...rawCharacter, location: null });
    expect(result.location).toBe("Unknown");
  });

  it("cuenta correctamente los episodios", () => {
    const result = toDetail({ ...rawCharacter, episode: ["ep1"] });
    expect(result.episodeCount).toBe(1);
  });
});
