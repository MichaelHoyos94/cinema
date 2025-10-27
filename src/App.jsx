import './App.css'
import { Movies } from './components/Movies'
import { useCallback, useEffect, useState } from 'react';
import { useMovies } from './hooks/useMovies';
import debounce from 'just-debounce-it';

export function useQuery() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    if (query.length === 0) {
      setError('No se puede buscar una película vacía');
      return;
    } else {
      setError(null);
    }
  }, [query]);
  return {query, setQuery, error, setError};
}

function App() {
  const [sortedByYear, setSortedByYear] = useState(false);
  const {query, setQuery, error, setError} = useQuery();
  const { movies, getMovies, getMovies2 } = useMovies({query, sortedByYear});

  const debouncedGetMovies = useCallback(debounce(({query}) => {
    console.log('Buscando películas con query:', query);
    getMovies({query});
  }, 1000), []);

  useEffect(() => {
    getMovies({query});
  }, []); // Cargar películas inicialmente

  useEffect(() => {
    console.log('getMovies changed');
  }, [getMovies]);

  useEffect(() => {
    console.log('getMovies2 changed');
  }, [getMovies2]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ query });
  }

  const handleSortByYear = () => {
    setSortedByYear(!sortedByYear);
  }

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedGetMovies({ query: newQuery });
  }

  return (
    <>
      <h1>Cinema</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label>Movie title</label>
        <input type='text' placeholder='Star wars, Avengers, Shrek...' onChange={handleChange} value={query}/>
        <input type='checkbox' onChange={handleSortByYear} checked={sortedByYear}/> Sort by year
        <input type='submit' value={"Search"} />
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
      <main>
        <Movies movies={movies}/>
      </main>
    </>
  )
}

export default App
