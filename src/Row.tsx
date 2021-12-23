import {useState, useEffect} from 'react';
import axios from '@/axios'
import YouTube, {Options} from 'react-youtube';
import '@/styles/Row.scss';

const base_url = "https://image.tmdb.org/t/p/original";

type Props = {
  title      : string
  fetchUrl   : string
  isLargeRow?: boolean
}

type Movie = {
  id           : string
  name         : string
  title        : string
  original_name: string
  poster_path  : string
  backdrop_path: string
}

// type Options = {
//   height: string;
//   width: string;
//   playerVars: {
//     autoPlay: 0 | 1 | undefined;
//   };
// };

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts: Options = {
    height: "390",
    width : "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerUrl = await axios.get(`/movie/${movie.id}/videos?api_key=ecb5cb18b04ee0f25d9f00c31889b6db`);
      setTrailerUrl(trailerUrl.data.results[0]?.key);
    }
  }

  return (
    <div className="Row">
      <h2 className="Row-title">{title}</h2>
      <div className="Row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}