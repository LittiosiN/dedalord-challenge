import { useState } from 'react'
import LoginForm from '../components/form/LoginForm'
import Logo from '../components/Logo'

function AuthPage() {
  const [showRegister, setShowRegister] = useState<boolean>(false)
  return (
    <>
      <div className='w-screen h-screen pt-24 bg-gray-200 items-center flex flex-col align-top'>
        <Logo />
        <section>
          <>
            {showRegister ? (
              <div>Soy form de registro</div>
            ) : (
              <LoginForm />
            )}
          </>
        </section>
      </div>
    </>
  )
}

export default AuthPage
