import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="apresentacao">
        <h1>Marcela Souza Bastos</h1>

        <p>Estudante do Ensino Médio e Técnico em Informática.</p>

        <p>
          Bem-vindo ao MARÉ! Aqui compartilho minhas experiências,
          atividades, projetos e aprendizados ao longo da minha
          trajetória escolar.
        </p>
      </section>

      <section className="portfolio">
        <h2>Explore meu portfólio</h2>

        <div className="opcoes">
          <div className="cartao">
            <h3>SESI</h3>
            <p>Ensino Médio</p>
            <Link to="/sesi" className="botao">Explorar SESI</Link>
          </div>

          <div className="cartao">
            <h3>SENAI</h3>
            <p>Técnico em Informática</p>
            <Link to="/senai" className="botao">Explorar SENAI</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;