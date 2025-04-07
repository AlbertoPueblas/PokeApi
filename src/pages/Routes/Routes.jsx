import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from '../Home/Home'
import PokemonList from "../Pokemon/Pokemon"

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to='/' />} />
                <Route path="/" element={<Home />} />
                <Route path="Pokemon" element={<PokemonList/>} />
            </Routes>
        </>
    )
}