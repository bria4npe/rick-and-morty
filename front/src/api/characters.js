const BASE_URL = import.meta.env.VITE_BFF_URL ?? "";

export async function getCharacters({ name = "", page = 1 } = {}) {
  const params = new URLSearchParams({ page });
  if (name) params.set("name", name);

  const res = await fetch(`${BASE_URL}/characters?${params}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function getCharacterById(id) {
  const res = await fetch(`${BASE_URL}/characters/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
