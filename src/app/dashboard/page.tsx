import React from 'react'
import { SignOutButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'

async function DashboardPage() {
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress

  return (
    <div>
      <div>DashboardPage1</div>
      {/* <div>Logged in as: {userEmail}</div>
      <SignOutButton>
        <Button variant="outline">Sign Out</Button>
      </SignOutButton> */}
    </div>
  )
}

export default DashboardPage