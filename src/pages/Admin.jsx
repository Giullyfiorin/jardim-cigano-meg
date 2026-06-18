import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

function Admin() {
  const [agendamentos, setAgendamentos] = useState([])
  const [busca, setBusca] = useState('')

  const navigate = useNavigate()
  const adminLogado = localStorage.getItem('adminLogado')

  if (!adminLogado) {
    return <Navigate to="/admin-login" />
  }

  async function buscarAgendamentos() {
    const { data, error } = await supabase
      .from('agendamentos')
      .select('*')
      .order('criado_em', { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setAgendamentos(data)
  }

  async function atualizarStatus(id, novoStatus) {
    const { error } = await supabase
      .from('agendamentos')
      .update({ status: novoStatus })
      .eq('id', id)

    if (error) {
      console.log(error)
      return
    }

    buscarAgendamentos()
  }

  async function excluirAgendamento(id) {
    const confirmar = confirm('Tem certeza que deseja excluir este agendamento?')

    if (!confirmar) return

    const { error } = await supabase
      .from('agendamentos')
      .delete()
      .eq('id', id)

    if (error) {
      console.log(error)
      alert('Erro ao excluir agendamento.')
      return
    }

    buscarAgendamentos()
  }

  function sair() {
    localStorage.removeItem('adminLogado')
    navigate('/admin-login')
  }

  useEffect(() => {
    buscarAgendamentos()
  }, [])

  function converterPreco(preco) {
    if (!preco) return 0

    return Number(
      String(preco)
        .replace('R$', '')
        .replace('.', '')
        .replace(',', '.')
        .trim()
    )
  }

  const agendamentosFiltrados = agendamentos.filter((item) => {
    const textoBusca = busca.toLowerCase()

    return (
      item.nome?.toLowerCase().includes(textoBusca) ||
      item.sobrenome?.toLowerCase().includes(textoBusca) ||
      item.telefone?.includes(busca) ||
      item.servico?.toLowerCase().includes(textoBusca) ||
      item.status?.toLowerCase().includes(textoBusca)
    )
  })

  const total = agendamentos.length

  const pendentes = agendamentos.filter(
    (item) => item.status === 'Pendente'
  ).length

  const confirmados = agendamentos.filter(
    (item) => item.status === 'Confirmado'
  ).length

  const cancelados = agendamentos.filter(
    (item) => item.status === 'Cancelado'
  ).length

  const faturamentoTotal = agendamentos
    .filter((item) => item.status === 'Confirmado')
    .reduce((total, item) => total + converterPreco(item.preco), 0)
  const mesAtual = new Date().getMonth() + 1
  const anoAtual = new Date().getFullYear()

  const faturamentoMesAtual = agendamentos
    .filter((item) => item.status === 'Confirmado')
    .filter((item) => {
    if (!item.data_completa) return false

    const partesData = item.data_completa.split('/')
    const mes = Number(partesData[1])
    const ano = Number(partesData[2])

    return mes === mesAtual && ano === anoAtual
  })
  .reduce((total, item) => total + converterPreco(item.preco), 0)
  return (
    <div className="pagina-admin">
      <div className="topo-servicos">
        <h2>Painel da Meg</h2>
        <p>Agendamentos recebidos</p>
      </div>

      <section className="dashboard-admin">
        <div className="dashboard-card">
          <h3>{total}</h3>
          <p>📅 Total Agendamentos</p>
        </div>

        <div className="dashboard-card">
          <h3>{pendentes}</h3>
          <p>🟡 Pendentes</p>
        </div>

        <div className="dashboard-card">
          <h3>{confirmados}</h3>
          <p>Confirmados</p>
        </div>

        <div className="dashboard-card">
          <h3>{cancelados}</h3>
          <p>🔴 Cancelados</p>
        </div>

        <div className="dashboard-card faturamento-card">
          <h3>
            R$ {faturamentoTotal.toFixed(2).replace('.', ',')}
          </h3>
          <p>💎 Faturamento total</p>
        </div>

        <div className="dashboard-card faturamento-card">
          <h3>
            R$ {faturamentoMesAtual.toFixed(2).replace('.', ',')}
          </h3>
          <p>💰 Faturamento do mês</p>
        </div>
      </section>

      <input
        type="text"
        placeholder="Buscar por nome, telefone, serviço ou status"
        className="campo-formulario"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <section className="lista-admin">
        {agendamentosFiltrados.map((item) => (
          <div className="card-admin" key={item.id}>
            <h3>
              {item.nome} {item.sobrenome}
            </h3>

            <p><strong>Telefone:</strong> {item.telefone}</p>
            <p><strong>Serviço:</strong> {item.servico}</p>
            <p><strong>Valor:</strong> R$ {item.preco}</p>
            <p><strong>Duração:</strong> {item.duracao}</p>
            <p><strong>Data:</strong> {item.data_completa || `${item.dia}/06/2026`}</p>
            <p><strong>Horário:</strong> {item.horario}</p>

            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge ${item.status?.toLowerCase()}`}>
                {item.status}
              </span>
            </p>

            {item.comentario && (
              <p><strong>Comentário:</strong> {item.comentario}</p>
            )}

            <div className="acoes-admin">
              <button
                className="btn-confirmar"
                onClick={() => atualizarStatus(item.id, 'Confirmado')}
              >
                Confirmar
              </button>

              <button
                className="btn-cancelar"
                onClick={() => atualizarStatus(item.id, 'Cancelado')}
              >
                Cancelar
              </button>

              <a
                href={`https://wa.me/55${item.telefone}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn-whatsapp">
                  WhatsApp
                </button>
              </a>

              <button
                className="btn-excluir"
                onClick={() => excluirAgendamento(item.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </section>

      <div className="container-sair">
        <button className="btn-sair" onClick={sair}>
          🚪 Sair do Painel
        </button>
      </div>
    </div>
  )
}

export default Admin