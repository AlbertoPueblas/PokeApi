import { useEffect, useState } from "react";
import { bringAllPokemon } from "../../services/apiCalls";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MoreInfo.css';





const InfoList = () => {

    const [pokemon, setPokemon] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(null);  // Pokémon actual a mostrar
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [loading, setLoading] = useState(true);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 10;


    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await bringPokemon(currentPage);
            setPokemon(response.data.results);
            setTotalCharacters(response.count);
            setCurrentPokemon(response.results[0]);
            setLoading(false);
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


    //Pagination
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

    const handlePokemonClick = (poke) => {
        setCurrentPokemon(poke);  // Actualiza currentPokemon cuando se selecciona un Pokémon
    };

    console.log('MoreInfo:',pokemon, currentPokemon,totalCharacters);
    

    return (
        <>
            <h3>Pokemon Info</h3>
            {currentPokemon && (
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>name{pokemon.name}</Card.Title>
                        <Card.Text>
                            <strong>Tipos:</strong> {currentPokemon.types}<br />
                            <strong>Movimientos:</strong> {currentPokemon.moves.slice(0, 3)}<br />
                            <strong>Zona de Encuentro:</strong> {currentPokemon.location}
                        </Card.Text>
                        <Button variant="primary">Más Información</Button>
                    </Card.Body>
                </Card>
            )}
                {pokemon.map((poke) => (
                    <div key={poke.id} style={{ margin: '5px' }}>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            alt={pokemon.name} 
                            />
                        {poke.type}
                            {poke.name}
                    </div>
                ))}

            {/* Paginación */}
            <div>
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</Button>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</Button>
            </div>
        </>
    );
}

export default InfoList;