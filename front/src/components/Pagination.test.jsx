import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

const info = { pages: 5, next: true, prev: true };

describe("Pagination", () => {
  it("no renderiza nada si hay solo una página", () => {
    const { container } = render(
      <Pagination page={1} info={{ pages: 1, next: null, prev: null }} onPage={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("muestra la página actual y el total", () => {
    render(<Pagination page={3} info={info} onPage={() => {}} />);
    expect(screen.getByText("3 / 5")).toBeInTheDocument();
  });

  it("deshabilita Anterior en la primera página", () => {
    render(
      <Pagination page={1} info={{ ...info, prev: null }} onPage={() => {}} />
    );
    expect(screen.getByText(/Anterior/)).toBeDisabled();
  });

  it("deshabilita Siguiente en la última página", () => {
    render(
      <Pagination page={5} info={{ ...info, next: null }} onPage={() => {}} />
    );
    expect(screen.getByText(/Siguiente/)).toBeDisabled();
  });

  it("llama onPage con page-1 al hacer click en Anterior", async () => {
    const onPage = vi.fn();
    render(<Pagination page={3} info={info} onPage={onPage} />);
    await userEvent.click(screen.getByText(/Anterior/));
    expect(onPage).toHaveBeenCalledWith(2);
  });

  it("llama onPage con page+1 al hacer click en Siguiente", async () => {
    const onPage = vi.fn();
    render(<Pagination page={3} info={info} onPage={onPage} />);
    await userEvent.click(screen.getByText(/Siguiente/));
    expect(onPage).toHaveBeenCalledWith(4);
  });
});
