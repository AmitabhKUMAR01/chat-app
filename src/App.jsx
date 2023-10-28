import {Routes,Route} from 'react-router-dom';
import Todos from './pages/Todos';
import Chat from './pages/Chat';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import PrivateRoutes from './components/PrivateRoutes';
import Mythred from './pages/Mythred';
import Register from './pages/Register';
import OneToOneChat from './pages/OneToOneChat';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route element={<PrivateRoutes/>} >

      <Route path='/chat' element={<Chat/>} />
      <Route path='/todos' element={<Todos/>} />
      </Route>  
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/my' element={<Mythred/>} />
      <Route path='/one' element={<OneToOneChat/>} />
    </Routes>
  )
}

export default App