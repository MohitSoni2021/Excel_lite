"use client"

import React, { useEffect } from 'react'
import HeaderComponent from './_components/Header'
import HeroComponent from './_components/Hero'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const page = () => {
  const { user } = useKindeBrowserClient();

  useEffect(()=>{
    console.log(user);
  }, [user])

  return (
    <>
    
      <HeaderComponent />


      <HeroComponent />
    
    </>
  )
}

export default page
