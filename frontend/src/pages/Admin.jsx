import { Link, useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function Admin() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  if (!token) {
    return (
      <main className="portfolio">
        <h2>Acesso restrito</h2>
        <p>Você precisa fazer login para acessar esta página.</p>
        <Link to="/login">Fazer login</Link>
      </main>
    );
  }

  function sair() {
    sessionStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  }

  return (
    <main className="portfolio">
        <div className="page-back-row"><BotaoVoltar destino="/" /></div>
        <h1>Painel Administrativo — MARÉ</h1>

        <p>Gerencie os conteúdos do seu portfólio digital.</p>

        <div className="opcoes">
          <div className="cartao">
              <h3>Seções</h3>
              <p>Gerenciar seções do SESI e SENAI.</p>

              <div className="acoes-admin">
                  <Link to="/admin/secoes" className="botao">
                  Ver seções
                  </Link>

                  <Link to="/admin/secoes/nova" className="botao">
                  Cadastrar seção
                  </Link>
              </div>
          </div>

          <div className="cartao">
              <h3>Registros</h3>
              <p>Cadastrar e editar atividades e trabalhos.</p>

              <div className="acoes-admin">
                  <Link to="/admin/registros" className="botao">
                  Ver registros
                  </Link>

                  <Link to="/admin/registros/novo" className="botao">
                  Cadastrar registro
                  </Link>
              </div>

          </div>

          <div className="cartao">
            <h3>Materiais</h3>
            <p>Gerenciar imagens, vídeos e links.</p>

              <div className="acoes-admin">
                  <Link to="/admin/materiais" className="botao">
                  Ver Materiais
                  </Link>

                  <Link to="/admin/materiais/novo" className="botao"> 
                  Cadastrar material
                  </Link>
              </div>  
      
          </div>
        </div>

        <button className="botao" onClick={sair}>
          Sair
        </button>
      </main>
  );
}

export default Admin;