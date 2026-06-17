import { Link } from 'react-router-dom'

function Botao(props) {

  const linkExterno =
    props.link.startsWith('http')

  if (linkExterno) {
    return (
      <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
      >
        <button className={props.classe}>
          {props.texto}
        </button>
      </a>
    )
  }

  return (
    <Link to={props.link}>
      <button className={props.classe}>
        {props.texto}
      </button>
    </Link>
  )
}

export default Botao