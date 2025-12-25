import React from 'react'
import { SignOutButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import Navbar from '@/components/Navbar'

async function DashboardPage() {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress

  return (
    <>
      <Navbar />
    </>
  )
}

export default DashboardPage