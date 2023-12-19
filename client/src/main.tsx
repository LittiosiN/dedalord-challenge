import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom"
import AuthPage from './pages/AuthPage'
import ChatPage from './pages/ChatPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { User } from './types/Auth'


const Main = () => {
  const [user, setUser] = useState<User|null>(null)

  return(
      <>
        <HashRouter>
          <Routes>
            <Route path='/' element={ <AuthPage setUser={setUser}/> } />
            <Route path='/chats' element={ <ChatPage user={user}/> } />
          </Routes>
        </HashRouter>
        <ToastContainer />
      </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />)
