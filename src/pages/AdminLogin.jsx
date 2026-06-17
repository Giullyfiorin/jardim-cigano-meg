import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  function entrar() {
    if (senha === 'meg123') {
      localStorage.setItem('adminLogado', 'true')
      navigate('/admin')
    } else {
      alert('Senha incorreta')
    }
  }

  return (
    <div className="login-admin">
      <div className="estrelas"></div>

      <div className="card-login">
        <div className="lua-login">🌙</div>

        <h1>Painel da Meg</h1>

        <p>
          Acesso restrito aos agendamentos
        </p>

        <input
          type="password"
          placeholder="Digite a senha"
          className="campo-formulario"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="botao-agendar"
          onClick={entrar}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}

export default AdminLogin