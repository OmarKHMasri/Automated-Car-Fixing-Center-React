import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import FloatingWindow from './components/FloatingWindow'

function App() {
  const [isFloating, setIsFloating] = useState(false)
  const [btnId, setBtnId] = useState()

  return (
    <>
      <Sidebar setIsFloating={setIsFloating} setBtnId={setBtnId}/>
      {isFloating && <FloatingWindow btnId={btnId}/>}

    </>
  )
}

export default App
