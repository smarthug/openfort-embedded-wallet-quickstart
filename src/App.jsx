import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import openfortLogo from '/openfort-logo.jpg'
import './App.css'

import { OpenfortProvider } from './hooks/useOpenfort';
import EIP1193MintButton from './components/EIP1193MintButton'
import GuestLoginButton from './components/GuestLoginButton'
import ShowEmbeddedState from './components/ShowEmbeddedState'
import LinkEmailPasswordButton from './components/LinkEmailPasswordButton'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  return (
    <>
      <OpenfortProvider>


        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://dashboard.openfort.xyz/" target="_blank">
            <img src={openfortLogo} className="logo openfort" alt="Openfort logo" />
          </a>
        </div>
        <h1>Vite + React + Openfort</h1>
        <div className="card">
          <ShowEmbeddedState />

        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >

          <GuestLoginButton />
          <LinkEmailPasswordButton />
        </div>
        <p>
          {message}
        </p>
        <EIP1193MintButton handleSetMessage={setMessage} />
      </OpenfortProvider>
    </>
  )
}

export default App
