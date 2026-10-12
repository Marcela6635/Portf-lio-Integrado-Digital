import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GerenciarRegistros() {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarRegistros() {
      try {
        const resposta = await fetch(
          "http://localhost:3333/registros"
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar registros");
        }

        const dados = await resposta.json();
        setRegistros(dados);
      } catch (erro) {
        console.error(erro);
        setErro("Não foi possível carregar os registros.");
      } finally {
        setCarregando(false);
      }
    }

    buscarRegistros();
  }, []);

  async function excluirRegistro(id) {
  const confirmar = window.confirm(
    "Tem certeza que deseja excluir este registro?"
  );

  if (!confirmar) return;

  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Você precisa fazer login.");
    return;
  }

  try {
    const resposta = await fetch(
      `http://localhost:3333/registros/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!resposta.ok) {
      const dados = await resposta.json();
      throw new Error(dados.mensagem || "Erro ao excluir registro");
    }

    setRegistros((anteriores) =>
      anteriores.filter((registro) => registro.id !== id)
    );

    alert("Registro excluído com sucesso!");
  } catch (erro) {
    console.error(erro);
    alert(erro.message);
  }
}

  return (
    <main className="portfolio">
      <h1>Gerenciar Registros</h1>

      <Link to="/admin/registros/novo" className="botao">
        + Novo registro
      </Link>

      {carregando ? (
        <p>Carregando registros...</p>
      ) : erro ? (
        <p>{erro}</p>
      ) : registros.length === 0 ? (
        <p>Nenhum registro cadastrado.</p>
      ) : (
        <div className="opcoes">
          {registros.map((registro) => (
            <div className="cartao" key={registro.id}>
              <h3>{registro.titulo}</h3>

              <p>{registro.conteudo}</p>

              {registro.bimestre && (
                <p>Bimestre: {registro.bimestre}</p>
              )}

              <div className="acoes-secao">
                <Link to={`/registro/${registro.id}`} className="botao"> Visualizar </Link>

                <Link to={`/admin/registros/editar/${registro.id}`} className="botao"> Editar </Link>

                <button className="botao-excluir" onClick={() => excluirRegistro(registro.id)}> Excluir </button>
               </div> 

            </div>
          ))}
        </div>
      )}

      <Link to="/admin">Voltar ao painel</Link>
    </main>
  );
}

export default GerenciarRegistros;