"use client"
import React from 'react'
import {Song} from "@/types"
import SongItem from '@/components/SongItem';
import useOnplay from '@/hooks/useOnplay';
interface PageContentProps {
    songs:Song[];
}
const PageContent:React.FC<PageContentProps> = ({songs}) => {
  const onPlay = useOnplay(songs)
    if(songs.length === 0) return <div className="mt-4 text-neutral-400">No songs found</div>
  return (
    <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 gap-x-8'>
        {songs.map((item)=>(
            <SongItem key={item.id} data={item} onClick={(id:string) => onPlay(id)} />
        ))}
    </div>
  )
}

export default PageContent