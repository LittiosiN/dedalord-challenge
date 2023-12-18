import { useState } from 'react'
import LoginForm from '../components/form/LoginForm'
import Logo from '../components/Logo'
import RegisterForm from '../components/form/RegisterForm'
import { User } from '../types/Auth'

interface AuthPageProps {
  setUser: (user:User|null) => void
}

const AuthPage:React.FC<AuthPageProps> = ({setUser}) => {
  const [showRegister, setShowRegister] = useState<boolean>(false)
  return (
    <>
      <main className='w-screen h-screen pt-24 bg-gray-200 items-center flex flex-col align-top'>
        <Logo />
        <section>
          <>
            {showRegister ? (
              <RegisterForm goToLogin={() => setShowRegister(false)}/>
            ) : (
              <LoginForm setUser={setUser} />
            )}
            <div 
              className='text-sm mt-2 text-center'
            >
              or go to <span 
              className='font-semibold cursor-pointer'
              onClick={() => setShowRegister(!showRegister)}>{`${showRegister ? 'Login' : 'Register'}`}</span>
            </div>
          </>
        </section>
      </main>
    </>
  )
}

export default AuthPage
