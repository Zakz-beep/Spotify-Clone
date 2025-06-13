"use client"
import React, { useState } from 'react'
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import { title } from 'process'
import Input from './Input'
import Button from './Button'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import uniqid from "uniqid"
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

const UploadModal = () => {
    const [isLoading,setIsLoading] = useState(false)
    const uploadModal = useUploadModal()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const {user} = useUser()
    const {register,handleSubmit,reset} = useForm<FieldValues>({
        defaultValues:{
            author:"",
            title:"",
            song:null,
            image:null
        }
    })

    const onChange = (open: boolean) =>{if(!open){
        reset()
        uploadModal.onClose()} }
    const onSubmit:SubmitHandler<FieldValues> = async(values) =>{
        try{
            setIsLoading(true)
            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]
            if(!imageFile || !songFile || !user){
                toast.error('missing fields')
                return
            }
            const uniqueId = uniqid()
            //upload
            const {data:songData,error:songError} = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueId}`,songFile,{cacheControl:'3600',upsert:false})
            if(songError){
                setIsLoading(false)
                return toast.error(songError.message)

            }
            const {data:imageData,error:imageError} = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueId}`,imageFile,{cacheControl:'3600',upsert:false})
            if(imageError){
                setIsLoading(false)
                return toast.error(imageError.message)

            }
            const {
                error:supabaseError
            } = await supabaseClient.from('songs').insert({
                user_id:user.id,
                title:values.title,
                author:values.author,
                image_path:imageData.path,
                song_path:songData.path,
                
              
            })
            if(supabaseError){
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }
            router.refresh()
            setIsLoading(false)
            toast.success('Song uploaded successfully')
            uploadModal.onClose()


        }catch(error){
            console.log(error)
            toast.error('something went wrong')
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <Modal title='Upload a song' description='Upload a song to the server' isOpen={uploadModal.isOpen} onChange={onChange}>
        <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
    <Input id='title' disabled={isLoading} {...register('title', {required:true})} placeholder='song title' />
       <Input id='author' disabled={isLoading} {...register('author', {required:true})} placeholder='author' />
       <div className="pb-1">
        Select Song
           <Input id='song' type='file' disabled={isLoading} {...register('song', {required:true})} accept='.mp3' />
       </div>
        <div className="pb-1">
        Select an Image
           <Input id='image' type='file' disabled={isLoading} {...register('image', {required:true})} accept='image/*' />
       </div>
       <Button disabled={isLoading} type='submit'>
    create
       </Button>
        </form>
    </Modal>
  )
}

export default UploadModal