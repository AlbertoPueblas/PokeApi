import React, { useState, useEffect } from 'react';
import './Pokemon.css';
import { bringAllPokemon } from '../../services/apiCalls';
import { Button, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 10;
  const [totalCharacters, setTotalCharacters] = useState(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      await bringPokemon(currentPage);
    };
    fetchPokemon();
  }, [currentPage]);

  const bringPokemon = async (page) => {
    try {
      const response = await bringAllPokemon(page, charactersPerPage);
      setPokemon(response.data.results);
      setTotalCharacters(response.data.count);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 👇 Función para extraer el ID de la URL
  const getPokemonIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  if (loading) {
    return <div>Cargando Pokémon...</div>;
  }

  //Logica paginacion
  const totalPages = Math.ceil(totalCharacters / charactersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };


  return (
    <div className='design'>
      <Container>
        <h1>Lista de Pokémon</h1>
        <Row xs={12} sm={6} md={3}>
          <Card className="pokemon-list">
            {pokemon.map((poke) => {
              const id = getPokemonIdFromUrl(poke.url);
              return (
                <li key={poke.name} className="pokemon-card">

                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={poke.name}
                    width="100"
                  />
                  <p>{poke.name}</p>
                </li>
              );
            })}
      <div className="pagination-controls">
        <Button
          variant="primary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          variant="primary"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          >
          Next
        </Button>
      </div>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default PokemonList;
