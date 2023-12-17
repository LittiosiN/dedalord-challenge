import chatLogo from '/chat-logo.svg'

const Logo = () => {
  return (
    <div className='flex flex-col items-center'>
      <img src={chatLogo} className="h-64" alt="logo" />
      <h1 className="text-3xl font-bold">Messaging App</h1>
    </div>
  )
}

export default Logo