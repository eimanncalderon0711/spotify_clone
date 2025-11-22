import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { ListMusic, Plus } from "lucide-react";
import React from "react";

type SongLibraryProps = {
  songs: Song[];
}

const SongLibrary: React.FC<SongLibraryProps> = ({
  songs
}) => {
  const authModal = useAuthModal();
  const {user} = useUser();
  const uploadModal = useUploadModal();

  const onClick = () => {
    //Handle Upload
    if(!user){
      return authModal.onOpen();
    }
    // Todo Check for subscription
    return uploadModal.onOpen();
  };

  // if(songs.length === 0){
  //   return <div>No Songs available</div>
  // }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Libary</p>
        </div>
        <Plus
          size={26}
          onClick={onClick}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        List of Songs
        {songs.map((song: Song) => <div key={song.title}>{song.title}</div>)}
      </div>
    </div>
  );
};

export default SongLibrary;
