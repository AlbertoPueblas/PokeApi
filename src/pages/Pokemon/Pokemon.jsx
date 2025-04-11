// import React, { useState, useEffect } from 'react';
// import './Pokemon.css';
// import { bringPokemonId, getPokemonGender } from '../../services/apiCalls';
// import { Button, Container, Row } from 'react-bootstrap';
// import Col from 'react-bootstrap/Col';
// import { useNavigate } from 'react-router-dom';

// //-------------------------------------------------------------

// const PokemonList = () => {
//   const navigate = useNavigate();
//   const [pokemon, setPokemon] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [gender, setGender] = useState([])
//   // Página y Pokémon actual
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentPokemon, setCurrentPokemon] = useState(null);  // Pokémon actual a mostrar
//   const charactersPerPage = 10;
//   const [totalCharacters, setTotalCharacters] = useState(0);

//   useEffect(() => {
//     const fetchPokemon = async () => {
//       const response = await bringPokemon(currentPage);
//       setPokemon(response.results);
//       setTotalCharacters(response.count);
//       setCurrentPokemon(response.results[0]);

//       if (response.results[0]) {
//         const gender = await getPokemonGender(response.results[0].name);
//         setGender(gender);
//       }

//       setLoading(false);
//     };

//     fetchPokemon();
//   }, [currentPage]);


//   const bringPokemon = async (page) => {
//     try {
//       const response = await bringPokemonId(page, charactersPerPage);
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const pokemonGender = async (page) => {
//     try {
//       const res = await bringGender(page, charactersPerPage);
//       return res;
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   if (loading) {
//     return <div>Cargando Pokémon...</div>;
//   }

//   // Lógica de paginación
//   const totalPages = Math.ceil(totalCharacters / charactersPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prevPage => prevPage - 1);
//     }
//   };
//   console.log('current', currentPokemon);
//   console.log('pokemon:', pokemon);
//   console.log('res:', gender);

//   return (
//     <Container>
//       <div className="pokedex">
//         <Row xs={2} md={4} lg={6}>
//           <Col></Col>
//         </Row>

//         <Row xs={1} md={2}>
//           <Col>
//             <div className='img-pokemon'>
//               <img
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`}
//                 alt={currentPokemon.name} />
//             </div>
//                 <div className='list'>
//                   <p>
//                   {currentPage} / {totalPages}
//                   </p>
//                 </div>
//                 <Button className='btn-info' onClick={() => (navigate('/MoreInfo'))}><p className='info'>+</p></Button>
//           </Col>
//           <Col className='description'>
//             {currentPokemon && (
//               <>
//                 <p><strong>Location: </strong>{currentPokemon.location}</p>
//                 <p><strong>Moves:</strong> {
//                   currentPokemon.moves
//                     .split(',')        // convierte el string en un array
//                     .slice(0, 6)       // agarra solo los primeros 3
//                     .map((move, i) => (
//                       <span key={i}>{move.trim()}{i < 2 ? ', ' : ''}</span>  // muestra con coma
//                     ))}</p>
//               </>
//             )}
//             <Col></Col>
//           </Col>
//             <Col className='gender'>
//               <p className='pGender'><strong>Gender:</strong> {gender}</p>
//               <p><strong>Type: </strong>{currentPokemon.types}</p>
//             </Col>
//         </Row>


//         <Row className='footer' >
//           <Col className='name'>
//             <h4>{currentPokemon.name}</h4>
//           </Col>
//           <Col className='buttons'>
//             <Button className='btn-dir' onClick={handlePrevPage} disabled={currentPage === 1}>
//             </Button>
//             <Button className='btn-dir' onClick={handleNextPage} disabled={currentPage >= totalPages}>
//             </Button>
//           </Col>
//           <Col className='description'>
//           </Col>

//         </Row>
//       </div>
//     </Container>
//   );
// }

// export default PokemonList;
