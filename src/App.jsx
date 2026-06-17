import { Routes, Route } from 'react-router-dom'
import './App.css'
import Agendamento from './pages/Agendamento'
import Contato from './pages/Contato'
import Home from './pages/Home'
import Servicos from './pages/Servicos'
import Confirmacao from './pages/Confirmacao'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/agendamento" element={<Agendamento />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/confirmacao" element={<Confirmacao />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  )
}

export default App