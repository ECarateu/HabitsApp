import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './styles/global.css'
import { Habit } from './components/Habit'

function App() {
  return (
    <div>
    <Habit completed={5}/>
    <Habit completed={10} />
  

    </div>
   
  )
}

export default App
