import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Add from './containers/Add'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Add' element={<Add />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
