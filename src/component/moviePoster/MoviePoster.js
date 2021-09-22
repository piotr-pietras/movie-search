import './moviePoster.css';

const MoviePoster = ({ poster }) => {

    return(
        <div className="MoviePoster">
            <fieldset className="MoviePoster-container"> 
                <legend>{poster.Title}</legend>

                <div className="MoviePoster-img">
                    <img src={ poster.Poster} />
                </div>

                <div className="MoviePoster-info">
                    <div>{`type: ${poster.Type}`}</div>
                    <div>{`year: ${poster.Year}`}</div>
                </div>
            </fieldset> 
        </div>
    )
}

export default MoviePoster