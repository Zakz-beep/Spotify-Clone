"use client"

import { Song } from '@/types'
import React, { useEffect, useState } from 'react'
import {BsPauseFill, BsPlayFill} from "react-icons/bs"
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2"
import MediaItem from './MediaItem'
import LikeButton from '@/app/search/components/LikeButton'
import useSound from "use-sound"
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import Slider from './Slider'
import ProgressBar from './ProgressBar'
import usePlayer from '@/hooks/usePlayer'

interface PlayerContentProps {
    song: Song
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const player = usePlayer()
    const [volume, setVolume] = useState(1)
    
    const [play, { pause, sound }] = useSound(
        songUrl, {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false)
                setCurrentTime(0)
                onPlayNext()
            },
            onpause: () => setIsPlaying(false),
            onload: () => {
                if (sound) {
                    setDuration(sound.duration() || 0)
                }
            },
            format: ['mp3']
        }
    )

    // Update current time
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        
        if (isPlaying && sound) {
            interval = setInterval(() => {
                const seek = sound.seek() || 0
                setCurrentTime(seek)
            }, 1000)
        }
        
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [isPlaying, sound])

    useEffect(() => {
        sound?.play()
        return () => {
            sound?.unload()
        }
    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play()
        } else {
            pause()
        }
    }

    const handleSeek = (time: number) => {
        if (sound) {
            sound.seek(time)
            setCurrentTime(time)
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0)
        }
    }

    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {
        if (player.ids.length === 0) return

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]
        if (!nextSong) {
            return player.setId(player.ids[0])
        }
        player.setId(nextSong)
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return
        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const previousSong = player.ids[currentIndex - 1]
        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }
        player.setId(previousSong)
    }

    return (
        <div className='flex flex-col h-full'>
            {/* Mobile Progress Bar - Top */}
            <div className="flex md:hidden w-full px-4 pb-2">
                <ProgressBar 
                    currentTime={currentTime}
                    duration={duration}
                    onSeek={handleSeek}
                />
            </div>
            
            {/* Main Player Content */}
            <div className='grid grid-cols-2 md:grid-cols-3 flex-1'>
                <div className="flex w-full justify-start">
                    <div className="flex items-center gap-x-4">
                        <MediaItem onClick={(id:string) => player.setId(id)} data={song} />
                        <LikeButton songId={song.id} />
                    </div>
                </div>
                
                {/* Mobile Controls */}
                <div className="flex md:hidden col-auto w-full justify-end items-center gap-x-2">
                    <AiFillStepBackward 
                        onClick={onPlayPrevious} 
                        size={24} 
                        className='text-neutral-400 cursor-pointer hover:text-white transition' 
                    />
                    <div onClick={handlePlay} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
                        <Icon size={30} className='text-black' />
                    </div>
                    <AiFillStepForward 
                        onClick={onPlayNext} 
                        size={24} 
                        className='text-neutral-400 cursor-pointer hover:text-white transition' 
                    />
                </div>
                
                {/* Desktop Controls */}
                <div className="hidden h-full md:flex flex-col justify-center items-center w-full max-w-[722px] gap-y-2">
                    {/* Control buttons */}
                    <div className="flex items-center gap-x-6">
                        <AiFillStepBackward 
                            onClick={onPlayPrevious} 
                            size={30} 
                            className='text-neutral-400 cursor-pointer hover:text-white transition' 
                        />
                        <div 
                            onClick={handlePlay} 
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer hover:bg-neutral-800/50 transition"
                        >
                            <Icon size={30} className='text-black' />
                        </div>
                        <AiFillStepForward 
                            onClick={onPlayNext} 
                            size={30} 
                            className='text-neutral-400 cursor-pointer hover:text-white transition' 
                        />
                    </div>
                    
                    {/* Desktop Progress bar */}
                    <div className="w-full max-w-md">
                        <ProgressBar 
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={handleSeek}
                        />
                    </div>
                </div>
                
                {/* Volume Controls */}
                <div className="hidden md:flex w-full justify-end pr-2">
                    <div className="flex items-center gap-x-2 w-[120px]">
                        <VolumeIcon 
                            onClick={toggleMute} 
                            className='cursor-pointer hover:opacity-75 transition' 
                            size={34} 
                        />
                        <Slider value={volume} onChange={(value) => setVolume(value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerContent