import axios from "axios";
import { toSummary, toDetail } from "../mappers/characterMapper.js";

const DEFAULT_API_URL = "https://rickandmortyapi.com/api";
const BASE_URL = process.env.RICKMORTY_API_URL ?? DEFAULT_API_URL;

export async function findCharacters({ name = "", page = 1 } = {}) {
  const params = { page };
  if (name) params.name = name;

  try {
    const { data } = await axios.get(`${BASE_URL}/character`, { params });
    return {
      info: {
        count: data.info.count,
        pages: data.info.pages,
        next: data.info.next ? true : null,
        prev: data.info.prev ? true : null,
      },
      results: data.results.map(toSummary),
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw err;
  }
}

export async function findCharacterById(id) {
  const { data } = await axios.get(`${BASE_URL}/character/${id}`);
  return toDetail(data);
}
