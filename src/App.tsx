import { useState, useEffect, ChangeEvent } from 'react'

interface IMovies {
  items: string[]
  results: string[]
  title?: string
  poster_path?: string
  name: string
}

function App() {
  const [movies, setMovies] = useState<IMovies>()
  const [cover, setCover] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [search, setSearch] = useState('')
  useEffect(() => {
    getMovies()
  }, [search])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let timeOut
    timeOut && clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      setSearch(e.target.value)
    }, 1000)
  }

  async function getMovies() {
    if (!search) {
      const url = `https://api.themoviedb.org/3/list/3?api_key=${
        import.meta.env.VITE_API_KEY
      }`
      const response = await fetch(url)
      const json = await response.json()
      setMovies(json)
      setCover(json['items'][0]['backdrop_path'])
      setTitle(json['items'][0]['original_title'])
      setDescription(json['items'][0]['overview'])
      return
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${
      import.meta.env.VITE_API_KEY
    }&query=${search}`
    const response = await fetch(url)
    const json = await response.json()
    setMovies(json)
  }
  return (
    <div className="App font-inter min-h-screen bg-black/90">
      {movies && (
        <div>
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/original${cover}`}
              alt=""
              className="w-full h-96 object-cover rounded box-border p-4 opacity-40"
            />
            <div className="text-center">
              <span
                onClick={() => setSearch('')}
                className="text-white absolute cursor-pointer top-0 left-0 mt-5 text-4xl mx-10 font-bold"
              >
                cine
              </span>
              <input
                type="text"
                className="rounded-md bg-transparent w-48 border absolute top-2 right-2 text-sm p-2 mx-10 mt-5 text-white font-bold"
                placeholder="Search for movies"
                onChange={(e) => handleChange(e)}
              />
              <div className="text-white absolute bottom-14 left-10 max-w-xl right-10 rounded text-xl font-bold">
                <div className="bg-gray-900/70 rounded">
                  <div className="p-2">{title}</div>
                </div>
                <div className="bg-gray-900/70 rounded mt-2 text-sm">
                  <div className="p-2">{description}</div>
                </div>
              </div>
            </div>
          </div>
          {movies && !search && (
            <div>
              <div className="px-4 text-2xl font-bold text-white">
                <div>{movies['name']}</div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4 gap-2 px-4 mt-4">
                {movies.hasOwnProperty('items') &&
                  movies['items'].map((item) => {
                    return (
                      <div className="relative">
                        <img
                          className="rounded-md cursor-pointer hover:opacity-50 hover:transition-opacity"
                          src={`https://image.tmdb.org/t/p/w500${item['poster_path']}`}
                        ></img>
                        <div className="text-white  font-bold text-center absolute bottom-0 w-full backdrop-blur-lg p-2 rounded">
                          {item['title']}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      )}
      {movies && search && (
        <div>
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4 gap-2 px-4 mt-4">
              {movies.hasOwnProperty('results') &&
                movies['results'].map((item) => {
                  return (
                    <div className="relative">
                      <img
                        className="rounded-md cursor-pointer hover:opacity-50 hover:transition-opacity"
                        src={`https://image.tmdb.org/t/p/w500${item['poster_path']}`}
                      ></img>
                      <div className="text-white  font-bold text-center absolute bottom-0 w-full backdrop-blur-lg p-2 rounded">
                        {item['title']}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
