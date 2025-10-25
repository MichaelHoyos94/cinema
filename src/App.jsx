import './App.css'

import responseMovies from './assets/mocks/results.json'
import responseNoMovies from './assets/mocks/no-results.json'
import { Movies } from './components/Movies';
import { useRef } from 'react';

// TODO: Meter en HOOK}
export function useMovies() {
  const movies = responseMovies.Search;
  const mappedMovies = movies.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))
  return {movies: mappedMovies}
}

function App() {
  const {movies: mappedMovies} = useMovies();
  //const inputRef = useRef(); no need

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = Object.fromEntries(new window.FormData(event.target))
    console.log(fields);
  }

  return (
    <>
      <h1>Cinema</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label>Movie title</label>
        <input type='text' placeholder='Star wars, Avengers, Shrek...' />
        <input type='date' placeholder='10/oct/2025' />
        <input type='submit' value={"Search"} />
      </form>
      <main>
        <Movies movies={mappedMovies}/>
      </main>
    </>
  )
}

export default App
