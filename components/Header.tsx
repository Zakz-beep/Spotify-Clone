"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import {  BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
interface HeaderProps {
    children:React.ReactNode
    className?:string
}
const Header: React.FC<HeaderProps> = ({children,className}) => {
    const router = useRouter();
    const authModal = useAuthModal()
    const supabaseClient = useSupabaseClient()
    const {user} = useUser();
    const handleLogout = async() => {
       const {error} = await supabaseClient.auth.signOut()
       router.refresh();
       if(error){
        toast.error(error.message)
       }else{
        toast.success('Logged out')
       }
    }
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`,className)}>
        <div className="w-full mb-4 flex items-center justify-between">
            <div className="hidden md:flex gap-x-2 items-center">
                <button onClick={()=>router.back()} className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                    <RxCaretLeft size={35} />
                    
                </button>
                <button onClick={()=>router.forward()} className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                    <RxCaretRight size={35} />
                    
                </button>
            </div>
          <div className="flex md:hidden gap-x-2 items-center">
  <button
    onClick={() => router.push('/')}
    className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75"
  >
    <HiHome className="text-black" size={20} />
  </button>
  <button
    onClick={() => router.push('/search')}
    className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75"
  >
    <BiSearch className="text-black" size={20} />
  </button>
</div>

           <div className="flex gap-x-2 justify-between items-center">
  {user ? (
    <div className="flex gap-x-4 items-center">
      <Button onClick={handleLogout} className='bg-white px-6 py-2'>
        Logout
      </Button>
      <Button onClick={() => router.push('/account')} className='bg-white'>
        <FaUserAlt />
      </Button>
    </div>
  ) : (
    <>
      <div>
        <Button
          className='bg-transparent text-neutral-300 font-medium'
          onClick={() => authModal.onOpen()}
        >
          Sign Up
        </Button>
      </div>
      <div>
        <Button
          className='bg-white px-6 py-2'
          onClick={() => authModal.onOpen()}
        >
          Log In
        </Button>
      </div>
    </>
  )}
</div>


            
        </div>
        {children}
    </div>
  )
}
export default Header

