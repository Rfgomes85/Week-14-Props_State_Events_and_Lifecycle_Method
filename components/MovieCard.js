import React from "react";

const MovieCard = ({movie, selectMovie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"
    // console.log(movie); checking to see if movie array was loading
    return (
        <div className={"movie-card"} onClick={() => selectMovie(movie)}> {/* onClick to switch to movie that is selected */}
            {movie.poster_path ? <img className="movie-cover" src={`${IMAGE_PATH}${movie.poster_path}`} alt=""/>
            :
            <div className="movie-placeholder">No Image found</div>
            }
            
            <h5 className="movie-title">{movie.title}</h5>
        </div>
    );
};
export default MovieCard;