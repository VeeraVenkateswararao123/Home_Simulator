
import React from 'react'
import LandingPage from './pages/LandingPage'
import { Routes,Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import Model1 from './components/Models/Model1'
import Model2 from './components/Models/Model2'
import Model3 from './components/Models/Model3'
import Model4 from './components/Models/Model4'
import Model5 from './components/Models/Model5'
import Model6 from './components/Models/Model6'
import Model7 from './components/Models/Model7'
import Model8 from './components/Models/Model8'
import Model9 from './components/Models/Model9'

const App = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/model1' element={<Model1 />}></Route>
        <Route path='/model2' element={<Model2 />}></Route>
        <Route path='/model3' element={<Model3 />}></Route>
        <Route path='/model4' element={<Model4 />}></Route>
        <Route path='/model5' element={<Model5 />}></Route>
        <Route path='/model6' element={<Model6 />}></Route>
        <Route path='/model7' element={<Model7 />}></Route>
        <Route path='/model8' element={<Model8 />}></Route>
        <Route path='/model9' element={<Model9 />}></Route>

        </Routes>
    </div>
  )
}

export default App