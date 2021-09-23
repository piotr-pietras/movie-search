import './movieCard.css'

const MovieCard = ({ selectedMovie }) => {
    
    return(
        <div className="MovieCard">
            <div className="MovieCard-left">
                <div className="MovieCard-img">
                    <img alt="poster" src={selectedMovie.Poster} />
                </div>

                <div className="MovieCard-votes">
                    <p>{`Metascore: ${selectedMovie && selectedMovie.Metascore}`}</p>
                </div>
            </div>

            <div className="MovieCard-right">
                test
            </div>
        </div>
    )
}

export default MovieCard