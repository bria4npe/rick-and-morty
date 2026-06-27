import { describe, it, expect, vi } from "vitest";
import { validatePage, validateId } from "./validateParams.js";

function mockRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("validatePage", () => {
  it("llama a next() si page no viene", () => {
    const req = { query: {} };
    const res = mockRes();
    const next = vi.fn();

    validatePage(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("llama a next() si page es un número válido", () => {
    const req = { query: { page: "3" } };
    const res = mockRes();
    const next = vi.fn();

    validatePage(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it("responde 400 si page no es número", () => {
    const req = { query: { page: "abc" } };
    const res = mockRes();
    const next = vi.fn();

    validatePage(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("responde 400 si page es 0", () => {
    const req = { query: { page: "0" } };
    const res = mockRes();
    const next = vi.fn();

    validatePage(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("validateId", () => {
  it("llama a next() si id es un número válido", () => {
    const req = { params: { id: "1" } };
    const res = mockRes();
    const next = vi.fn();

    validateId(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it("responde 400 si id no es número", () => {
    const req = { params: { id: "abc" } };
    const res = mockRes();
    const next = vi.fn();

    validateId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("responde 400 si id es 0", () => {
    const req = { params: { id: "0" } };
    const res = mockRes();
    const next = vi.fn();

    validateId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
