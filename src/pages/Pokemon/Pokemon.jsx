import React, { useState, useEffect } from 'react';
import './Pokemon.css';
import { bringAllPokemon } from '../../services/apiCalls';
import { Button, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//-------------------------------------------------------------

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  // Página y Pokémon actual
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPokemon, setCurrentPokemon] = useState(null);  // Pokémon actual a mostrar
  const charactersPerPage = 10;
  const [totalCharacters, setTotalCharacters] = useState(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await bringPokemon(currentPage);
      setPokemon(response.results);
      setTotalCharacters(response.count);
      setLoading(false);
      setCurrentPokemon(response.results[0]);  // Establecer el primer Pokémon
    };
    fetchPokemon();
  }, [currentPage]);

  const bringPokemon = async (page) => {
    try {
      const response = await bringAllPokemon(page, charactersPerPage);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Cargando Pokémon...</div>;
  }

  // Lógica de paginación
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
  console.log(currentPokemon);

  return (
    <Container>
      <div className="pokedex">
        <Row xs={2} md={4} lg={6}>
          <Col></Col>
        </Row>
        <Row xs={1} md={2}>
          <Col>
            <div className='img-pokemon'>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`}
                alt={currentPokemon.name} />
            </div>

          </Col>
          <Col className='description'>
            {currentPokemon && (
              <>
                <p><strong>Zona de encuentro: </strong>{currentPokemon.location}</p>
                <p><strong>Movimientos:</strong> {
                  currentPokemon.moves
                    .split(',')        // convierte el string en un array
                    .slice(0, 6)       // agarra solo los primeros 3
                    .map((move, i) => (
                      <span key={i}>{move.trim()}{i < 2 ? ', ' : ''}</span>  // muestra con coma
                    ))}</p>
              </>
            )}
          </Col>

        </Row>
        <Row className='footer' >
          <Col className='name'>
            <h4>{currentPokemon.name}</h4>
          </Col>
          <div className='pagination'>
            <Button className='btn-dir' onClick={handlePrevPage} disabled={currentPage === 1}>
            </Button>
            <Button className='btn-dir' onClick={handleNextPage} disabled={currentPage >= totalPages}>

            </Button>


          </div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </Row>
      </div>
    </Container>
  );
}

export default PokemonList;
