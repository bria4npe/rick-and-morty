import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "./useDebounce";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useDebounce", () => {
  it("retorna el valor inicial inmediatamente", () => {
    const { result } = renderHook(() => useDebounce("rick", 300));
    expect(result.current).toBe("rick");
  });

  it("no actualiza el valor antes de que pase el delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "rick" },
    });

    rerender({ value: "morty" });
    act(() => vi.advanceTimersByTime(200));

    expect(result.current).toBe("rick");
  });

  it("actualiza el valor después del delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "rick" },
    });

    rerender({ value: "morty" });
    act(() => vi.advanceTimersByTime(300));

    expect(result.current).toBe("morty");
  });

  it("cancela el timer anterior si el valor cambia antes del delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "rick" },
    });

    rerender({ value: "r" });
    act(() => vi.advanceTimersByTime(100));
    rerender({ value: "ri" });
    act(() => vi.advanceTimersByTime(100));
    rerender({ value: "ric" });
    act(() => vi.advanceTimersByTime(300));

    expect(result.current).toBe("ric");
  });
});
