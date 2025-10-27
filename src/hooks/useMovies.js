import { useState, useMemo, useCallback } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({query, sortedByYear}) {
    const [movies, setMovies] = useState([]);

    // se crea varias veces la función si no se usa useMemo
    const getMovies2 = async ({query}) => {
        try {
            const newMovies = await searchMovies(query);
            setMovies(newMovies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // se crea una sola vez la función gracias a useMemo
    const getMovies = useMemo(() => {
        return async ({query}) => {
            try {
                const newMovies = await searchMovies(query);
                setMovies(newMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
    }, []);

    // otra forma de crear la función una sola vez es usando useCallback
    const getMovies3 = useCallback(async ({query}) => {
        try {
            const newMovies = await searchMovies(query);
            setMovies(newMovies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }, []);

    return { movies, getMovies, getMovies2 };
}