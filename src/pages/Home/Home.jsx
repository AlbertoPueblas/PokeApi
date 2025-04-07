import React from 'react';
// import { useEffect, useState } from 'react'
import './Home.css'
// import { toast, ToastContainer } from 'react-toastify';

import { Button, Container, Image, Row } from 'react-bootstrap';
import pOKEMON from '../../images/pOKEMON.jpg'

//------------------------------------------------------

export const Home = () => {
    return (
        <>
        <Container fluid className='text-center' style={{ paddingTop: '20px' }}>
            <Row className='cabecera'>
            <Image src={pOKEMON} style={{width: '59em'}}>
            </Image>
            </Row>
        </Container>
        </>
    )
}