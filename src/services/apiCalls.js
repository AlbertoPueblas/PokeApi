import axios from 'axios'

const API_URL = "https://pokeapi.co/api/v2"

export const bringAllPokemon = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
  return response;
};
