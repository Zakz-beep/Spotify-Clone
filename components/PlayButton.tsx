import React from 'react'
import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  return (
    <button className='transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-0 group-hover:opacity-100 hover:scale-110'>
        <FaPlay className='text-black' size={20}/>
    </button>
  )
}

export default PlayButton