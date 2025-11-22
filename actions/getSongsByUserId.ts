import { Song } from "@/types";
import { createSupabaseServerClient } from "@/utils/supabase/server";

const getSongsByUserId = async (): Promise<Song[]> => {
   const supabase = await createSupabaseServerClient();

   const { data: userData, error: sessionErr } = await supabase.auth.getUser(); 

   if (sessionErr) {
    console.log(sessionErr.code);
    return [];
   }

   // Return early if no session exists
   if (!userData.user) {
    return [];
   }

   const {
    data,
    error
   } = await supabase
        .from('songs')
        .select()
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false })
   
   if (error) {
    console.log(error.code);
    return [];
   }

   return (data as Song[]) || [];
}

export default getSongsByUserId;