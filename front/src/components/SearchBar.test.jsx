import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("muestra el valor recibido por prop", () => {
    render(<SearchBar value="rick" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("rick");
  });

  it("llama onChange al escribir", async () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "m");
    expect(onChange).toHaveBeenCalledWith("m");
  });

  it("muestra el placeholder", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Buscar personaje...")).toBeInTheDocument();
  });
});
