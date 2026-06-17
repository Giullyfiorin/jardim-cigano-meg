function Confirmacao() {
  return (
    <div className="pagina-agendamento">
      <div className="topo-servicos">
        <h2>Agendamento confirmado</h2>
        <p>Jardim Cigano da Meg</p>
      </div>

      <section className="resumo-servico confirmacao-card">
        <h3>🌙 Consulta agendada com sucesso!</h3>

        <p>
          A Meg entrará em contato para confirmar os detalhes do atendimento.
        </p>

        <button className="botao-agendar">
          Voltar para o início
        </button>
      </section>
    </div>
  )
}

export default Confirmacao