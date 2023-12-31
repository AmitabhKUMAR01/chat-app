import {Routes,Route} from 'react-router-dom';
import Todos from './pages/Todos';
import Chat from './pages/Chat';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import PrivateRoutes from './components/PrivateRoutes';

import Register from './pages/Register';
import OneToOneChat from './pages/OneToOneChat';
import GroupChat from './pages/GroupChat';

import UploadImages from './pages/UploadImages';
import LocalStorageHandle from './components/LocalStorage/LocalStorage';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route element={<PrivateRoutes/>} >

      <Route path='/chat' element={<Chat/>} />
      <Route path='/todos' element={<Todos/>} />
      <Route path='/group' element={<GroupChat/>}/>
      <Route path='/one' element={<OneToOneChat/>} />
      <Route path='/img' element={<UploadImages/>} />
      </Route>  
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/loc' element={<LocalStorageHandle/>} />
      
    </Routes>
  )
}

export default App