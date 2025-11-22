'use client';

import PlayButton from "@/components/PlayButton";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { useState } from "react";

type SongItemProps = {
    song: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
    song,
    onClick
}) => {
    const imageUrl = useLoadImage(song);
    const [imageError, setImageError] = useState(false);

    return (
        <div
            onClick={() => onClick(song.id)}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-500/10
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-3"
        >
            <div className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden
                pt-4
            "
            >
                <Image 
                    className="object-cover" 
                    src={imageError || !imageUrl ? '/images/liked.png' : imageUrl} 
                    fill 
                    alt={`Cover for ${song.title}`}
                    onError={() => setImageError(true)}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            {/* Add song info */}
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="font-semibold truncate w-full">
                    {song.title}
                </p>
                <p className="text-neutral-400 text-sm pb-4 w-full truncate">
                    By {song.singer}
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton/>
            </div>
        </div>
    )
}

export default SongItem;