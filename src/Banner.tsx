import {useState, useEffect} from 'react';
import axios from '@/axios'
import '@/styles/Banner.scss';
import { requests } from './request';

const base_url = "https://image.tmdb.org/t/p/original";

type movieProps = {
  title        ?: string
  name         ?: string
  original_name?: string
  backdrop_path?: string
  overview     ?: string
}

export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.feachNetflixOriginals);
      setMovie(request.data.results[(Math.random() * request.data.results.length)|0]);
      return request;
    }
    fetchData();
  }, []);

  // overview の切り捨て用関数
  function truncate(str: any, n: number) {
    if (str !== undefined) {
      return str.length > n ? str?.substr(0, n - 1) + "..." : str;
    }
  }
/*
  return (
    <div className="Banner">
      <img
        className="Banner-poster"
        src={`${base_url}${movie.poster_path}`}
        alt={movie.name}
      />
      <h2 className="Banner-title">{movie.title}</h2>
      <button className="Banner-btn-play">Play</button>
      <button className="Banner-btn-mylist">My List</button>
      <div className="Banner-description">{movie.description}</div>
    </div>
  );
  */
  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>

        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  );
}