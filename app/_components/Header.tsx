import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { Pyramid } from 'lucide-react'
import React from 'react'

const HeaderComponent = () => {
  return (
    <>
    
    <header className="bg-white">
  <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
    <a className="text-teal-600 flex gap-2 text-2xl items-center" href="#" >
      <span className="sr-only">Home</span>
      <Pyramid />
      <span>Prisma</span>
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          {/* <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
          </li> */}

          
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <span
            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
             
          >
            <LoginLink>Login</LoginLink>
          </span>

          <span
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
          >
            <RegisterLink>Register</RegisterLink>
          </span>
        </div> 
        
      </div>
    </div>
  </div>
</header>
    
    </>
  )
}

export default HeaderComponent