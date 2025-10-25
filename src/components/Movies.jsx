function ListOfMovies({movies}) {
    return (
        <ul>
            {
                movies.map(movie => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.Title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMovies() {
    return (
        <p>¡Ups! nothing here.</p>
    )
}

export function Movies({movies}) {
    console.log({movies});
    const hasMovies = movies?.length > 0;
    return (
        hasMovies ? <ListOfMovies movies={movies}/> : <NoMovies />
    )
}