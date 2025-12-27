import Navbar from '@/components/Navbar'
import WelcomeSection from '@/components/dashboard/WelcomeSection'

async function DashboardPage() {
  // const user = await currentUser()
  // const userEmail = user?.emailAddresses[0]?.emailAddress

  return (
    <>
      <Navbar />

      <div className='max-w-7xl mx-auto px-6 py-8 pt-24'>
        <WelcomeSection />
      </div>
    </>
  )
}

export default DashboardPage