import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <div className="page" style={{ background: 'black', color: 'white', fontFamily: 'monospace' }}>
      {!isLoggedIn ? (
        <div className="login-card">
          <h2>LOGIN</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="login-card">
          <h2>QUESTIONS</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>Question 1</li>
            <li>Question 2</li>
            <li>Question 3</li>
            <li>Question 4</li>
            <li>Question 5</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
