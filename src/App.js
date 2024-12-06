import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import GameHub from './components/GameHub';
import CookieClicker from './components/CookieClicker';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gameHub" element={<GameHub />} />
          <Route path="cookieClicker" element={<CookieClicker/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
