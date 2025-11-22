'use client';
import SongItem from '@/components/SongItem';
import { Song } from '@/types';
import React from 'react'

type SongsPageProps = {
    songs: Song[];
}

const SongsPage: React.FC<SongsPageProps> = (
    {songs}
) => {
  if(songs.length === 0){
    return <div>No Songs Available!</div>
  }
  return (
    <div className='
        grid grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8
        gap-4
        mt-4'
    >
        {songs.map((song:Song) => <SongItem key={song.song_url} song={song} onClick={()=>{}}/>)}
    </div>
  )
}

export default SongsPage