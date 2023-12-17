import chatLogo from '/chat-logo.svg'

function AuthPage() {
  return (
    <>
      <div className='w-screen h-screen bg-gray-200'>
        <img src={chatLogo} className="h-64" alt="logo" />
        <h1 className="text-3xl font-bold">Messaging App</h1>
        <>Forms goes here</>
      </div>
    </>
  )
}

export default AuthPage
