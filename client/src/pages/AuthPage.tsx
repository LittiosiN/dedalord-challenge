import { useState } from 'react'
import LoginForm from '../components/form/LoginForm'
import Logo from '../components/Logo'

function AuthPage() {
  const [showRegister, setShowRegister] = useState<boolean>(false)
  return (
    <>
      <main className='w-screen h-screen pt-24 bg-gray-200 items-center flex flex-col align-top'>
        <Logo />
        <section>
          <>
            {showRegister ? (
              <div>Soy form de registro</div>
            ) : (
              <LoginForm />
            )}
            <div 
              className='text-sm mt-2 text-center'
            >
              or go to <span 
              className='font-semibold cursor-pointer'
              onClick={() => setShowRegister(!showRegister)}>{`${showRegister ? 'Register' : 'Login'}`}</span>
            </div>
          </>
        </section>
      </main>
    </>
  )
}

export default AuthPage
