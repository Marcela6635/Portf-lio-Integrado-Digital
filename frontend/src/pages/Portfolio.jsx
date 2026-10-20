import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function Portfolio() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarProjetos() {
      try {
        const resposta = await fetch(
          "http://localhost:3333/registros"
        );

        if (!resposta.ok) {
          throw new Error("Erro ao carregar os projetos.");
        }

        const dados = await resposta.json();

        const projetosDestaque = dados.filter(
          (registro) => registro.destaque === true
        );

        setProjetos(projetosDestaque);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarProjetos();
  }, []);

  return (
    <main className="pagina-portfolio">
      <div className="portfolio-container">
        <BotaoVoltar destino="/" />
        
          <h1>Meu Portfólio</h1>
          <p>
            Conheça alguns dos projetos e trabalhos que
            marcaram minha trajetória acadêmica e meu
            desenvolvimento na área de tecnologia.
          </p>
        

        <h2>Projetos em destaque</h2>

        {carregando && <p>Carregando projetos...</p>}

        {erro && <p>{erro}</p>}

        {!carregando && !erro && projetos.length === 0 && (
          <p>Nenhum projeto em destaque no momento.</p>
        )}

        <div className="portfolio-grid">
          {projetos.map((projeto) => (
            <article className="portfolio-card" key={projeto.id}>
              <div className="portfolio-card-conteudo">
                <span className="portfolio-categoria">
                  PROJETO ACADÊMICO
                </span>

                <h3>{projeto.titulo}</h3>

                <p>{projeto.conteudo}</p>

                <Link to={`/registro/${projeto.id}`}>
                  Ver projeto →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="portfolio-trajetoria">
          <h2>Explore minha trajetória</h2>

          <div className="portfolio-links">
            <Link to="/sesi">Explorar SESI →</Link>
            <Link to="/senai">Explorar SENAI →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Portfolio;