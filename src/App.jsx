import { useState } from 'react'
import XStateCountry from './xStateComponents/getAllCountires.component'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <XStateCountry/>
    </div>
     
  )
}

export default App
