import { useEffect, useState } from "react";


interface Movie {
  _id: any,
  plot: string,
  genres: string[],
  runtime: number,
  cast: string[],
  num_mflix_comments: number,
  poster: string,
  title: string,
  lastupdated: string,
  languages: string[],
  released: string,
  directors: string[],
  rated: string,
  year: number,
  imdb: {
    rating: number,
    votes: number,
    id: number
  },
  countries: string[],
  type: string,
  tomatoes: {
    viewer: {
      rating: number,
      numReviews: number,
      meter: number,
    },
    dvd: string,
    lastUpdated: string
  }


}


const Data = ({ app }: { app: Realm.App }) => {
  const mongo = app?.currentUser?.mongoClient('mongodb-atlas');
  const sales = mongo?.db("sample_mflix").collection("movies");

  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);


  const LOCAL_URL = "http://localhost:8000"

  const getData = async () => {
    // const data = await sales.;
    // console.log(data);

    fetch(`${LOCAL_URL}/getMovies`)
      .then((res) => res.json()).then((res) => {
        setMovies(res);
      })
  }
  const getGenres = async () => {
    fetch(`${LOCAL_URL}/getFacetsByGenres`)
      .then((res) => res.json()).then((res) => {
        setGenres(res[0]["categorizebyGenres"]);
      })
  }

  useEffect(() => {
    getData();
    getGenres();
  }, []);


  const getByGenre = async () => {
    console.log(`${LOCAL_URL}/getByGenre?${filtersApplied.map((item) => `genre=${item}`)}`.replaceAll(",", "&"))

    fetch(`${LOCAL_URL}/getByGenre?${filtersApplied.map((item) => `genre=${item}`)}`.replaceAll(",", "&"))
      .then((res) => res.json())
      .then(res => {
        console.log(res);
        if (res.length > 0) {
          setMovies(res);
        }
      })
  }

  useEffect(() => {
    getByGenre();
  }, [filtersApplied]);


  return (
    <div className="w-full h-full">
      <div className="w-full mx-auto h-full flex gap-4 px-4 py-10">
        <div className="w-1/5 h-full">
          <h1 className="text-2xl font-semibold my-5">Filters</h1>
          <div className="flex flex-col">
            <p className="text-sm font-semibold mb-2">Genres</p>
            <div className="flex flex-wrap gap-2">
              {genres && genres.map((item) => <p onClick={() => {
                if (!filtersApplied.includes(item["_id"])) {
                  let temp = [...filtersApplied]
                  temp.push(item["_id"]);
                  setFiltersApplied(temp);
                } else {
                  let temp = [...filtersApplied]
                  setFiltersApplied(temp.filter((x) => x !== item["_id"]))
                }
              }} className={`w-max text-xs font-semibold  border rounded-full p-2 ${filtersApplied.includes(item["_id"]) && "bg-red-400"} cursor-pointer`}>{item["_id"]}</p>)}
            </div>
          </div>
        </div>

        <div className="w-4/5 h-full">
          <h1 className="text-2xl font-semibold my-5">Movies</h1>
          {movies.length > 0} {
            <div className="w-full h-full flex flex-col">
              {movies.map((movie) => <MovieCard movie={movie} />)}
            </div>
          }
        </div>


      </div>
    </div>
  )
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="w-full flex p-4 gap-4">
      <div className="bg-gray-200 relative flex flex-col w-2/6 h-[300px]">
        <img src={movie.poster} className="h-full object-scale-down object-center" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{movie.title} </h1>
        <div className="flex gap-3">
          <p className="text-sm">{movie.year}</p>
          <p className="border text-xs p-[2px]">{movie.rated}</p>
          <p className="text-sm">{movie.runtime} min</p>
        </div>

        <p className="text-base">{movie.plot}</p>

        <div className="flex flex-col">
          <p className="text-sm font-semibold mb-2">Languages</p>
          <div className="flex gap-2">
            {movie.languages && movie.languages.map((item) => <p className="text-xs font-semibold border rounded-full p-2">{item}</p>)}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold mb-2">Genre</p>
          <div className="flex gap-2">
            {movie.genres && movie.genres.map((item) => <p className="text-xs font-semibold  border rounded-full p-2">{item}</p>)}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold">{movie.num_mflix_comments} Reviews</p>
        </div>
      </div>
    </div>
  )
}


export default Data;