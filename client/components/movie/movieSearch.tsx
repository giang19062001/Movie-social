import { MovieListType } from '@/types/movie'
import React from 'react'
import MovieItem from './movieItem'
import { useAppDispatch } from '@/redux/hook'
import { addMovies } from '@/redux/movie/movieReducer'
import MovieItemSearch from './movieItemSearch'

export const MovieSearch = ( {movies}: MovieListType) => {
  const dispatch = useAppDispatch()
  dispatch(addMovies(movies))

  return (
      <div className="grid grid-cols-1  gap-4 my-10">
        {movies?.map((movie) => (
          <div key={movie._id}>
            <MovieItemSearch movie ={movie} />
          </div>
        ))}
      </div>

  )
}
