import { useEffect, useState } from "react";
import RatingStar from "./RatingStar";

let key_host = "https://www.omdbapi.com/?apikey=d00b9106&";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("Inception");
  const [loader, setLoader] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [apiError, setApiError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectedMovie = (movieId) => {
    if (selectedId === movieId) {
      setSelectedId(null);
    } else {
      setSelectedId(movieId);
    }
  };

  const updateWathedList = (newMovieDetail) => {
    setWatched([...watched, newMovieDetail]);
  };

  useEffect(() => {
    // Create a controller
    const controller = new AbortController();
    const signal = controller.signal;
    async function loadSearchedMovie() {
      try {
        setLoader(true);
        setIsFailed(false);
        let response = await fetch(`${key_host}s=${query}`, { signal });
        let json_val = await response.json();

        if (json_val.Search) {
          setMovies(json_val.Search);
          setApiError("");
        } else {
          setApiError(json_val.Error);
        }
      } catch (e) {
        if (e instanceof TypeError && e.message === "Failed to fetch") {
          setIsFailed(true);
        }
      } finally {
        setLoader(false);
      }
    }

    if (query.length > 2) {
      loadSearchedMovie();
    } else {
      setApiError("😕😕No Movie name present to Search!!");
    }
    return () => {
      controller.abort()
      console.log("Aborting the connection.....")

    }
  }, [query]);
  return (
    <>
      <Navbar>
        <Search searchString={query} setSearchField={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {!loader && !isFailed && apiError.length > 0 ? (
            <NoMovieDetail message={apiError} />
          ) : (
            <MovieList movies={movies} selectMovie={handleSelectedMovie} />
          )}
          {loader && <PreLoader />}
          {isFailed && <Error />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetail
              selectedMovieId={selectedId}
              setSelectedId={setSelectedId}
              updateWathedList={updateWathedList}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummery watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} setOpenF={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedMovie movie={movie} key={index} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function WatchSummery({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function Movie({ movie, selectMovie }) {
  return (
    <li
      key={movie.imdbID}
      onClick={() => selectMovie(movie.imdbID)}
      style={{ cursor: "pointer" }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, selectMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie, index) => (
        <Movie movie={movie} key={index} selectMovie={selectMovie} />
      ))}
    </ul>
  );
}

function Button({ isOpen, setOpenF }) {
  return (
    <button className="btn-toggle" onClick={() => setOpenF((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ searchString, setSearchField }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchString}
      onChange={(e) => setSearchField(e.target.value)}
    />
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

// Loader

function PreLoader() {
  return <div className="loader">Loading...</div>;
}

function Error() {
  return <div className="error">❌ Faild to Fetch.</div>;
}

function NoMovieDetail({ message }) {
  return <div className="loader">{message}</div>;
}

function MovieDetail({
  selectedMovieId,
  setSelectedId,
  updateWathedList,
  watched,
}) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movieRating, setMovieRating] = useState(0);

  // Get movie is already in watched list or not if yesthen display the movie
  const isWatched = watched
    .map((detail) => detail.imdbID)
    .includes(selectedMovieId);
  const watchedRating = watched.find(
    (item) => item.imdbID === selectedMovieId
  )?.userRating;

  useEffect(() => {
    setIsLoading(true);
    console.log("Running useEffect for MovieDetail.", selectedMovieId);
    // Here load the movie detail and set the state.
    async function loadMovieDetail() {
      let res = await fetch(`${key_host}i=${selectedMovieId}`);
      let json_data = await res.json();
      console.log("Movie Detail: ", json_data);

      setMovieDetail(json_data);
      setIsLoading(false);
    }
    loadMovieDetail();
  }, [selectedMovieId]);
  return (
    <div className="details">
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>
              &larr;
            </button>
            <img
              src={`${movieDetail.Poster}`}
              alt={`Poster of ${movieDetail.Title} movie`}
            />
            <div className="details-overview">
              <h2>{movieDetail.Title}</h2>
              <p>
                {movieDetail.Released} &bull; {movieDetail.Runtime}.
              </p>
              <p>{movieDetail.Genre}</p>
              <p>
                <span>⭐️</span>
                {movieDetail.imdbRating}/10 IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <RatingStar size={35} setStarRating={setMovieRating} />
                  <button
                    className="btn-add"
                    onClick={() =>
                      updateWathedList({
                        imdbID: movieDetail.imdbID,
                        Title: movieDetail.Title,
                        Year: movieDetail.Year,
                        Poster: movieDetail.Poster,
                        runtime: movieDetail.Runtime,
                        imdbRating: movieDetail.imdbRating,
                        userRating: movieRating,
                      })
                    }
                  >
                    + Add to watched list
                  </button>
                </>
              ) : (
                <p>
                  You rated with movie {watchedRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{MovieDetail.plot}</em>
            </p>
            <p>Starring {movieDetail.Actors}</p>
            <p>Directed by {movieDetail.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
