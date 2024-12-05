import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import GameHub from './components/GameHub';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gameHub" element={<GameHub />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
