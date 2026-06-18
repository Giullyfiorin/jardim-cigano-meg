import Botao from '../components/Botao'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaDoorOpen } from 'react-icons/fa'

function Home() {
  return (
    <div className="home">
      <div className="estrelas"></div>

      <div className="lua-grande">
        🌙
      </div>

      <h1 className="titulo">
        Jardim Cigano da Meg
      </h1>

      <p className="slogan">
        ✨ Agende sua consulta e descubra o que sua alma precisa saber ✨
      </p>

      <p className="descricao">
        Consultas espirituais e baralho cigano.
      </p>

      <div className="botoes">
        <Botao
          texto="Agendar Consulta"
          classe="botao-agendar"
          link="/servicos"
        />

        <Botao
          texto="WhatsApp"
          classe="botao-whatsapp"
          link="https://wa.me/5541984682766?text=Olá%20Meg,%20gostaria%20de%20mais%20informações."
        />
      </div>

      <div className="redes-sociais">
        <a
          href="https://www.instagram.com/margarida.leal10?igsh=MTlqc3psZWVudTg2cA=="
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.tiktok.com/@megdoaxe?_r=1&_t=ZS-97HA315bIKP"
          target="_blank"
          rel="noreferrer"
        >
          <FaTiktok />
        </a>

        <Link
            to="/admin-login"
            className="admin-icone"
          >
            <FaDoorOpen />
        </Link>

      </div>
    </div>
    
    
  )
}



export default Home