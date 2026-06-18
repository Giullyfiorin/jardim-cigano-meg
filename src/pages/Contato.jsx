import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

function converterHorarioParaMinutos(horario) {
  const [hora, minuto] = horario.split(':').map(Number)
  return hora * 60 + minuto
}

function converterMinutosParaHorario(totalMinutos) {
  const hora = Math.floor(totalMinutos / 60)
  const minuto = totalMinutos % 60

  return `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`
}

function converterDuracaoParaMinutos(duracao) {
  if (duracao === '5 min') return 5
  if (duracao === '10 min') return 10
  if (duracao === '20 min') return 20
  if (duracao === '35 min') return 35
  if (duracao === '50 min') return 50
  if (duracao === '1 h') return 60
  if (duracao === '1 h 30 min') return 90

  return 30
}

function Contato() {
  const location = useLocation()
  const navigate = useNavigate()

  const dadosAgendamento = location.state

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [comentario, setComentario] = useState('')

  async function concluirAgendamento() {
  const inicio = dadosAgendamento.horario

  const inicioEmMinutos = converterHorarioParaMinutos(inicio)

  const duracaoEmMinutos = converterDuracaoParaMinutos(
    dadosAgendamento.servico.duracao
  )

  const fim = converterMinutosParaHorario(
    inicioEmMinutos + duracaoEmMinutos
  )

  const { error } = await supabase
    .from('agendamentos')
    .insert({
      nome: nome,
      sobrenome: sobrenome,
      telefone: telefone,
      comentario: comentario,
      servico: dadosAgendamento.servico.nome,
      preco: dadosAgendamento.servico.preco,
      duracao: dadosAgendamento.servico.duracao,
      dia: String(dadosAgendamento.dia),
      horario: dadosAgendamento.horario,
      inicio: inicio,
      fim: fim,
      data_completa: dadosAgendamento.dataCompleta,
    })

  if (error) {
    alert(error.message)
    console.log(error)
    return
  }

  navigate('/confirmacao', {
  state: {
    servico: dadosAgendamento.servico.nome,
    preco: dadosAgendamento.servico.preco,
    duracao: dadosAgendamento.servico.duracao,
    dia: dadosAgendamento.dia,
    horario: dadosAgendamento.horario,
    dataCompleta: dadosAgendamento.dataCompleta,
  }})
}

  if (!dadosAgendamento) {
    return (
      <div className="pagina-agendamento">
        <div className="topo-servicos">
          <h2>Ops!</h2>
          <p>Escolha um serviço antes de continuar.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pagina-agendamento">
      <div className="topo-servicos">
        <h2>Informações de contato</h2>
        <p>Jardim Cigano da Meg</p>
      </div>

      <section className="resumo-servico">
        <h3>Preencha seus dados</h3>

        <input
          type="text"
          placeholder="Nome"
          className="campo-formulario"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Sobrenome"
          className="campo-formulario"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Telefone"
          className="campo-formulario"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <textarea
          placeholder="Comentário"
          className="campo-formulario"
          rows="4"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>

        <button
          className="botao-agendar"
          onClick={concluirAgendamento}
        >
          Concluir Agendamento
        </button>
      </section>
    </div>
  )
}

export default Contato