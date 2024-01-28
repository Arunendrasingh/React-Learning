import { useEffect, useState } from "react";

let key_host = "https://www.omdbapi.com/?apikey=d00b9106&";

export function useMovies(query) {
  // Extract the movie fetch part from the component and create a custom hooks
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [apiError, setApiError] = useState("");

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
      controller.abort();
      console.log("Aborting the connection.....");
    };
  }, [query]);
  return { movies, loader, isFailed, apiError };
}
