import { useEffect, useState } from "react";
import { bringAllPokemon } from "../../services/apiCalls";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MoreInfo.css';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//-----------------------------------------------





const InfoList = () => {

    const [pokemon, setPokemon] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(null);  // Pokémon actual a mostrar
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [loading, setLoading] = useState(true);
    //Show Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 9;


    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await bringPokemon(currentPage);
            setPokemon(response.pokemons);
            setTotalCharacters(response.total);
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

    console.log('MoreInfo:', pokemon, currentPokemon, totalCharacters);


    return (
        <>
            <h3>Pokemon Info</h3>
        <Container>
<Row>

            {pokemon.map((poke) => (
                <Card style={{ width: '20rem' }} key={poke.id}>
                    <Card.Body>
                        <Card.Title><strong>{poke.name}</strong></Card.Title>
                        <Card.Text>
                            <img
                                src={poke.sprites.front_default}
                                alt={poke.name}
                                /><br />
                            <strong>Types: </strong> {poke.types.map(t => t.type.name).join(', ')}<br />
                            <strong>Base exp: </strong> {poke.base_experience}<br />
                            <strong>Games: </strong> {poke.game_indices.map(g => g.version.name).join(', ')}<br />
                            {poke.stats.map((s, index) => (
                                <p key={index}><strong>Stat: </strong>{s.stat.name}<br /><strong> Level: </strong>{s.base_stat}</p>
                            ))}
                        </Card.Text>
                    </Card.Body>
                    <Button variant="primary" onClick={() => {
                        setCurrentPokemon(poke);
                        handleShow();
                    }}>
                        Moves
                    </Button>
                    
                </Card>
            ))}

            </Row>

            {/* Paginación */}
            <div>
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</Button>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>All Moves</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentPokemon ? (
                        <>
                            <strong>Moves:</strong> {currentPokemon.moves.map(m => m.move.name).join(', ')}
                        </>
                    ) : (
                        <p>Cargando movimientos...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
                    </Container>
        </>
    );
}

export default InfoList;