import { MovieListType } from '@/types/movie'
import React from 'react'
import MovieItemUser from '../movie/movieItemUser'

export const UserMovie = ( {movies}: MovieListType) => {
  return (
    <div className='my-10'>
        <b className='text-2xl text-red-500'>Video của bạn</b>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-6">
        {movies?.map((movie) => (
          <div key={movie._id}>
            <MovieItemUser movie ={movie} />
          </div>
        ))}
      </div>
    </div>

  )
}
