'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal'

import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const uploadModal = useUploadModal();
  const {user} = useUser();
  const supabaseClient = useSupabaseClient();

  const router = useRouter();

  const {register, reset, handleSubmit} = useForm<FieldValues>({
    defaultValues: {
        singer: '',
        title: '',
        song: '',
        image: null
    },
  });

  const onChange = (open: boolean) => {
    if(!open){
        reset();
        uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // Upload to supabase
    try {
        setIsLoading(true);

        const imageFile = values.image?.[0];
        const songFile = values.song?.[0];

        if(!imageFile || !songFile || !user){
            toast.error("Missing Fields")
            return;
        }

        const uniqueId = uniqid();

        const {data:songData,  
               error:songError
              } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueId}`, songFile, {
                cacheControl: '3600',
                upsert: false
              });
        
        if(songError){
            setIsLoading(false)
            return toast.error(songError.message)
        }

        const {data:imageData,  
               error:imageError
              } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueId}`, imageFile, {
                cacheControl: '3600',
                upsert: false
              });
        
        if(imageError){
            setIsLoading(false)
            return toast.error(`sa Image ni ${imageError.message}`)
        }
        
        const {
            error: supabaseError
        } = await supabaseClient.from('songs')
                                .insert({
                                    user_id: user.id,
                                    title: values.title,
                                    singer: values.singer,
                                    img_url: imageData.path,
                                    song_url: songData.path
                                }
        )

        if(supabaseError){
            setIsLoading(false);
            return toast.error(supabaseError.message)
        }

        router.refresh();
        toast.success('Song successfully uploaded!');
        setIsLoading(false);
        uploadModal.onClose();
        reset();
    } catch (error) {
        toast.error("Error when uploading");
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <Modal description='Upload your favorite songs!' title='Upload a song' isOpen={uploadModal.isOpen} onChange={onChange}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
            <Input
                id="title"
                disabled={isLoading}
                {...register('title', {required: true})}
                placeholder="Song Title"
            />
            <Input
                id="singer"
                disabled={isLoading}
                {...register('singer', {required: true})}
                placeholder="Name of singer"
            />
            <div>
                <div className='pb-1'>
                    Select a song file
                    <Input
                        id="song"
                        type='file'
                        disabled={isLoading}
                        accept='.mp3'
                        {...register('song', {required: true})}
                    />
                </div>
                <div className='pb-1'>
                    Select image
                    <Input
                        id="image"
                        type='file'
                        disabled={isLoading}
                        accept='image/*'
                        {...register('image', {required: true})}
                    />
                </div>
            </div>
            <Button disabled={isLoading} type='submit' className='cursor-pointer'>
                Create
            </Button>
        </form>
    </Modal>
  )
}

export default UploadModal