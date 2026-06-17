import { Link } from 'react-router-dom'

function CardServico(props) {
  return (
    <Link
      to="/agendamento"
      state={{
        nome: props.nome,
        preco: props.preco,
        duracao: props.duracao
      }}
      className="link-servico"
    >
      <div className="servico-item">
        <div>
          <h3>{props.nome}</h3>
          <p>R$ {props.preco} • {props.duracao}</p>
        </div>

        <span className="bolinha-servico"></span>
      </div>
    </Link>
  )
}

export default CardServico