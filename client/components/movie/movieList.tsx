import { MovieListType } from '@/types/movie'
import React from 'react'
import MovieItem from './movieItem'
import { useAppDispatch } from '@/redux/hook'
import { addMovies } from '@/redux/movie/movieReducer'

export const MovieList = ( {movies}: MovieListType) => {
  const dispatch = useAppDispatch()
  dispatch(addMovies(movies))

  return (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-10">
        {movies?.map((movie) => (
          <div key={movie._id}>
            <MovieItem movie ={movie} />
          </div>
        ))}
      </div>

  )
}
