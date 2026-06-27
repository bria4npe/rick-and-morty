import axios from "axios";

import {
  findCharacters,
  findCharacterById,
} from "../services/charactersService.js";

export async function getCharacters(req, res) {
  const { name = "", page = 1 } = req.query;

  try {
    const result = await findCharacters({ name, page: parseInt(page, 10) });
    res.json(result);
  } catch (err) {
    console.error("[GET /characters]", err);
    res.status(500).json({ error: "Error al obtener personajes." });
  }
}

export async function getCharacterById(req, res) {
  const { id } = req.params;

  try {
    const character = await findCharacterById(parseInt(id, 10));
    res.json(character);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      res.status(404).json({ error: `Personaje con id ${id} no encontrado.` });
      return;
    }
    console.error("[GET /characters/:id]", err);
    res.status(500).json({ error: "Error al obtener el personaje." });
  }
}
