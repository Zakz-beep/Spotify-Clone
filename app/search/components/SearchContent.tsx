"use client"

import MediaItem from "@/components/MediaItem"
import { Song } from "@/types"
import LikeButton from "./LikeButton"
import useOnplay from "@/hooks/useOnplay"

interface SearchContentProps {
    songs:Song[]
}

const SearchContent:React.FC<SearchContentProps> = ({songs}) => {
    const onPlay = useOnplay(songs)
    if(songs.length === 0) return <div className="mt-4 text-neutral-400">No songs found</div>
    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) =>(
                <div key={song.id} className='flex items-center w-full gap-x-4'>
                    <div className="flex-1">
                        <MediaItem onClick={(id:string) => onPlay(id) } data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    )
}

export default SearchContent