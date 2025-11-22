import { Song } from "@/types";
import { createSupabaseClient } from "@/utils/supabase/client";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Song | null) => {
    const supabaseClient = createSupabaseClient();

    if (!song || !song.img_url) {
        return null;
    }

    try {
        const { data: imageData } = supabaseClient.storage
            .from('images')
            .getPublicUrl(song.img_url);
        
        return imageData?.publicUrl || null;
    } catch (error) {
        console.error('Error loading image:', error);
        return null;
    }
}

export default useLoadImage;