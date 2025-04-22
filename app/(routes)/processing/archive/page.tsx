"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.back()
    }, 1000)
  }, [router])

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-green-50">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-24 w-24 text-green-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M19.92 13.16a.375.375 0 010 .594l.088.139a.375.375 0 01-.59.594h-.026a.375.375 0 01-.56.011L12 6.278a.25.25 0 11-.45.412v9.678a.25.25 0 01-.45-.412l-8.781 2.897a.375.375 0 01-.594-.088l-.139-.088a.375.375 0 01.594-.59h.026a.375.375 0 01.56-.011l11.547-3.027a.25.25 0 01.45.412v-9.678a.25.25 0 01.45-.412L19.92 13.16z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Successfully Archived</h1>
        <p className="text-lg text-gray-700">
          The item has been successfully archived. You will be redirected to the dashboard in 3 seconds.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          If you don't want to wait, you can click{' '}
          <a className="text-green-600 underline" href="/dashboard">
            here
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default page

