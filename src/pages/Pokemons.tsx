import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { fetchPokemons } from "../api/fetchPokemons";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { waitFor } from "../utils/utils";
// MUCHO OJO CON LAS IMPORTACIONES
import { Pokemon } from "../types/types";
import styles from './pokemons.module.css'

const Pokemons = () => {
    const [ listLoading, setListLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
      const fetchAllPokemons = async () => {
        setListLoading(true)
        await waitFor(1000); // generate a delay for the load wait // simulate a slow network connection
        const allPokemons = await fetchPokemons();
        setPokemons(allPokemons);
        setListLoading(false)
      }
      fetchAllPokemons();
    }, []);

    if(listLoading || !Pokemons){
        return <LoadingScreen />
    }

    const filterPokemons = pokemons?.slice(0,151).filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLowerCase())
        }
    );

    return (
        <>
            <Header query={query} setQuery={setQuery}/>
            <main>
                <nav className={styles.nav}>
                    {filterPokemons?.slice(0,151).map((pokemon) => (
                        <Link 
                        key={pokemon.id} 
                        className={styles.listItem} 
                        to={`/pokemons/${pokemon.name.toLowerCase()}`}>
                            <img 
                            className={styles.listItemIcon} 
                            src={pokemon.imgSrc} 
                            alt={pokemon.name} 
                            />
                            <div className={styles.listItemText}>
                                <span>{pokemon.name}</span>
                                <span>{pokemon.id}</span>
                            </div>
                        </Link>
                    ))}
                    
                </nav>
            </main>
            <Footer />
        </>
    );
};

export default Pokemons;