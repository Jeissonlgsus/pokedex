import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import pokeballImg from '../assets/pokeball.png'
import Footer from "../components/Footer";
import styles from './pokemon.module.css'
import { PokemonDetails } from "../types/types";
import { fetchPokemon } from '../api/fetchPokemon';
import { waitFor } from '../utils/utils';
import LoadingScreen from '../components/LoadingScreen';

const Pokemon = () => {
    const [ listLoading, setListLoading] = useState(false);
    const [pokemon , setPokemon] = useState<PokemonDetails>()
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getPokemon() {
            setListLoading(true);
            await waitFor(1000)
            const fetchedPokemon = await fetchPokemon(name as string);
            setPokemon(fetchedPokemon)
            setListLoading(false)
        }
        getPokemon()
    }, [name])

    if(listLoading || !pokemon){
        return <LoadingScreen />
    }
    
    return (
        <>
            <button className={styles.pokeballButton} onClick={() => navigate(-1)} > {/*remember, this function go back to the before page*/}
                <img className={styles.pokeballImg} src={pokeballImg} alt={name}/>Go back
            </button>
            <div className={styles.pokemon}>
                <main className={styles.pokemonInfo}>
                    <div className={styles.pokemonTitle}>{pokemon?.name?.toUpperCase()}</div>
                    <div>Nr. {pokemon?.id}</div>
                    <div>
                        <img className={styles.pokemonInfoImg} src={pokemon?.imgSrc} alt={pokemon?.name}/>
                    </div>
                    <div>HP: {pokemon?.hp}</div>
                    <div>Attack: {pokemon?.attack}</div>
                    <div>Defense: {pokemon?.defense}</div>
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default Pokemon;