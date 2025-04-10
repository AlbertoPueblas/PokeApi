import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
// import cabecera from '../../images/cabecera.png'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

//-------------------------------------------------------------------------
function Header() {

    const navigate = useNavigate();
    return (
        <>
            <Navbar className='nav'>
                <Container>
                    {/* <img
                        src={cabecera} className='cabecera'
                        onClick={() => (navigate('/'))}>
                    </img> */}
                    <p>Click on image to go back</p>
                    <div className="botonesNav">
                        <Button variant='outline-info' onClick={() => (navigate('Pokemon'))}>Pokemon</Button>
                        <Button variant='outline-success'onClick={() => (navigate('episodes'))}>Episodes</Button>
                        <Button variant='outline-primary'onClick={() => (navigate('MoreInfo'))}>MoreInfo</Button>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;