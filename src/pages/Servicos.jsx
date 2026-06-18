import CardServico from '../components/CardServico'

function Servicos() {
  return (
    <div className="pagina-servicos">
      <div className="topo-servicos">
        <h2>Selecionar serviço</h2>
        <p>Jardim Cigano da Meg</p>
      </div>

      <section className="categoria-servicos">
        <h2>Perguntinhas</h2>

        <CardServico nome="1 hora de jogo" preco="100,00" duracao="1 h" />
        <CardServico nome="1 pergunta" preco="10,00" duracao="10 min" />
        <CardServico nome="10 perguntas" preco="60,00" duracao="50 min" />
        <CardServico nome="3 perguntas" preco="25,00" duracao="20 min" />
        <CardServico nome="5 perguntas" preco="40,00" duracao="35 min" />
        <CardServico nome="50 perguntas" preco="130,00" duracao="1 h 30 min" />
        <CardServico nome="Pergunta Sim ou Não" preco="5,00" duracao="5 min" />
      </section>
    </div>
  )
}

export default Servicos