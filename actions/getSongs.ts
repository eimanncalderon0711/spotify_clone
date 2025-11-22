import { Song } from "@/types";
import { createSupabaseServerClient } from "@/utils/supabase/server";

const getSongs = async (): Promise<Song[]> => {
    
    const supabase = await createSupabaseServerClient();

    const {data , error} = await supabase
        .from('songs')
        .select('*')
        .order('created_at', {ascending: false});

        if(error){
            console.log(error);
        }

        return (data as any) || [];
}

export default getSongs;