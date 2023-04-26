import { MovieListType } from '@/types/movie'
import React from 'react'
import MovieItem from '../movie/movieItem'

export const UserMovie = ( {movies}: MovieListType) => {
  return (
    <div className=''>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-6">
        {movies?.map((movie) => (
          <div key={movie._id}>
            <MovieItem movie ={movie} />
          </div>
        ))}
      </div>
    </div>

  )
}
