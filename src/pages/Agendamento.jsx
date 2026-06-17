import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'

function converterHorarioParaMinutos(horario) {
  const [hora, minuto] = horario.split(':').map(Number)
  return hora * 60 + minuto
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

function horarioEstaOcupado(
  horario,
  horariosOcupados,
  duracaoServico
) {
  const novoInicio = converterHorarioParaMinutos(horario)

  const novoFim =
    novoInicio +
    converterDuracaoParaMinutos(duracaoServico)

  return horariosOcupados.some((agendamento) => {
    if (!agendamento.inicio || !agendamento.fim) {
      return false
    }

    const inicioExistente =
      converterHorarioParaMinutos(
        agendamento.inicio
      )

    const fimExistente =
      converterHorarioParaMinutos(
        agendamento.fim
      )

    return (
      novoInicio < fimExistente &&
      novoFim > inicioExistente
    )
  })
}

function Agendamento() {
  const location = useLocation()
  const servico = location.state

  const [diaSelecionado, setDiaSelecionado] = useState('')
  const [horarioSelecionado, setHorarioSelecionado] = useState('')
  const [horariosOcupados, setHorariosOcupados] = useState([])

  const dias = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30
  ]

  const horarios = [
    '09:00', '09:30', '10:00',
    '14:10', '14:40', '15:10',
    '15:40', '17:15', '17:45',
    '18:15', '18:45', '19:15',
    '19:45'
  ]

  const hoje = new Date()
  const diaAtual = hoje.getDate()
  const mesAtual = hoje.getMonth() + 1
  const anoAtual = hoje.getFullYear()

  const mesAgenda = 6
  const anoAgenda = 2026

  useEffect(() => {
    async function buscarHorariosOcupados() {
      if (!diaSelecionado) return

      const { data, error } = await supabase
        .from('agendamentos')
        .select('inicio, fim')
        .eq('dia', String(diaSelecionado))

      if (error) {
        console.log(error)
        return
      }

      setHorariosOcupados(data)
      setHorarioSelecionado('')
    }

    buscarHorariosOcupados()
  }, [diaSelecionado])

  if (!servico) {
    return (
      <div className="pagina-agendamento">
        <div className="topo-servicos">
          <h2>Ops!</h2>
          <p>Jardim Cigano da Meg</p>
        </div>

        <section className="resumo-servico">
          <h3>Nenhum serviço selecionado</h3>
          <p>Volte e escolha um serviço para continuar.</p>
        </section>

        <Link to="/servicos" className="link-servico">
          <button className="botao-agendar">
            Escolher serviço
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="pagina-agendamento">
      <div className="topo-servicos">
        <h2>Data e hora</h2>
        <p>Jardim Cigano da Meg</p>
      </div>

      <section className="resumo-servico">
        <p>Serviços à domicílio:</p>
        <h3>{servico.nome}</h3>
        <span>de R$ {servico.preco}, {servico.duracao}</span>
      </section>

      <section className="calendario-card">
        <h2>Junho, 2026</h2>

        <div className="dias-semana">
          <span>Dom.</span>
          <span>Seg.</span>
          <span>Ter.</span>
          <span>Qua.</span>
          <span>Qui.</span>
          <span>Sex.</span>
          <span>Sáb.</span>
        </div>

        <div className="calendario-grid">
          {dias.map((dia) => {
            const diaPassado =
              anoAgenda < anoAtual ||
              (anoAgenda === anoAtual && mesAgenda < mesAtual) ||
              (anoAgenda === anoAtual &&
                mesAgenda === mesAtual &&
                dia < diaAtual)

            return (
              <button
                key={dia}
                disabled={diaPassado}
                onClick={() => setDiaSelecionado(dia)}
                className={
                  diaPassado
                    ? 'dia indisponivel'
                    : diaSelecionado === dia
                    ? 'dia ativo'
                    : 'dia disponivel'
                }
              >
                {dia}
              </button>
            )
          })}
        </div>
      </section>

      {diaSelecionado && (
        <p className="data-selecionada">
          Dia selecionado: {diaSelecionado} de junho de 2026
        </p>
      )}

      {diaSelecionado && (
        <div className="horarios">
          {horarios.map((horario) => {
            const horarioOcupado = horarioEstaOcupado(
               horario,
               horariosOcupados,
               servico.duracao)

            return (
              <button
                key={horario}
                disabled={horarioOcupado}
                onClick={() => setHorarioSelecionado(horario)}
                className={
                  horarioOcupado
                    ? 'botao-horario horario-indisponivel'
                    : horarioSelecionado === horario
                    ? 'botao-horario horario-ativo'
                    : 'botao-horario'
                }
              >
                {horario}
              </button>
            )
          })}
        </div>
      )}

      {diaSelecionado && horarioSelecionado && (
        <Link
          to="/contato"
          state={{
            servico: servico,
            dia: diaSelecionado,
            horario: horarioSelecionado
          }}
          className="link-servico"
        >
          <button className="botao-agendar">
            Continuar
          </button>
        </Link>
      )}
    </div>
  )
}

export default Agendamento