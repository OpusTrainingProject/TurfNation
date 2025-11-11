import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'


function App() {

  return (
    <>
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
    </Routes>
    </>
  )
}

export default App
