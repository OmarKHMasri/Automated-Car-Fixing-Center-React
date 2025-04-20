import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import FloatingWindow from './components/FloatingWindow'
import {QueryClientProvider , QueryClient} from '@tanstack/react-query'

function App() {
  const [isFloating, setIsFloating] = useState(false)
  const [btnId, setBtnId] = useState()

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar setIsFloating={setIsFloating} setBtnId={setBtnId}/>
      {isFloating && <FloatingWindow btnId={btnId}/>}

    </QueryClientProvider>
  )
}

export default App
