import axios from 'axios';

const API_URL = "https://pokeapi.co/api/v2";

export const bringPokemonId = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  try {
    const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);

    const basicList = response.data.results;

    const detailedList = await Promise.all(
      basicList.map(async (poke) => {
        const id = poke.url.split('/').slice(-2)[0];

        try {
          // Traer los detalles del Pokémon
          const [encounterRes, detailRes] = await Promise.all([
            axios.get(`${API_URL}/pokemon/${id}/encounters`),
            axios.get(`${API_URL}/pokemon/${id}`),
            
          ]);

          const encounters = encounterRes.data;
          const locationName = encounters.length > 0
            ? encounters[0].location_area.name.replace(/-/g, ' ')
            : 'Desconocida';

          // Obtener los movimientos (ataques)
          const moves = detailRes.data.moves.map(move => move.move.name).join(', ');

          const types = detailRes.data.types.map(type => type.type.name).join(',')


          return {
            name: poke.name,
            id:id,
            location: locationName,
            types,
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


export const bringAllPokemon = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  
  try {
    const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const basicList = response.data.results;
    
    const detailedList = await Promise.all(
      basicList.map(async (poke) => {
        const res = await axios.get(poke.url);
        console.log('res',res.data.name);
        return res.data;
      })
    );
    
    return {
      pokemons: detailedList,
      total: response.data.count
    };
    
  } catch (error) {
    console.error("Error al traer los Pokémon:", error);
    throw error;
  }
};


export const getPokemonGender = async (pokemonName) => {
  const genderTypes = ['Female', 'Male', 'Genderless'];

  try {
    const foundGenders = [];

    for (const gender of genderTypes) {
      const res = await axios.get(`${API_URL}/gender/${gender}`);
      const speciesList = res.data.pokemon_species_details;

      const isPresent = speciesList.some(
        species => species.pokemon_species.name === pokemonName.toLowerCase()
      );

      if (isPresent) {
        foundGenders.push(gender);
      }
    }

    return foundGenders.length > 0 ? foundGenders.join(', ') : 'Desconocido';

  } catch (error) {
    console.error(`Error al obtener el género de ${pokemonName}:`, error);
    return 'Error';
  }
};

