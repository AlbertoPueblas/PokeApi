import axios from 'axios';

const API_URL = "https://pokeapi.co/api/v2";

export const bringAllPokemon = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  try {
    const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
    console.log('respuesta:',response);

    const basicList = response.data.results;

    const detailedList = await Promise.all(
      basicList.map(async (poke) => {
        const id = poke.url.split('/').slice(-2)[0];

        try {
          // Traer los detalles del Pokémon
          const [encounterRes, detailRes] = await Promise.all([
            axios.get(`${API_URL}/pokemon/${id}/encounters`),
            axios.get(`${API_URL}/pokemon/${id}`)
          ]);

          const encounters = encounterRes.data;
          const locationName = encounters.length > 0
            ? encounters[0].location_area.name.replace(/-/g, ' ')
            : 'Desconocida';

          // Obtener los movimientos (ataques)
          const moves = detailRes.data.moves.map(move => move.move.name).join(', ');

          return {
            name: poke.name,
            id:id,
            location: locationName,
            moves // Añadir los movimientos al resultado
          };
        } catch (error) {
          console.error(`Error trayendo detalles para el Pokémon ${poke.name}:`, error);
          return {
            name: poke.name,
            id: id,
            location: 'Error al cargar',
            moves: 'Desconocidos'
          };
        }
      })
    );

    return {
      results: detailedList,
      count: response.data.count
    };

  } catch (error) {
    console.error("Error al traer los Pokémon:", error);
    throw error;
  }
};


export const bringAllLocation = async (page = 1, limit = 10) => {

  const offset = (page -1) * limit;
  const response = await axios.get(`${API_URL}/location?offset=${offset}&limit=${limit}`);
  return response;
}
 