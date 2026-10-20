import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="apresentacao">
      <div className="apresentacao-container">

        <div className="apresentacao-texto">
          <span className="apresentacao-etiqueta">
            SEJA BEM-VINDO(A) AO MEU PORTFÓLIO
          </span>

          <h1>
            Olá, eu sou
            <span>Marcela Souza Bastos</span>
          </h1>

          <p>
            Sou estudante do 3º ano do Ensino Médio e do curso
            Técnico em Informática, integrando minha formação
            acadêmica e técnica do Sesi e do Senai.
            Neste espaço, compartilho minha trajetória,
            os projetos que desenvolvi, as experiências que vivi
            e os conhecimentos que adquiri ao longo dessa jornada.
          </p>

          <a href="#meu-portfolio" className="botao-apresentacao">
            Conheça meu portfólio <span>→</span>
          </a>
        </div>

        <div className="apresentacao-foto">
          <div className="foto-moldura">
          <img
              src="/foto-perfil.jpeg"
              alt="Foto de apresentação"
            />
          </div>
        </div>

      </div>
    
      <section className="portfolio" id="meu-portfolio">
        <h2>Meu Portfólio Integrado</h2>
        <p>Escolha qual parte da minha trajetória deseja explorar:</p>

        <div className="opcoes">
          <Link to="/sesi" className="cartao cartao-sesi">
            <div className="cartao-conteudo">
              <h3>Portfólio Sesi</h3>
              <p>Áreas do conhecimento do Ensino Médio</p>

              <div className="acessar-cartao">
                <span className="seta-cartao">→</span>
                <span>Acessar portfólio Sesi</span>
              </div>
            </div>
          </Link>

          <Link to="/senai" className="cartao cartao-senai">
            <div className="cartao-conteudo">
              <h3>Portfólio Senai</h3>
              <p>Unidades curriculares do Curso Técnico em Informática</p>

              <div className="acessar-cartao">
                <span className="seta-cartao">→</span>
                <span>Acessar portfólio Senai</span>
              </div>
            </div>
          </Link>
      </div>
      </section>
    </section>
    </main>
  );
}

export default Home;