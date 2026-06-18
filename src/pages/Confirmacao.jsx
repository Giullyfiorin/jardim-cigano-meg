import { Link, useLocation } from 'react-router-dom'

function Confirmacao() {
  const location = useLocation()
  const dados = location.state

  const mensagemWhatsApp =
    'Olá Meg, enviei meu agendamento pelo site e gostaria de enviar o comprovante do pagamento.'

  return (
    <div className="pagina-agendamento">
      <div className="topo-servicos">
        <h2>Agendamento solicitado</h2>
        <p>Jardim Cigano da Meg</p>
      </div>

      <section className="resumo-servico confirmacao-card">
        <h3>🌙 Sua consulta foi solicitada com sucesso!</h3>

        {dados && (
          <div className="card-pagamento">
            <h3>Resumo da consulta</h3>

            <p>
              <strong>Serviço:</strong> {dados.servico}
            </p>

            <p>
              <strong>Valor:</strong> R$ {dados.preco}
            </p>

            <p>
              <strong>Duração:</strong> {dados.duracao}
            </p>

            <p>
              <strong>Data:</strong> {dados.dia}/06/2026
            </p>

            <p>
              <strong>Horário:</strong> {dados.horario}
            </p>
          </div>
        )}

        <p>
          Os atendimentos são feitos por mensagem após confirmação do pagamento.
        </p>

        <p>
          <strong>Envio:</strong> fotos das tiragens e áudios explicativos.
        </p>

        <div className="card-pagamento">
          <h3>Forma de pagamento</h3>

          <p>
            <strong>Banco:</strong> Nubank
          </p>

          <p>
            <strong>Pix:</strong> jardimciganodameg@gmail.com
          </p>
        </div>

        <a
          href={`https://wa.me/5541984682766?text=${encodeURIComponent(mensagemWhatsApp)}`}
          target="_blank"
          rel="noreferrer"
          className="link-servico"
        >
          <button className="botao-whatsapp">
            Enviar comprovante pelo WhatsApp
          </button>
        </a>

        <Link to="/" className="link-servico">
          <button className="botao-agendar">
            Voltar para o início
          </button>
        </Link>
      </section>
    </div>
  )
}

export default Confirmacao