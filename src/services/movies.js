const API_KEY = '4287ad07';

export async function searchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();
        const movies = data.Search;
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }));   
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

export function sortMovies(movies) {
    return movies.slice().sort((a, b) => a.year.localeCompare(b.year));
}