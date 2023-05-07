import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/MovieCard";
import ReviewForm from "./components/ReviewForm";
import Youtube from "react-youtube";


function App() {
  
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280"
  const API_URL = "https://api.themoviedb.org/3"; //url to get to api 
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);
  

  const fetchMovies = async (searchKey) => {
  const type = searchKey ? "search" : "discover"
    const { data: {results}} = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey
      }
    })
     
    setMovies(results);
   await selectMovie(results[0])
   
    // console.log('data', data); to make sure data was being fetched from API
  };
  const fetchMovie= async (id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}`, {
    params: {
      api_key: process.env.REACT_APP_MOVIE_API_KEY,
      append_to_response: 'videos'
    }
  })


  return data;

  };
//loads selected movie
  const selectMovie = async (movie) => {
    setPlayTrailer(false)
  const  data = await fetchMovie(movie.id)
   setSelectedMovie(data)
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () => (
    movies.map(movie => (
        <div key={movie.id}>
                            <MovieCard
                            key={movie.id}
                            movie={movie}
                            selectMovie={selectMovie}
                            />
                            <ReviewForm/>
                          
                            </div>
                            ))
  )

  const searchMovies = (e) => {
    e.preventDefault() //If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.
    fetchMovies(searchKey)
  }
//funtion to render trailer from Youtube 
const renderTrailer = () => {
  const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer')
  const key = trailer ? trailer.key : selectedMovie.videos.results[0].key
const opts= {width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0},
        }
  return (
    <div className="youtube-container">
    <Youtube
      videoId={key}  opts={opts}/>
     </div>
  );
};


  return (
    <div className="App">
        <header className={"header"}>
          <div className={"header-content max-center"}>
          <h2>Movie Review App</h2>
          <form onSubmit={searchMovies}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value) }/>
            <button className="button" type="submit">Find Movie</button>  {/*search button */}
          </form> 
         </div>
        </header>

        <div className="hero" style={{backgroundImage:`url('${selectedMovie.backdrop_path ? IMAGE_PATH + selectedMovie.backdrop_path : ""}')`}}> 
                    
                    <div className="hero-content max-center" >
                      
                      {playTrailer ? <button className={"button button--close"} onClick={() => setPlayTrailer(false)}>Close</button> : null}
                  {selectedMovie.videos && playTrailer ? renderTrailer() : null }
           <button className={"button"} onClick={() => {
 // console.log("Play Trailer clicked"); // add this log statement to see if the button is being clicked
  setPlayTrailer(true);
}}>Play Trailer</button> 
         <h1 className={"hero-title"}>{selectedMovie.title}</h1> {/*movie title*/} 
         {selectedMovie.overview ? <p className={"hero-overview"}> {selectedMovie.overview} </p>: null }
         
         
         </div>
        </div>
      <div className="container max-center">{renderMovies()}</div>
    </div>
  );
}

export default App;
