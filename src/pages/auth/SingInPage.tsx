import { SignIn } from '@clerk/clerk-react'

function SingInPage() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-800 w-full h-screen'>
            <SignIn />
        </div>
    )
}

export default SingInPage
