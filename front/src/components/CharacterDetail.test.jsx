import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CharacterDetail } from "./CharacterDetail";

const character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: "Earth (C-137)",
  location: "Citadel of Ricks",
  episodeCount: 51,
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

describe("CharacterDetail", () => {
  it("muestra el nombre del personaje", () => {
    render(<CharacterDetail character={character} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("muestra el estado con color verde para Alive", () => {
    render(<CharacterDetail character={character} />);
    const status = screen.getByText("Alive");
    expect(status).toHaveClass("text-green-400");
  });

  it("muestra todos los campos de detalle", () => {
    render(<CharacterDetail character={character} />);
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
    expect(screen.getByText("51")).toBeInTheDocument();
  });

  it("muestra la imagen del personaje", () => {
    render(<CharacterDetail character={character} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", character.image);
  });
});
